import { useEffect } from 'react';
import useWeather from '../hooks/useWeather';
import { useGeminiFashion } from '../hooks/useGeminiFashion';

export default function WeatherWidget() {
    const { currentTemp, loading, error, fetchWeather } = useWeather();
    const { recommendation, isThinking, geminiError, getFashionAdvice } = useGeminiFashion();

    // Load weather on mount automatically
    useEffect(() => {
        fetchWeather();
    }, []);

    const handleGetFashion = () => {
        if (currentTemp !== null) {
            // 날씨 상태를 기온에 따라 대략적으로 유추 (실제 날씨 코드가 있으면 더 좋음)
            const condition = currentTemp > 20 ? '맑고 더움' : currentTemp > 10 ? '포근함' : '쌀쌀함';
            getFashionAdvice(currentTemp, condition);
        }
    };

    return (
        <div className="weather-card mx-auto my-8 transition-all duration-500 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">오늘의 날씨</h2>
            <p className="opacity-80 mb-6">대한민국, 서울</p>

            <div className="min-h-[180px] flex flex-col justify-center items-center">
                {loading ? (
                    <p className="loading-dots text-lg">날씨 정보를 불러오는 중</p>
                ) : error ? (
                    <div className="text-red-400">
                        <p className="mb-2">⚠️</p>
                        <p>{error}</p>
                        <button
                            onClick={fetchWeather}
                            className="mt-4 text-sm underline opacity-80 hover:opacity-100"
                        >
                            다시 시도
                        </button>
                    </div>
                ) : currentTemp !== null ? (
                    <>
                        <div className="text-7xl mb-4 animate-bounce-slow">
                            {currentTemp > 25 ? '☀️' :
                                currentTemp > 15 ? '🌤️' :
                                    currentTemp > 5 ? '☁️' : '❄️'}
                        </div>
                        <div className="temp-display text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-200">
                            {currentTemp}°C
                        </div>
                        <p className="mt-2 text-sm opacity-60">
                            {currentTemp > 25 ? '더운 날씨, 수분 보충하세요!' :
                                currentTemp > 10 ? '활동하기 딱 좋은 날씨예요.' :
                                    '쌀쌀하니 따뜻하게 입으세요.'}
                        </p>
                    </>
                ) : (
                    <p className="opacity-60">잠시만 기다려주세요...</p>
                )}
            </div>

            {/* AI Fashion Recommendation Section */}
            {currentTemp !== null && !loading && (
                <div className="mt-8 border-t border-white/20 pt-6">
                    {!recommendation && !isThinking ? (
                        <button
                            onClick={handleGetFashion}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                        >
                            <span>✨</span> AI 패션 추천 받기
                        </button>
                    ) : (
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md animate-fade-in text-left">
                            <h3 className="text-sm font-bold text-purple-300 mb-2 flex items-center gap-2">
                                🤖 Gemini의 스타일링 팁
                            </h3>
                            {isThinking ? (
                                <p className="loading-dots text-sm opacity-80">최고의 코디를 생각하는 중</p>
                            ) : geminiError ? (
                                <p className="text-sm text-red-300">{geminiError}</p>
                            ) : (
                                <div className="text-sm leading-relaxed whitespace-pre-line">
                                    {recommendation}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="mt-8 flex justify-center">
                <button className="text-sm opacity-60 hover:opacity-100 hover:scale-105 transition-all flex items-center gap-2" onClick={fetchWeather}>
                    <span className="text-lg">🔄</span> 날씨 새로고침
                </button>
            </div>

            <div className="mt-6 text-xs opacity-40">
                Weather by Open-Meteo • AI by Google Gemini
            </div>
        </div>
    );
}
