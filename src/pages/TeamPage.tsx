import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Member {
  id: number;
  name: string;
  role: string;
  emoji: string;
  mbti: string;
  hobby: string;
  strength: string;
  description: string;
}

const TeamPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const navigate = useNavigate();

  // Mock data to ensure the UI looks correct even if the DB is empty
  const defaultMembers: Member[] = [
    {
      id: 1,
      name: '토끼',
      role: 'CEO',
      emoji: '🐰',
      mbti: 'ENFJ',
      strength: '트렌드 읽기',
      hobby: '새로운 카페 투어',
      description: '팀을 이끄는 귀여운 리더'
    },
    {
      id: 2,
      name: '강아지',
      role: 'CTO',
      emoji: '🐶',
      mbti: 'ESTP',
      strength: '무한 긍정',
      hobby: '산책하며 아이디어 구상',
      description: '열정 가득한 기술 책임자'
    },
    {
      id: 3,
      name: '고양이',
      role: 'Designer',
      emoji: '🐱',
      mbti: 'INTP',
      strength: '논리적 분석',
      hobby: '햇볕 아래 낮잠',
      description: '감각적인 비주얼 담당'
    },
    {
      id: 4,
      name: '햄스터',
      role: 'Developer',
      emoji: '🐹',
      mbti: 'ISTJ',
      strength: '끈기',
      hobby: '해바라기씨 맛집 탐방',
      description: '꼼꼼한 코드 마스터'
    }
  ];

  useEffect(() => {
    fetch('http://localhost:8000/api/team')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setMembers(data);
        } else {
          setMembers(defaultMembers);
        }
      })
      .catch(err => {
        console.error("데이터를 불러오지 못했습니다. 기본 데이터를 표시합니다.", err);
        setMembers(defaultMembers);
      });
  }, []);

  const handleCardClick = (name: string) => {
    navigate('/fashion', { state: { selectedMember: name } });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-16 flex items-center justify-center gap-3">
          <span className="text-2xl">🐾</span> 우리 패션팀 어벤져스
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
                <div className="text-7xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {member.emoji}
                </div>

                {/* MBTI Tag */}
                <div className="text-slate-400 text-sm font-medium tracking-wider mb-2">
                  #{member.mbti}
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-lg font-extrabold text-[#0070f3] mb-6">
                  {member.role}
                </p>

                {/* Details Section */}
                <div className="text-left space-y-3 mb-8 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors duration-500">
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="text-lg">💪</span>
                    <span className="font-bold">강점:</span> {member.strength}
                  </p>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="text-lg">🎨</span>
                    <span className="font-bold">취미:</span> {member.hobby}
                  </p>
                </div>

                {/* Description Quote */}
                <p className="text-sm text-slate-500 italic mb-8 min-h-[40px] flex items-center justify-center">
                  "{member.description}"
                </p>

                {/* Bottom Link */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-center gap-1 text-[#a855f7] font-bold text-xs tracking-tight group-hover:text-[#9333ea] transition-colors">
                  <span>✨</span> 클릭하여 패션 추천 받기
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
