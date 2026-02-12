import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWeather from '../hooks/useWeather';
import { useGeminiFashion } from '../hooks/useGeminiFashion';

interface Member {
    id: string;
    name: string;
    gender: string;
    style: string;
    location: string;
    items: string[];
}

const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
    Seoul: { lat: 37.5665, lon: 126.9780 },
    Busan: { lat: 35.1796, lon: 129.0756 },
};

const MEMBERS_DATA: Record<string, Member> = {
    '토끼': {
        id: '토끼',
        name: '토끼',
        gender: '중성',
        style: '귀여운',
        location: 'Seoul',
        items: ['🎀 핑크 베레모', '🧶 아이보리 꽈배기 니트', '🥕 당근 모양 브로치']
    },
    '강아지': {
        id: '강아지',
        name: '강아지',
        gender: '중성',
        style: '활발한',
        location: 'Seoul',
        items: ['🧢 블루 베이스볼 캡', '🧥 스포티 윈드브레이커', '🧣 개성 넘치는 반다나']
    },
    '고양이': {
        id: '고양이',
        name: '고양이',
        gender: '중성',
        style: '우아한',
        location: 'Busan',
        items: ['🧣 실크 스카프', '🧥 슬림핏 트렌치 코트', '🦪 진주 레이어드 목걸이']
    },
    '햄스터': {
        id: '햄스터',
        name: '햄스터',
        gender: '중성',
        style: '깜찍한',
        location: 'Busan',
        items: ['🎒 옐로우 푸퍼 베스트', '🧤 몽글몽글 귀도리', '🌻 해바라기씨 미니 백']
    }
};

