import { Link } from 'react-router-dom';
import WeatherWidget from '../components/WeatherWidget';

export default function HomePage() {
  const projects = [
    {
      title: '팀 소개',
      description: 'Clap Campus의 핵심 멤버들을 소개합니다.',
      path: '/team',
      icon: '👥',
      color: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800'
    },
    {
      title: '실시간 날씨',
      description: '현재 위치의 정확한 날씨 정보를 확인하세요.',
      path: '/weather',
      icon: '🌤️',
      color: 'bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-900/20 dark:border-sky-800'
    },
    {
      title: 'AI 패션 추천',
      description: '날씨에 어울리는 최적의 코디를 추천받으세요.',
      path: '/fashion',
      icon: '👗',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800'
    },
    {
      title: '수강 신청',
      description: '간편하고 빠른 통합 수강 신청 시스템입니다.',
      path: '/school',
      icon: '🎓',
      color: 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-900/20 dark:border-violet-800'
    },
    {
      title: '방명록',
      description: '방문 흔적을 남기고 소통해보세요.',
      path: '/guestbook',
      icon: '✍️',
      color: 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-900/20 dark:border-slate-800'
    }
  ];

  return (
    <div className="flex flex-col items-center space-y-16 py-12 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
          반갑습니다 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Clap Campus
          </span>입니다
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          최첨단 기술과 세련된 디자인으로 미래를 열어갑니다. <br />
          우리가 함께 만든 결과물들을 확인해보세요.
        </p>
      </div>

      {/* Weather Highlight */}
      <div className="w-full max-w-lg">
        <WeatherWidget />
      </div>

      {/* Projects Grid */}
      <div className="w-full space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">준비된 서비스</h2>
          <div className="h-1 flex-grow mx-6 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.path}
              to={project.path}
              className={`group relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${project.color}`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {project.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="opacity-80 leading-relaxed text-sm">
                {project.description}
              </p>
              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                →
              </div>
            </Link>
          ))}

          {/* API External Link */}
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-8 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-transparent text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
          >
            <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform duration-300">
              ⚙️
            </div>
            <h3 className="text-xl font-bold mb-2">백엔드 API 문서</h3>
            <p className="opacity-80 leading-relaxed text-sm">
              FastAPI 서버의 데이터 명세와 엔드포인트를 확인하세요.
            </p>
          </a>
        </div>
      </div>

      {/* Footer Meta info */}
      <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-800 w-full text-slate-400 text-sm">
        <p>© 2026 Clap Campus Project. All built with care.</p>
      </div>
    </div>
  );
}

