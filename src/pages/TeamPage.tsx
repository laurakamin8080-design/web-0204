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
      name: '바비',
      role: 'Plot Designer',
      emoji: '🐰',
      mbti: 'ENFJ',
      strength: '치밀한 복선 설계',
      hobby: '추리 소설 읽기',
      description: '치밀한 복선과 서사의 설계자'
    },
    {
      id: 2,
      name: '멍코',
      role: 'Character Expert',
      emoji: '🐶',
      mbti: 'ESTP',
      strength: '입체적 캐릭터 조형',
      hobby: '인간 관찰하기',
      description: '매력적인 인물 조형의 대가'
    },
    {
      id: 3,
      name: '냐옹',
      role: 'Sentence Master',
      emoji: '🐱',
      mbti: 'INTP',
      strength: '감각적인 문장력',
      hobby: '시집 필사',
      description: '마음을 흔드는 문장의 연금술사'
    },
    {
      id: 4,
      name: '햄찌',
      role: 'World Builder',
      emoji: '🐹',
      mbti: 'ISTJ',
      strength: '디테일한 설정',
      hobby: '판타지 지도 그리기',
      description: '탄탄한 세계관 구축의 전문가'
    }
  ];

  useEffect(() => {
    // DB 데이터 대신 하드코딩된 최신 데이터 사용 (세계관 변경 반영)
    setMembers(defaultMembers);
    /* 
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
    */
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

                {/* MBTI Tag */}
                <div className="text-slate-400 text-sm font-medium tracking-wider mb-2">
                  #{member.mbti}
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {member.name} 교수
                </h3>

                {/* Role */}
                <p className="text-lg font-extrabold text-[#0070f3] mb-6 uppercase">
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