export default function FashionPage() {
    const [members] = useState<string[]>(Object.keys(MEMBERS_DATA));
    const [selectedMemberId, setSelectedMemberId] = useState<string>('');
    const [memberDetail, setMemberDetail] = useState<Member | null>(null);
    const location = useLocation();

    const { currentTemp, loading: weatherLoading, fetchWeather } = useWeather();
    const { recommendation, isThinking, geminiError, getFashionAdvice } = useGeminiFashion();

    // 팀 소개 페이지에서 클릭해서 넘어왔을 경우, 해당 동물 자동 선택
    useEffect(() => {
        if (location.state && location.state.selectedMember) {
            handleMemberSelect(location.state.selectedMember);
        }
    }, [location.state]);

    // Handle member selection and trigger everything
    const handleMemberSelect = async (username: string) => {
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

        // Fetch weather
        const coords = CITY_COORDS[detail.location] || CITY_COORDS['Seoul'];
        console.log('🌤️ Fetching weather for:', detail.location, coords);

        try {
            await fetchWeather(coords.lat, coords.lon);
            console.log('✅ Weather fetched successfully');
        } catch (error) {
            console.error('❌ Weather fetch failed:', error);
        }
    };

    // Manual trigger for fashion advice
    const handleGetFashionAdvice = () => {
        if (!memberDetail) {
            console.error('❌ No member selected');
            return;
        }

        if (currentTemp === null) {
            console.error('❌ No weather data available');
            return;
        }

        console.log('🎨 Triggering fashion advice manually...');
        const condition = currentTemp > 20 ? '맑고 더움' : currentTemp > 10 ? '포근함' : '쌀쌀함';

        getFashionAdvice(currentTemp, condition, {
            gender: memberDetail.gender,
            style: memberDetail.style,
            location: memberDetail.location
        });
    };

    return (
        <div className="flex h-[calc(100vh-80px)] max-w-7xl mx-auto p-6 gap-6">

            {/* Left Sidebar: Team Selection */}
            <aside className="w-1/4 min-w-[250px] bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span>🎨</span> 팀원 선택
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
                                    {member}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-auto pt-6 text-xs text-slate-400 text-center">
                    <p>동물 친구를 선택해서<br />맞춤 패션 추천을 받아보세요! ✨</p>
                </div>
            </aside>

            {/* Right Main Area: Content */}
            <main className="flex-1 bg-white rounded-3xl p-8 shadow-xl border border-slate-100 overflow-y-auto relative min-h-[500px]">
                {!memberDetail ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <div className="text-6xl grayscale opacity-30">👕</div>
                        <p className="text-lg font-medium">왼쪽에서 팀원을 선택해주세요</p>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">

                        {/* Header: Member Fashion Profile */}
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
                                        ✨
                                    </div>
                                </div>

                                {/* Info Details */}
                                <div className="flex-1 text-center md:text-left space-y-4">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <span className="px-4 py-1.5 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-200 rounded-full text-xs font-black uppercase tracking-widest">
                                            {memberDetail.style} STYLE
                                        </span>
                                        <span className="px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-200 rounded-full text-xs font-black uppercase tracking-widest">
                                            {memberDetail.location}
                                        </span>
                                    </div>
                                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
                                        {memberDetail.name}
                                    </h1>
                                    <p className="text-slate-400 font-medium text-lg italic max-w-md">
                                        "오늘 같은 날씨에도 {memberDetail.name}만의 {memberDetail.style}한 무드를 잃지 마세요."
                                    </p>
                                </div>

                                {/* Weather Info Badge */}
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center min-w-[150px] shadow-sm">
                                    {weatherLoading ? (
                                        <div className="animate-pulse space-y-2">
                                            <div className="h-10 w-20 bg-white/10 rounded mx-auto"></div>
                                            <div className="h-4 w-24 bg-white/10 rounded mx-auto"></div>
                                        </div>
                                    ) : currentTemp !== null ? (
                                        <>
                                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                                                {currentTemp}°
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                                                CURRENT TEMP
                                            </div>
                                            <div className="mt-4 flex items-center justify-center gap-1 text-xs font-bold text-blue-300">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
                                                LIVE DATA
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-red-400 text-xs font-bold">WEATHER ERROR</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Get Recommendation Button */}
                        {currentTemp !== null && !recommendation && !isThinking && (
                            <div className="text-center">
                                <button
                                    onClick={handleGetFashionAdvice}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                >
                                    ✨ AI 패션 추천 받기
                                </button>
                            </div>
                        )}

                        {/* Signature Items Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {memberDetail.items.map((item, idx) => (
                                <div key={idx} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center gap-3 transform transition-transform hover:scale-102">
                                    <span className="text-2xl">{item.split(' ')[0]}</span>
                                    <span className="font-semibold text-slate-700">{item.split(' ').slice(1).join(' ')}</span>
                                </div>
                            ))}
                        </div>

                        {/* AI Recommendation Card */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 relative overflow-hidden group hover:border-purple-200 transition-colors">
                            {/* Decorative Blobs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16 pointer-events-none"></div>

                            <h3 className="relative z-10 text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="text-2xl">✨</span>
                                TODAY'S LOOK
                                {isThinking && <span className="text-xs text-purple-600 animate-pulse ml-2">Analyzing style...</span>}
                            </h3>

                            <div className="relative z-10 min-h-[200px]">
                                {isThinking ? (
                                    <div className="space-y-4 animate-pulse">
                                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                                        <div className="h-32 bg-slate-200 rounded w-full mt-6"></div>
                                    </div>
                                ) : recommendation ? (
                                    <div className="prose prose-slate prose-lg max-w-none">
                                        <div className="whitespace-pre-line leading-relaxed text-slate-700 font-medium">
                                            {recommendation}
                                        </div>
                                    </div>
                                ) : geminiError ? (
                                    <div className="text-center py-10">
                                        <p className="text-red-500 mb-4">{geminiError}</p>
                                        <button onClick={handleGetFashionAdvice} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                                            다시 시도
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-slate-400">
                                        <p>위 버튼을 눌러 AI 패션 추천을 받아보세요!</p>
                                    </div>
                                )}
                            </div>

                            {!isThinking && recommendation && (
                                <div className="relative z-10 mt-8 flex justify-end">
                                    <button
                                        onClick={handleGetFashionAdvice}
                                        className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
                                    >
                                        ↻ 다른 추천 받기
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}
