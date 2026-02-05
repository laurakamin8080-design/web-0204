import WeatherWidget from '../components/WeatherWidget';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
        반갑습니다, <span className="text-blue-600">Clap Campus</span>입니다
      </h1>
      <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        최첨단 기술과 세련된 디자인으로 미래를 열어갑니다.
        Tailwind CSS v4와 Vite를 이용한 현대적인 개발 환경을 경험해보세요.
      </p>
      <div className="flex flex-wrap justify-center gap-4 pt-6">
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none">
          시작하기
        </button>
        <button className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          더 알아보기
        </button>
      </div>

      <div className="mt-16 w-full max-w-md animate-fade-in-up">
        <WeatherWidget />
      </div>
    </div>

  );
}
