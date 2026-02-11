import React, { useState, useEffect } from 'react';

const SchoolPage = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [team, setTeam] = useState<any[]>([]);
    const [myId, setMyId] = useState('1'); // 테스트용 학생ID

    const loadAll = () => {
        fetch('http://localhost:8000/api/courses').then(res => res.json()).then(setCourses);
        fetch('http://localhost:8000/api/team').then(res => res.json()).then(setTeam);
    };

    useEffect(() => { loadAll(); }, []);

    const handleAction = (type: string, courseId: number) => {
        fetch(`http://localhost:8000/api/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: myId, course_id: courseId })
        }).then(async res => {
            const data = await res.json();
            alert(res.ok ? data.message : data.detail);
            loadAll();
        });
    };

    return (
        <div style={{ padding: '30px', maxWidth: '1100px', margin: '0 auto', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>🌟 캐릭터 맞춤형 수강 신청</h1>

            {/* 동물 4인방 특성 카드 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '40px' }}>
                {team.map(m => (
                    <div key={m.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '40px' }}>{m.emoji}</div>
                        <h3 style={{ margin: '10px 0' }}>{m.name} ({m.role})</h3>
                        <p style={{ fontSize: '12px', color: '#007bff' }}>{m.strength}</p>
                        <p style={{ fontSize: '11px', color: '#666' }}>"{m.description}"</p>
                    </div>
                ))}
            </div>

            {/* 수강 신청 리스트 */}
            <div style={{ display: 'grid', gap: '15px' }}>
                {courses.map(c => {
                    const isFull = c.current_students >= c.max_students;
                    return (
                        <div key={c.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', border: isFull ? '2px solid red' : '1px solid #ddd' }}>
                            <div>
                                <h3 style={{ margin: 0 }}>{c.title}</h3>
                                <p style={{ color: isFull ? 'red' : '#555', fontWeight: 'bold' }}>
                                    실시간 현황: {c.current_students} / {c.max_students} 명
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <button onClick={() => handleAction('enroll', c.id)} disabled={isFull} style={{ backgroundColor: isFull ? '#ccc' : '#28a745', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>신청</button>
                                <button onClick={() => handleAction('unenroll', c.id)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>취소</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SchoolPage;