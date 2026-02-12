import React, { useState } from 'react';

// Curriculum Interface 정의
interface CurriculumItem {
    week: number;
    topic: string;
    detail: string;
}

interface Course {
    id: number;
    title: string;
    instructor: string;
    role: string;
    description: string;
    current: number;
    max: number;
    period: string;
    time: string;
    curriculum: CurriculumItem[];
}

const SchoolPage = () => {
    // Selected course state for showing details
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    // 1. 강사명, 직책, 수강 인원, 그리고 커리큘럼 데이터 추가
    const [courses] = useState<Course[]>([
        {
            id: 1,
            title: '🖋️ [창작] 독자를 홀리는 복선 설계법',
            instructor: '바비',
            role: 'Plot Designer',
            description: '치밀한 서사의 기술',
            current: 18,
            max: 20,
            period: '2026.03.02 - 2026.04.20 (8주)',
            time: '매주 월요일 19:00 - 21:00',
            curriculum: [
                { week: 1, topic: '거짓말 훈련', detail: '독자가 믿게 만드는 거짓말의 3요소' },
                { week: 2, topic: '체호프의 총', detail: '총이 등장했다면 언제 발사해야 하는가?' },
                { week: 3, topic: '맥거핀의 유혹', detail: '독자의 시선을 뺏는 화려한 미끼' },
                { week: 4, topic: '서술 트릭', detail: '화자조차 믿지 마라: 신뢰할 수 없는 화자' },
                { week: 5, topic: '반전의 타이밍', detail: '가장 방심했을 때 찌르는 법' },
                { week: 6, topic: '복선 회수', detail: '흩뿌려진 조각들이 맞춰질 때의 카타르시스' },
                { week: 7, topic: '열린 결말 vs 닫힌 결말', detail: '독자에게 여운을 남기는 법' },
                { week: 8, topic: '졸업 작품', detail: '단편 미스터리 소설 완성 및 합평' }
            ]
        },
        {
            id: 2,
            title: '👿 [인물] 입체적인 악역 만들기',
            instructor: '멍코',
            role: 'Character Expert',
            description: '매력적인 빌런의 탄생',
            current: 12,
            max: 15,
            period: '2026.03.03 - 2026.04.21 (8주)',
            time: '매주 화요일 19:00 - 21:00',
            curriculum: [
                { week: 1, topic: '악의 기원', detail: '그는 처음부터 나쁜 놈이었을까?' },
                { week: 2, topic: '매력적인 결핍', detail: '완벽한 악역은 재미없다' },
                { week: 3, topic: '정당한 분노', detail: '악역에게도 그만의 정의가 있다' },
                { week: 4, topic: '주인공과의 대립', detail: '거울 효과: 주인공의 그림자로서의 악역' },
                { week: 5, topic: '압도적인 능력', detail: '절망감을 주는 능력 설정법' },
                { week: 6, topic: '인간적인 면모', detail: '악마가 흘리는 눈물' },
                { week: 7, topic: '최후의 발악', detail: '무너질 때 가장 아름답다' },
                { week: 8, topic: '빌런 만들기', detail: '나만의 시그니처 빌런 프로필 완성' }
            ]
        },
        {
            id: 3,
            title: '🌌 [설정] 무인도 생존 세계관',
            instructor: '햄찌',
            role: 'World Builder',
            description: '치밀한 세계관 구축',
            current: 24,
            max: 25,
            period: '2026.03.04 - 2026.04.22 (8주)',
            time: '매주 수요일 19:00 - 21:00',
            curriculum: [
                { week: 1, topic: '고립의 미학', detail: '왜 하필 무인도인가? 공간의 제약 설정' },
                { week: 2, topic: '생존의 법칙', detail: '물, 불, 식량 그리고 쉘터' },
                { week: 3, topic: '미지의 위협', detail: '자연재해, 야생동물, 혹은 무언가' },
                { week: 4, topic: '문명의 흔적', detail: '떠내려온 컨테이너 박스 하나' },
                { week: 5, topic: '심리적 붕괴', detail: '고독이 인간을 어떻게 망가뜨리는가' },
                { week: 6, topic: '새로운 질서', detail: '생존자들 간의 계급 발생과 갈등' },
                { week: 7, topic: '탈출 vs 정착', detail: '희망 고문과 잔혹한 현실' },
                { week: 8, topic: '세계관 바이블', detail: '무인도 생존 가이드북 제작' }
            ]
        },
        {
            id: 4,
            title: '🖋️ [문장] 100만 뷰 문장론',
            instructor: '냐옹',
            role: 'Sentence Master',
            description: '첫 문장의 유혹',
            current: 5,
            max: 10,
            period: '2026.03.05 - 2026.04.23 (8주)',
            time: '매주 목요일 19:00 - 21:00',
            curriculum: [
                { week: 1, topic: '후킹(Hooking)', detail: '첫 문장으로 독자의 멱살을 잡아라' },
                { week: 2, topic: '비유의 기술', detail: '직유, 은유, 그리고 상징' },
                { week: 3, topic: '리듬감', detail: '눈으로 읽어도 소리 나는 문장' },
                { week: 4, topic: '간결함의 힘', detail: '빼기 연습: 부사를 죽여라' },
                { week: 5, topic: '감각적 묘사', detail: '냄새가 나는 문장 쓰기' },
                { week: 6, topic: '감정 절제', detail: '슬프다고 말하지 않고 슬프게 만들기' },
                { week: 7, topic: '엔딩의 여운', detail: '책을 덮어도 끝나지 않는 문장' },
                { week: 8, topic: '필사 클럽', detail: '명문장 필사 및 내 문장 다듬기' }
            ]
        }
    ]);

    const [view, setView] = useState<'list' | 'success'>('list');
    const [msg, setMsg] = useState({ title: '', body: '' });

    // 2. 버튼 클릭 시 화면 전환 함수
    const handleEnroll = (course: any, e: React.MouseEvent) => {
        e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
        let concept = { title: "계약 완료", body: "창작의 세계로 들어오셨습니다." };

        if (course.title.includes('복선')) {
            concept = { title: "⚠️ 당신은 방금 속았습니다.", body: "이건 실패가 아닙니다. 반전 수업에 성공하셨습니다!" };
        } else if (course.title.includes('악역')) {
            concept = { title: "👿 영혼 배송 시작", body: "악역의 영혼이 당신의 뇌로 배송 중입니다." };
        } else if (course.title.includes('세계관')) {
            concept = { title: "🌌 창조주 비자 발급 완료", body: "현실의 물리 법칙은 잊으세요. 이제 당신이 이 세계의 신입니다." };
        } else if (course.title.includes('문장')) {
            concept = { title: "🖋️ 잉크 한 방울의 무게", body: "이 잉크 한 방울로 당신은 누군가의 밤을 훔치게 될 것입니다." };
        }

        setMsg(concept);
        setView('success');
    };

    const toggleDetail = (course: Course) => {
        if (selectedCourse?.id === course.id) {
            setSelectedCourse(null);
        } else {
            setSelectedCourse(course);
        }
    };

    // --- 화면 렌더링 ---

    // [성공 페이지]
    if (view === 'success') {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-slate-800 border-2 border-indigo-500 p-12 rounded-[3rem] shadow-[0_0_50px_rgba(99,102,241,0.3)]">
                    <h1 className="text-5xl font-black text-indigo-400 mb-6">{msg.title}</h1>
                    <p className="text-slate-300 text-xl mb-10 font-serif leading-relaxed">{msg.body}</p>
                    <button
                        onClick={() => setView('list')}
                        className="px-10 py-4 bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-400 transition-all"
                    >
                        다시 원고지로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // [강의 목록 페이지]
    return (
        <div className="bg-abyss py-12 px-6 text-white font-sans">
            <header className="max-w-4xl mx-auto text-center mb-16 relative z-10">
                <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                    CREATIVE AUTHOR ACADEMY
                </h1>
                <p className="text-slate-400 italic">"당신의 문장이 현실이 되는 금기된 구역"</p>
                <p className="text-slate-500 text-sm mt-2">👇 강의 카드를 클릭하여 상세 커리큘럼을 확인하세요</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                {courses.map(c => (
                    <div
                        key={c.id}
                        onClick={() => toggleDetail(c)}
                        className={`bg-slate-800/50 rounded-[2rem] border transition-all cursor-pointer overflow-hidden
                            ${selectedCourse?.id === c.id ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-slate-800' : 'border-slate-700 hover:border-slate-500'}
                        `}
                    >
                        <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-900/30 px-2 py-1 rounded">
                                        {c.role}
                                    </span>
                                    <span className="text-sm font-bold text-slate-300">
                                        {c.instructor} 교수
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h2 className="text-2xl font-bold text-white shadow-sm">{c.title}</h2>
                                    <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700/50 shadow-inner">
                                        <span className={`text-sm font-bold ${c.current >= c.max ? 'text-red-400' : 'text-green-400'}`}>
                                            {c.current}
                                        </span>
                                        <span className="text-slate-500 text-xs">/ {c.max}명</span>
                                        {c.current >= c.max && (
                                            <span className="ml-1 text-[10px] text-red-400 font-bold border border-red-500/30 bg-red-500/10 px-1.5 rounded">
                                                FULL
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm mt-2">{c.description}</p>

                                {/* 수강 인원 & 간단 정보 */}
                                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
                                        🗓️ <span className="text-slate-300">{c.period}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
                                        ⏰ <span className="text-slate-300">{c.time}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={(e) => handleEnroll(c, e)}
                                disabled={c.current >= c.max}
                                className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg min-w-[200px] z-10
                                    ${c.current >= c.max
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-white text-slate-900 hover:bg-indigo-400 hover:text-white'
                                    }
                                `}
                            >
                                {c.current >= c.max ? '⚠️ 정원 마감' :
                                    (c.title.includes('복선') ? '금기된 원고 열람' :
                                        c.title.includes('악역') ? '내 영혼 베팅하기' :
                                            c.title.includes('세계관') ? '창조주 권한 획득' : '잉크의 계약서 서명')}
                            </button>
                        </div>

                        {/* 상세 커리큘럼 (토글) */}
                        <div className={`
                            transition-all duration-500 ease-in-out overflow-hidden bg-slate-900/50 border-t border-slate-700
                            ${selectedCourse?.id === c.id ? 'max-h-[800px] opacity-100 p-8 pt-4' : 'max-h-0 opacity-0'}
                        `}>
                            <h3 className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-2">
                                📚 {c.instructor} 교수의 비밀 커리큘럼
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {c.curriculum.map((item) => (
                                    <div key={item.week} className="flex gap-3 items-start p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 transition-colors">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs ring-1 ring-indigo-500/50">
                                            {item.week}주
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-200 text-sm">{item.topic}</div>
                                            <div className="text-xs text-slate-400 mt-1">{item.detail}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-between items-center text-xs text-slate-500 border-t border-slate-700/50 pt-4">
                                <div>
                                    <span className="font-bold text-slate-400">Current Status:</span>
                                    <span className={`ml-2 ${c.current >= c.max ? 'text-red-500' : 'text-green-500'}`}>
                                        {c.current} / {c.max}명 신청 중
                                    </span>
                                </div>
                                <div>* 커리큘럼은 작가의 컨디션과 영감에 따라 변동될 수 있습니다.</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchoolPage;