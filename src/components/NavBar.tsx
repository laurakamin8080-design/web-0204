import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const navItems = [
        { name: '홈', path: '/' },
        { name: '팀 소개', path: '/team' },
        { name: '창작의 부작용', path: '/fashion' },
        { name: '방명록', path: '/guestbook' },
        { name: '수강신청', path: '/school' },
    ];

    return (
        <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none'
                            : 'text-slate-600 hover:bg-sky-100 hover:text-blue-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                        }`
                    }
                >
                    {item.name}
                </NavLink>
            ))}
        </nav>
    );
}
