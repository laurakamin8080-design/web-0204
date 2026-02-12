import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Member {
    id: string;
    name: string;
    gender: string;
    style: string;
    location: string;
    items: string[];
    statusMessage: string;
    summary: string;
}



const MEMBERS_DATA: Record<string, Member> = {
    '토끼': {
        id: '토끼',
        name: '바비 교수',
        gender: '중성',
        style: '복선 설계',
        location: '토끼 캐릭터',
        items: ['[치밀함: 측정불가]', '[떡밥 회수율: 100%]', '[특이사항: 반전 강박증]'],
        statusMessage: "이미 당신은 제 복선에 갇혔습니다. 복습은 의미 없습니다. 앞을 보세요.",
        summary: "데뷔작 단 한 줄로 독자 10만 명을 단체 멘붕에 빠뜨린 서사의 설계자."
    },
    '강아지': {
        id: '강아지',
        name: '멍코 교수',
        gender: '중성',
        style: '인물 구축',
        location: '강아지 캐릭터',
        items: ['[인격 연금술: MAX]', '[매력적인 빌런 제조기]', '[특이사항: 조연 편애 심함]'],
        statusMessage: "평범한 주인공은 죽은 주인공입니다. 제가 그 심장에 악마의 불을 붙여드리죠.",
        summary: "엑스트라도 주인공을 죽이게 만드는 입체적 캐릭터 메이킹의 귀재."
    },
    '고양이': {
        id: '고양이',
        name: '냐옹 교수',
        gender: '중성',
        style: '문장론',
        location: '고양이 캐릭터',
        items: ['[문장 최면술: 1등급]', '[단어 선택 결벽증]', '[특이사항: 밤샘 집필 전문가]'],
        statusMessage: "형용사는 사치입니다. 마침표 하나로 독자를 울리지 못하면 펜을 꺾으세요.",
        summary: "조사 하나로 심박수를 조절하는, 밤을 훔치는 문장 살인마."
    },
    '햄스터': {
        id: '햄스터',
        name: '햄찌 교수',
        gender: '중성',
        style: '세계관',
        location: '햄스터 캐릭터',
        items: ['[차원 설계력: 우주급]', '[개연성 수호자]', '[특이사항: 지도 그리기 광인]'],
        statusMessage: "현실이 지루하신가요? 제가 만든 세계에서는 당신이 곧 법이고 신입니다.",
        summary: "현실보다 더 정교한 가상 세계를 구축해 독자를 귀화시키는 창조주."
    }
};

