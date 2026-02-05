import useWeather from './hooks/useWeather';

function App() {
  const { currentTemp, loading, error, fetchWeather } = useWeather();

  return (
    <div className="weather-card">
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>오늘의 날씨</h1>
      <p style={{ opacity: 0.8, marginBottom: '24px' }}>대한민국, 서울</p>

      <div style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <p className="loading-dots" style={{ fontSize: '1.2rem' }}>정보를 불러오는 중</p>
        ) : error ? (
          <p style={{ color: '#ff8a8a' }}>{error}</p>
        ) : currentTemp !== null ? (
          <>
            <div style={{ fontSize: '5rem', marginBottom: '10px' }}>
              {currentTemp > 20 ? '☀️' : currentTemp > 10 ? '🌤️' : '❄️'}
            </div>
            <div className="temp-display">{currentTemp}°C</div>
          </>
        ) : (
          <p style={{ opacity: 0.6 }}>버튼을 눌러 날씨를 확인하세요</p>
        )}
      </div>

      <button className="btn-weather" onClick={fetchWeather}>
        날씨 가져오기
      </button>

      <div style={{ marginTop: '30px', fontSize: '0.8rem', opacity: 0.5 }}>
        Open-Meteo API 실시간 데이터
      </div>
    </div>
  );
}

export default App;

