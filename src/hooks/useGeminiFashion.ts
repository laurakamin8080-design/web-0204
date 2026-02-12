import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState } from 'react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const useGeminiFashion = () => {
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [geminiError, setGeminiError] = useState<string | null>(null);

    const getFashionAdvice = async (
        temperature: number,
        weatherCondition: string,
        memberInfo?: { gender: string; style: string; location: string }
    ) => {
        try {
            console.log('🎨 Starting fashion advice request...', { temperature, weatherCondition, memberInfo });
            setIsThinking(true);
            setGeminiError(null);
            setRecommendation(null);

            if (!import.meta.env.VITE_GEMINI_API_KEY) {
                throw new Error('API Key가 설정되지 않았습니다.');
            }

            console.log('✅ API Key found, creating model...');
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

            let prompt = `
                현재 기온은 ${temperature}도이고, 날씨 상태는 ${weatherCondition}야.
                이 날씨에 어울리는 한국의 트렌디한 패션 스타일을 3가지 포인트로 짧고 굵게 추천해줘.
            `;

            if (memberInfo) {
                prompt = `
                    당신은 패션 매거진의 전문 에디터입니다.
                    아래 고객의 정보를 바탕으로 오늘 입을 옷을 구체적으로 추천해주세요.
                    
                    [고객 정보]
                    - 성별: ${memberInfo.gender}
                    - 선호 스타일: ${memberInfo.style}
                    - 지역: ${memberInfo.location}
                    - 현재 기온: ${temperature}도 (${weatherCondition})
                    
                    [요청 사항]
                    - 단순 나열이 아닌, "상의 + 하의 + 아우터 + 신발 + 액세서리" 조합으로 추천해주세요.
                    - 패션 매거진처럼 세련되고 감각적인 문체로 작성해주세요. (예: "오늘 같은 날엔 시크한 무드를 더해보세요.")
                    - ${memberInfo.style} 스타일을 살리면서 날씨에 맞는 실용적인 팁을 한 줄 포함해주세요.
                    - 이모지를 적절히 사용하여 가독성을 높여주세요.
                `;
            }

            console.log('📤 Sending request to Gemini API...');
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            console.log('✅ Received response from Gemini:', text.substring(0, 100) + '...');
            setRecommendation(text);
        } catch (error) {
            console.error('❌ Gemini API Error:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            setGeminiError(`오류가 발생했습니다: ${errorMessage}`);
        } finally {
            setIsThinking(false);
        }
    };

    return { recommendation, isThinking, geminiError, getFashionAdvice };
};
