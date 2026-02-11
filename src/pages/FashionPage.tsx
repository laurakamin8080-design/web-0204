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
        location: 'Seoul'
    },
    '강아지': {
        id: '강아지',
        name: '강아지',
        gender: '중성',
        style: '활발한',
        location: 'Seoul'
    },
    '고양이': {
        id: '고양이',
        name: '고양이',
        gender: '중성',
        style: '우아한',
        location: 'Busan'
    },
    '햄스터': {
        id: '햄스터',
        name: '햄스터',
        gender: '중성',
        style: '깜찍한',
        location: 'Busan'
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

                        {/* Header: Member Info & Weather */}
                        <div className="flex justify-between items-end border-b border-slate-100 pb-6">
                            <div>
                                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                                    {memberDetail.style}
                                </span>
                                <h1 className="text-4xl font-extrabold text-slate-900 mb-1">
                                    {memberDetail.name} <span className="text-slate-400 font-light text-2xl">for {memberDetail.location}</span>
                                </h1>
                            </div>
                            <div className="text-right">
                                {weatherLoading ? (
                                    <div className="animate-pulse flex flex-col items-end">
                                        <div className="h-8 w-16 bg-slate-200 rounded mb-1"></div>
                                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                    </div>
                                ) : currentTemp !== null ? (
                                    <>
                                        <div className="text-5xl font-bold text-slate-800">
                                            {currentTemp}° <span className="text-2xl text-slate-400">C</span>
                                        </div>
                                        <div className="text-sm text-slate-500 font-medium mt-1">
                                            현재 {memberDetail.location} 날씨
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-red-400 text-sm">날씨 로드 실패</div>
                                )}
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
