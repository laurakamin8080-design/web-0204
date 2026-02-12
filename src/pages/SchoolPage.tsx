import { useState, useEffect } from 'react';

interface Course {
    id: number;
    title: string;
    instructor: string; // 교수님 성함 추가
    max_students: number;
    current_students: number;
    category?: string;
    emoji?: string;
}

interface TeamMember {
    id: number;
    name: string;
    role: string;
    emoji: string;
    description: string;
}

const SchoolPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [myCourses, setMyCourses] = useState<Course[]>([]);
    const [myId] = useState('작가님'); // 테스트용 ID

    // 1. 캐릭터 교수님들 설정 (작가 세계관 버전)
    const team: TeamMember[] = [
        { id: 1, name: '바비', role: 'Plot Designer', emoji: '🐰', description: '치밀한 복선과 서사의 설계자' },
        { id: 2, name: '멍코', role: 'Character Expert', emoji: '🐶', description: '매력적인 인물 조형의 대가' },
        { id: 3, name: '냐옹', role: 'Sentence Master', emoji: '🐱', description: '마음을 흔드는 문장의 연금술사' },
        { id: 4, name: '햄찌', role: 'World Builder', emoji: '🐹', description: '탄탄한 세계관 구축의 전문가' }
    ];

    // 2. 세계관에 맞는 커리큘럼 설정
    const defaultCourses: Course[] = [
        { id: 1, title: '반전의 미학: 서스펜스 마스터 클래스', instructor: '바비', max_students: 20, current_students: 18, category: '플롯', emoji: '🕵️‍♂️' },
        { id: 2, title: '살아 숨쉬는 입체적 인물 만들기', instructor: '멍코', max_students: 15, current_students: 4, category: '캐릭터', emoji: '🎭' },
        { id: 3, title: '독자를 사로잡는 첫 문장의 비밀', instructor: '냐옹', max_students: 10, current_students: 10, category: '문장', emoji: '✍️' },
        { id: 4, title: '판타지 세계관 A to Z', instructor: '햄찌', max_students: 25, current_students: 20, category: '세계관', emoji: '🌍' }
    ];

    const loadAll = () => {
        // 서버 DB 대신 하드코딩된 최신 데이터 사용 (세계관 변경 반영)
        setCourses(defaultCourses);

        /*
        // 서버에서 강의 목록 가져오기
        fetch('http://localhost:8000/api/courses')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setCourses(data);
                }
            })
            .catch(err => console.error("강의 로드 실패:", err));
        */

        // 나의 수강 내역 가져오기
        fetch(`http://localhost:8000/api/my-courses/${myId}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setMyCourses(data);
            })
            .catch(err => console.error("수강 내역 로드 실패:", err));
    };

    useEffect(() => { loadAll(); }, []);

    const handleAction = (type: string, courseId: number) => {
        const endpoint = type === 'unenroll' ? 'cancel' : type;

        fetch(`http://localhost:8000/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: myId, course_id: courseId })
        }).then(async res => {
            const data = await res.json();
            alert(data.message || data.detail || "성공적으로 처리되었습니다.");
            loadAll();
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3">
                        <span className="text-3xl">🖋️</span> 크리에이티브 작가 아카데미
                    </h1>
                    <p className="text-slate-500 font-medium">나만의 세계관을 완성할 최고의 커리큘럼</p>
                </div>

                {/* 캐릭터 교수님 카드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map(m => (
                        <div key={m.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 text-center transition-all hover:shadow-xl group overflow-hidden relative">
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="text-7xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 inline-block filter drop-shadow-sm">
                                    {m.emoji}
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg mb-1">{m.name} 교수</h3>
                                <p className="text-xs font-bold text-indigo-600 mb-3 uppercase tracking-wider">{m.role}</p>
                                <div className="pt-3 border-t border-slate-50 text-[11px] text-slate-500 italic">
                                    "{m.description}"
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 나의 수강 현황 */}
                {myCourses.length > 0 && (
                    <div className="bg-indigo-900 text-white rounded-[2.5rem] p-8 shadow-2xl">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span>✅</span> 내가 집필 중인 강의 ({myCourses.length})
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {myCourses.map(c => (
                                <div key={c.id} className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2">
                                    <span className="font-semibold">{c.title}</span>
                                    <button onClick={() => handleAction('unenroll', c.id)} className="ml-2 hover:text-red-300">✕</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 강의 리스트 */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
                    <h2 className="text-2xl font-black text-slate-800 mb-8">개설 강의 리스트</h2>
                    <div className="space-y-4">
                        {courses.map(c => {
                            const enrolled = myCourses.some(mc => mc.id === c.id);
                            const isFull = c.current_students >= c.max_students;
                            const percentage = (c.current_students / c.max_students) * 100;

                            return (
                                <div key={c.id} className={`group p-6 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 ${enrolled ? 'bg-indigo-50 border-indigo-200' : isFull ? 'bg-red-50/30 border-red-100' : 'bg-slate-50/50 border-slate-100 hover:bg-white hover:shadow-lg'
                                    }`}>
                                    <div className="flex items-center gap-5 flex-1 w-full md:w-auto">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100">
                                            {c.emoji || '📚'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                {enrolled && <span className="px-2 py-0.5 bg-indigo-500 text-white rounded text-[10px] font-bold uppercase">수강 중</span>}
                                                <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-bold uppercase">
                                                    {c.category || '전공'}
                                                </span>
                                                <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded text-[10px] font-bold uppercase">
                                                    {c.instructor} 교수
                                                </span>
                                            </div>
                                            <h3 className={`text-lg font-bold ${isFull ? 'text-red-900' : 'text-slate-800'}`}>
                                                {c.title}
                                            </h3>

                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="w-full max-w-[120px] h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${isFull ? 'bg-red-500' : 'bg-blue-500'}`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                                                    <span className="text-xs text-slate-500 font-medium">수강 인원:</span>
                                                    <span className={`text-sm font-bold ${isFull ? 'text-red-600' : 'text-blue-600'}`}>
                                                        {c.current_students}
                                                    </span>
                                                    <span className="text-xs text-slate-400">/</span>
                                                    <span className="text-xs text-slate-600 font-bold">{c.max_students}명</span>
                                                </div>
                                                {isFull && <span className="text-xs font-bold text-red-500 animate-pulse">🚨 마감 임박!</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 w-full md:w-auto">
                                        <button
                                            onClick={() => handleAction(enrolled ? 'unenroll' : 'enroll', c.id)}
                                            disabled={!enrolled && isFull}
                                            className={`flex-1 md:flex-none px-8 py-3 rounded-2xl font-bold text-sm transition-all ${enrolled ? 'bg-white border border-red-200 text-red-600 hover:bg-red-50' :
                                                isFull ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md transform hover:scale-105 active:scale-95'
                                                }`}
                                        >
                                            {enrolled ? '수강 취소' : isFull ? '마감' : '신청하기'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolPage;