import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState } from 'react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY || '');

export const useGeminiFashion = () => {
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [geminiError, setGeminiError] = useState<string | null>(null);

    const getFashionAdvice = async (temperature: number, weatherCondition: string) => {
        try {
            setIsThinking(true);
            setGeminiError(null);

            if (!import.meta.env.VITE_GEMINI_KEY) {
                throw new Error('API Key가 설정되지 않았습니다.');
            }

            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

            const prompt = `
                현재 서울의 기온은 ${temperature}도이고, 날씨 상태는 ${weatherCondition}야.
                이 날씨에 어울리는 한국의 트렌디한 패션 스타일을 3가지 포인트로 짧고 굵게 추천해줘.
                말투는 친근하고 센스 있게 부탁해. 이모지도 적절히 섞어줘.
                답변은 3줄 이내로 간결하게 해줘.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            setRecommendation(text);
        } catch (error) {
            console.error('Gemini API Error:', error);
            setGeminiError('AI가 패션을 고민하다 잠들었어요 😴 잠시 후 다시 시도해주세요.');
        } finally {
            setIsThinking(false);
        }
    };

    return { recommendation, isThinking, geminiError, getFashionAdvice };
};
