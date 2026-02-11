import { useState, useEffect } from 'react';

interface GuestbookEntry {
    id: number;
    nickname: string;
    message: string;
    created_at: string;
}

export default function Guestbook() {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [nickname, setNickname] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchEntries = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/guestbook');
            if (response.ok) {
                const data = await response.json();
                setEntries(data);
            }
        } catch (error) {
            console.error('❌ 방명록 로딩 실패:', error);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nickname.trim() || !message.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/guestbook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname, message }),
            });

            if (response.ok) {
                setNickname('');
                setMessage('');
                fetchEntries();
            }
        } catch (error) {
            console.error('❌ 방명록 작성 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-3xl">📒</span> 방명록
            </h2>

            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-10">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <textarea
                    placeholder="메시지를 남겨주세요!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    required
                ></textarea>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                >
                    {loading ? '등록 중...' : '글 남기기 🚀'}
                </button>
            </form>

            {/* 목록 */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {entries.length === 0 ? (
                    <p className="text-center text-slate-400 py-8 italic">첫 번째 방명록을 기다리고 있어요! ✨</p>
                ) : (
                    entries.map((entry) => (
                        <div key={entry.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-600 animate-fade-in">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-slate-900 dark:text-white">{entry.nickname}</span>
                                <span className="text-xs text-slate-400">
                                    {entry.created_at ? new Date(entry.created_at).toLocaleString() : ''}
                                </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap">{entry.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
