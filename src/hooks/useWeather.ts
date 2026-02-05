import { useState } from 'react';
import axios from 'axios';

const useWeather = () => {
    const [currentTemp, setCurrentTemp] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get(
                'https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current_weather=true'
            );

            setCurrentTemp(res.data.current_weather.temperature);
        } catch (e) {
            setError('날씨 불러오기 실패');
        } finally {
            setLoading(false);
        }
    };

    return {
        currentTemp,
        loading,
        error,
        fetchWeather,
    };
};

export default useWeather;
