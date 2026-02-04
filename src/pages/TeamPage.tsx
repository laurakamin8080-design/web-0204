export default function TeamPage() {
  const team = [
    { name: '김철수', role: 'CEO', emoji: '🦁' },
    { name: '이영희', role: 'CTO', emoji: '🦊' },
    { name: '박지민', role: 'Lead Designer', emoji: '🎨' },
    { name: '최동욱', role: 'Full-stack Developer', emoji: '💻' },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">우리 팀을 소개합니다</h2>
        <p className="text-slate-600 dark:text-slate-400">세상을 바꾸는 열정적인 멤버들을 만나보세요.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member) => (
          <div key={member.name} className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="text-4xl mb-4 bg-white dark:bg-slate-700 w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
              {member.emoji}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
