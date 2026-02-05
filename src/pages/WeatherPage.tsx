import WeatherWidget from '../components/WeatherWidget';

export default function WeatherPage() {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                    실시간 날씨 정보
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                    현재 서울의 정확한 기온과 상태를 확인하세요.
                    Clap Campus의 스마트한 날씨 대시보드입니다.
                </p>
            </div>

            <div className="w-full max-w-md">
                <WeatherWidget />
            </div>
        </div>
    );
}
