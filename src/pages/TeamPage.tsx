import { useState, useEffect } from 'react';

interface Member {
  name: string;
  role: string;
  emoji: string;
  description: string;
}

const team: Member[] = [
  { name: '토끼', role: 'CEO', emoji: '🐰', description: '귀여운 리더십으로 팀을 이끄는 토끼' },
  { name: '강아지', role: 'CTO', emoji: '🐶', description: '충직하고 열정적인 강아지' },
  { name: '고양이', role: 'Lead Designer', emoji: '🐱', description: '우아하고 감각적인 고양이' },
  { name: '햄스터', role: 'Developer', emoji: '🐹', description: '부지런하고 꼼꼼한 햄스터' },
];

function WanderingAnimal({ member }: { member: Member }) {
  const [position, setPosition] = useState({ x: Math.random() * 80, y: Math.random() * 80 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Move randomly every 3-6 seconds
    const move = () => {
      if (!isHovered) {
        setPosition({
          x: Math.random() * 85, // Keep within 0-85% width
          y: Math.random() * 70, // Keep within 0-70% height
        });
      }
    };

    // Initial move
    move();

    const intervalId = setInterval(move, 4000 + Math.random() * 3000);
    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <div
      className="absolute transition-all duration-[4000ms] ease-in-out cursor-pointer z-10"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: isHovered ? 50 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        {/* Animal Avatar */}
        <div className={`text-6xl filter drop-shadow-lg transform transition-transform duration-300 ${isHovered ? 'scale-125 rotate-0' : 'animate-bounce-slow'}`}>
          {member.emoji}
        </div>

        {/* Info Card (Visible on Hover) */}
        <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-white/50 dark:border-slate-700 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}`}>
          <div className="text-center">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{member.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-1">{member.role}</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{member.description}</p>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-8 border-transparent border-t-white/90 dark:border-t-slate-800/90 filter drop-shadow-sm"></div>
        </div>

        {/* Name Tag (Always visible underneath) */}
        {!isHovered && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/60 dark:bg-black/40 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-white backdrop-blur-sm whitespace-nowrap shadow-sm">
            {member.name}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
          왁자지껄 우리 팀
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          팀원 동물을 찾아보세요! 마우스를 올리면 자세한 소개가 나옵니다.
        </p>
      </div>

      {/* Playground Area */}
      <div className="relative w-full h-[600px] bg-sky-100/50 dark:bg-slate-800/50 rounded-3xl border border-sky-200 dark:border-slate-700 overflow-hidden shadow-inner">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-10 left-10 text-4xl animate-pulse">☁️</div>
          <div className="absolute top-20 right-20 text-6xl animate-pulse delay-700">☁️</div>
          <div className="absolute bottom-10 left-1/3 text-5xl animate-pulse delay-300">🌱</div>
          <div className="absolute bottom-20 right-1/4 text-4xl animate-pulse delay-500">🌿</div>
        </div>

        {/* Wandering Members */}
        {team.map((member) => (
          <WanderingAnimal key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}