export default function FashionPage() {
    const [members] = useState<string[]>(Object.keys(MEMBERS_DATA));
    const [selectedMemberId, setSelectedMemberId] = useState<string>('');
    const [memberDetail, setMemberDetail] = useState<Member | null>(null);
    const location = useLocation();

    // 팀 소개 페이지에서 클릭해서 넘어왔을 경우, 해당 동물 자동 선택
    useEffect(() => {
        if (location.state && location.state.selectedMember) {
            handleMemberSelect(location.state.selectedMember);
        }
    }, [location.state]);

    // Handle member selection and trigger everything
    const handleMemberSelect = (username: string) => {
        console.log('👤 Member selected:', username);
        setSelectedMemberId(username);
        setMemberDetail(null);

        if (!username) return;

        const detail = MEMBERS_DATA[username];
        if (!detail) {
            console.error('❌ Member not found:', username);
            return;
        }

        console.log('✅ Member detail loaded:', detail);
        setMemberDetail(detail);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] max-w-7xl mx-auto p-6 gap-6">

            {/* Left Sidebar: Team Selection */}
            <aside className="w-1/4 min-w-[250px] bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span>🧪</span> 교수진 선택
                </h2>

                <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    {members.map((member, index) => {
                        const colors = [
                            { bg: 'bg-pink-50', border: 'border-pink-200', active: 'bg-pink-500', emoji: 'bg-pink-100' },
                            { bg: 'bg-amber-50', border: 'border-amber-200', active: 'bg-amber-500', emoji: 'bg-amber-100' },
                            { bg: 'bg-purple-50', border: 'border-purple-200', active: 'bg-purple-500', emoji: 'bg-purple-100' },
                            { bg: 'bg-blue-50', border: 'border-blue-200', active: 'bg-blue-500', emoji: 'bg-blue-100' }
                        ][index];

                        const emojis = ['🐰', '🐶', '🐱', '🐹'];

                        return (
                            <button
                                key={member}
                                onClick={() => handleMemberSelect(member)}
                                className={`p-4 rounded-2xl text-center transition-all duration-300 border-2 ${selectedMemberId === member
                                    ? `${colors.active} text-white border-transparent shadow-lg scale-105`
                                    : `${colors.bg} ${colors.border} hover:scale-102 hover:shadow-md`
                                    }`}
                            >
                                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-4xl ${selectedMemberId === member ? 'bg-white/20' : colors.emoji
                                    } transition-all duration-300`}>
                                    {emojis[index]}
                                </div>
                                <span className={`font-bold text-lg block ${selectedMemberId === member ? 'text-white' : 'text-slate-700'
                                    }`}>
                                    {MEMBERS_DATA[member].name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-auto pt-6 text-xs text-slate-400 text-center">
                    <p>교수님을 선택하여<br />치명적인 창작의 부작용을 확인하세요! ☠️</p>
                </div>
            </aside>

            {/* Right Main Area: Content */}
            <main className="flex-1 bg-white rounded-3xl p-8 shadow-xl border border-slate-100 overflow-y-auto relative min-h-[500px]">
                {!memberDetail ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <div className="text-6xl grayscale opacity-30">🧪</div>
                        <p className="text-lg font-medium">왼쪽에서 교수님을 선택해주세요</p>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">

                        {/* Header: Member Profile */}
                        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white shadow-2xl transition-all duration-500 hover:shadow-purple-200/20">
                            {/* Animated Background Blobs */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-[80px] -mr-40 -mt-40 animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-[60px] -ml-20 -mb-20"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                {/* Character Visual */}
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500"></div>
                                    <div className="w-40 h-40 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-8xl shadow-inner transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                                        {Object.keys(MEMBERS_DATA).indexOf(memberDetail.id) === 0 ? '🐰' :
                                            Object.keys(MEMBERS_DATA).indexOf(memberDetail.id) === 1 ? '🐶' :
                                                Object.keys(MEMBERS_DATA).indexOf(memberDetail.id) === 2 ? '🐱' : '🐹'}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white p-2 rounded-full shadow-lg border-2 border-slate-900 animate-bounce">
                                        ✒️
                                    </div>
                                </div>

                                {/* Info Details */}
                                <div className="flex-1 text-center md:text-left space-y-4">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <span className="px-4 py-1.5 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-200 rounded-full text-xs font-black uppercase tracking-widest">
                                            {memberDetail.style}
                                        </span>
                                        <span className="px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-200 rounded-full text-xs font-black uppercase tracking-widest">
                                            {memberDetail.location}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                                        {memberDetail.name}
                                    </h1>
                                    <div className="bg-white/10 p-4 rounded-xl border-l-4 border-purple-400">
                                        <p className="text-slate-200 font-medium text-lg italic max-w-md">
                                            "{memberDetail.statusMessage}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* One-Line Summary */}
                        <div className="bg-slate-50 border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-sm">
                            <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-1">PROFESSOR SUMMARY</h3>
                            <p className="text-xl font-bold text-slate-800">
                                {memberDetail.summary}
                            </p>
                        </div>

                        {/* Signature Traits Section */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <span>📊</span> 교수 특징
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {memberDetail.items.map((item, idx) => (
                                    <div key={idx} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center justify-center gap-3 transform transition-transform hover:scale-102 hover:shadow-md hover:border-purple-100">
                                        <span className="font-bold text-slate-700 text-center text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Section Placeholder (Hidden or Repurposed) */}
                        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-white mb-2">🤖 AI 창작 상담소</h3>
                                <p className="text-slate-400 text-sm mb-6">
                                    교수님에게 당신의 고민을 털어놓아 보세요. (준비중)
                                </p>
                                <button className="px-6 py-3 bg-slate-800 text-slate-500 rounded-xl font-bold text-sm cursor-not-allowed border border-slate-700">
                                    🚧 시스템 점검 중
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}
