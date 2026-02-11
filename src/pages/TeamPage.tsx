import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    // 백엔드 파이썬 서버 주소
    fetch('http://localhost:8000/api/team')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error("데이터를 불러오지 못했습니다:", err));
  }, []);

  const handleCardClick = (name: string) => {
    navigate('/fashion', { state: { selectedMember: name } });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>🐾 우리 패션팀 어벤져스</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {members.map(member => (
          <div
            key={member.id}
            onClick={() => handleCardClick(member.name)}
            style={{
              border: '1px solid #eee',
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              backgroundColor: 'white'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '50px' }}>{member.emoji}</div>
            <div style={{ color: '#888', fontSize: '12px' }}>#{member.mbti}</div>
            <h3 style={{ margin: '10px 0' }}>{member.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#007bff' }}>{member.role}</p>
            <div style={{ textAlign: 'left', fontSize: '14px', marginTop: '10px' }}>
              <p><strong>💪 강점:</strong> {member.strength}</p>
              <p><strong>🎨 취미:</strong> {member.hobby}</p>
              <p style={{ marginTop: '10px', color: '#666', fontStyle: 'italic' }}>"{member.description}"</p>
              <p style={{ marginTop: '10px', fontSize: '11px', color: '#9d4edd', textAlign: 'center', fontWeight: 'bold' }}>✨ 클릭하여 패션 추천 받기</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;