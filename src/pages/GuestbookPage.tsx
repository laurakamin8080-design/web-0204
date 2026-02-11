import Guestbook from '../components/Guestbook';

export default function GuestbookPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
                    우리들의 <span className="text-blue-600">작은 공간</span> 📝
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    방문해주신 여러분의 소중한 메시지를 남겨주세요.
                </p>
            </div>

            <Guestbook />
        </div>
    );
}
