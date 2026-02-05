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
            // 날씨 상태를 기온에 따라 대략적으로 유추
            const condition = currentTemp > 20 ? '맑고 더움' : currentTemp > 10 ? '포근함' : '쌀쌀함';
            getFashionAdvice(currentTemp, condition);
        }
    };

    return (
        <div className="relative w-full max-w-sm mx-auto my-8 overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl border border-slate-200 ring-1 ring-slate-900/5 animate-fade-in hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
            {/* Background Decor */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-100 rounded-full blur-3xl pointer-events-none opacity-60"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full blur-3xl pointer-events-none opacity-60"></div>

            {/* Header */}
            <div className="relative z-10 flex flex-col items-center">
                <span className="px-3 py-1 mb-4 text-xs font-bold tracking-wider text-purple-600 uppercase bg-purple-50 rounded-full border border-purple-100 shadow-sm">
                    Seoul, KR
                </span>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">오늘의 날씨</h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">실시간 기상 정보</p>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-[220px] flex flex-col justify-center items-center mt-6">
                {loading ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-4 border-slate-100 border-t-purple-500 rounded-full animate-spin"></div>
                        <p className="text-sm font-medium text-slate-500 animate-pulse">날씨 정보를 불러오는 중...</p>
                    </div>
                ) : error ? (
                    <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-100 w-full">
                        <div className="text-3xl mb-3">⚠️</div>
                        <p className="text-red-600 font-medium mb-4 text-sm">{error}</p>
                        <button
                            onClick={fetchWeather}
                            className="text-xs font-bold text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                        >
                            다시 시도
                        </button>
                    </div>
                ) : currentTemp !== null ? (
                    <div className="flex flex-col items-center animate-fade-in w-full">
                        <div className="text-[6rem] leading-none mb-2 filter drop-shadow-sm transform transition-transform hover:scale-110 duration-300 cursor-default animate-float select-none">
                            {currentTemp > 25 ? '☀️' :
                                currentTemp > 15 ? '🌤️' :
                                    currentTemp > 5 ? '☁️' : '❄️'}
                        </div>
                        <div className="flex items-start justify-center mt-2 text-slate-900">
                            <span className="text-7xl font-bold tracking-tighter">
                                {currentTemp}
                            </span>
                            <span className="text-3xl font-normal text-slate-400 mt-2 ml-1">°C</span>
                        </div>
                        <p className="mt-4 text-center text-sm font-bold px-4 py-2 bg-slate-50 rounded-xl text-slate-600 border border-slate-100 shadow-sm">
                            {currentTemp > 25 ? '☀️ 더운 날씨, 수분 보충하세요!' :
                                currentTemp > 10 ? '🌿 활동하기 딱 좋은 날씨예요.' :
                                    '🧣 쌀쌀하니 따뜻하게 입으세요.'}
                        </p>
                    </div>
                ) : (
                    <p className="text-slate-400 text-sm">기상 위성에 접속 중...</p>
                )}
            </div>

            {/* AI Fashion Recommendation Section */}
            {currentTemp !== null && !loading && (
                <div className="relative z-10 mt-8 w-full">
                    {!recommendation && !isThinking ? (
                        <button
                            onClick={handleGetFashion}
                            className="group w-full relative overflow-hidden bg-slate-900 p-[1px] rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        >
                            <div className="relative bg-slate-900 group-hover:bg-slate-800 transition-colors rounded-xl px-4 py-3 flex items-center justify-center gap-2">
                                <span className="text-lg">✨</span>
                                <span className="font-bold text-white">AI 패션 추천 받기</span>
                            </div>
                        </button>
                    ) : (
                        <div className="bg-slate-50 rounded-2xl p-5 border border-purple-100 shadow-sm animate-fade-in relative overflow-hidden w-full text-left">
                            <h3 className="text-xs font-bold text-purple-600 mb-3 flex items-center gap-2 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                                Gemini Fashion AI
                            </h3>

                            {isThinking ? (
                                <div className="space-y-3">
                                    <div className="h-2 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-2 bg-slate-200 rounded w-1/2 animate-pulse"></div>
                                    <p className="text-xs text-slate-400 mt-2 text-center">스타일을 분석하고 있습니다...</p>
                                </div>
                            ) : geminiError ? (
                                <p className="text-sm text-red-500 text-center py-2">{geminiError}</p>
                            ) : (
                                <div className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                                    {recommendation}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Footer Actions */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex justify-between items-center w-full">
                <div className="text-[10px] text-slate-400 flex flex-col font-medium">
                    <span>Weather by Open-Meteo</span>
                    <span>AI by Google Gemini</span>
                </div>
                <button
                    onClick={fetchWeather}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 group"
                    title="새로고침"
                >
                    <span className="text-xl block transition-transform group-hover:rotate-180 duration-500">
                        ↻
                    </span>
                </button>
            </div>
        </div>
    );
}
