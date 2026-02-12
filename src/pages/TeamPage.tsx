import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Member {
  id: number;
  name: string;
  role: string;
  emoji: string;
  title: string;
  quote: string;
  feature: string;
}

const TeamPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const navigate = useNavigate();

  // Mock data to ensure the UI looks correct even if the DB is empty
  const defaultMembers: Member[] = [
    {
      id: 1,
      name: '바비',
      role: 'Plot Designer',
      emoji: '🐰',
      title: '[데자뷔의 늪]',
      quote: "분명 처음 보는 문장인데, 왜 결말을 이미 알고 있는 기분이 들까요?",
      feature: "독자를 뫼비우스의 띠에 가두고 즐거워함."
    },
    {
      id: 2,
      name: '멍코',
      role: 'Character Expert',
      emoji: '🐶',
      title: '[다중 인격의 발현]',
      quote: "거울 속의 당신은 누구입니까? 당신이 쓴 캐릭터가 당신의 목을 조르러 옵니다.",
      feature: "자아가 너무 강해 작가를 잡아먹은 캐릭터 다수 보유."
    },
    {
      id: 3,
      name: '냐옹',
      role: 'Sentence Master',
      emoji: '🐱',
      title: '[활자 중독증]',
      quote: "마침표를 찍는 순간, 당신은 다음 문장을 쓰지 않고는 견딜 수 없게 됩니다.",
      feature: "수식어 없이 사람을 울리는 '금지된 수사법' 사용."
    },
    {
      id: 4,
      name: '햄찌',
      role: 'World Builder',
      emoji: '🐹',
      title: '[현실 부적응]',
      quote: "지도를 덮지 마세요. 당신이 사는 이곳이 진짜 현실이라고 확신합니까?",
      feature: "0과 1로 된 가상 세계에 독자 100만 명을 감금 중."
    }
  ];

  useEffect(() => {
    // DB 데이터 대신 하드코딩된 최신 데이터 사용 (세계관 변경 반영)
    setMembers(defaultMembers);
  }, []);

  const handleCardClick = (name: string) => {
    navigate('/fashion', { state: { selectedMember: name } });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-16 flex items-center justify-center gap-3">
          <span className="text-2xl">🖋️</span> 크리에이티브 작가 아카데미 교수진
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map(member => (
            <div
              key={member.id}
              onClick={() => handleCardClick(member.name)}
              className="group bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100/80 text-center cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-purple-200 relative overflow-hidden"
            >
              {/* Background gradient blob for hover effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                {/* Emoji with subtle animation */}
                <div className="text-7xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 inline-block filter drop-shadow-sm">
                  {member.emoji}
                </div>

                {/* Title Tag */}
                <div className="text-indigo-500 text-sm font-bold tracking-wider mb-2 uppercase">
                  {member.title}
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {member.name} 교수
                </h3>

                {/* Role */}
                <p className="text-lg font-extrabold text-slate-400 mb-6 uppercase">
                  {member.role}
                </p>

                {/* Details Section */}
                <div className="text-left space-y-4 mb-8 bg-slate-50/50 p-6 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors duration-500">
                  <p className="text-lg text-slate-700 font-ink border-l-2 border-indigo-200 pl-3 leading-relaxed">
                    "{member.quote}"
                  </p>
                  <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                    <span className="font-bold text-slate-700">특이사항:</span> {member.feature}
                  </p>
                </div>


                {/* Bottom Link */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-center gap-1 text-[#a855f7] font-bold text-xs tracking-tight group-hover:text-[#9333ea] transition-colors">
                  <span>✨</span> 창작의 부작용 빠지기
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
