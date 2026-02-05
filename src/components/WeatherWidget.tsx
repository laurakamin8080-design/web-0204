import { useEffect } from 'react';
import useWeather from '../hooks/useWeather';

export default function WeatherWidget() {
    const { currentTemp, loading, error, fetchWeather } = useWeather();

    // Load weather on mount automatically
    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="weather-card mx-auto my-8">
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

            <div className="mt-8 flex justify-center">
                <button className="btn-weather flex items-center gap-2" onClick={fetchWeather}>
                    <span>🔄</span> 새로고침
                </button>
            </div>

            <div className="mt-6 text-xs opacity-40">
                Data provided by Open-Meteo API
            </div>
        </div>
    );
}
