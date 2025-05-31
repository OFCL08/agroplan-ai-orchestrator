
import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  humidity: number;
  location: string;
  country: string;
  description: string;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  loading: boolean;
  error: string | null;
}

export const useWeatherData = (latitude: number | null, longitude: number | null) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    humidity: 0,
    location: '',
    country: '',
    description: '',
    windSpeed: 0,
    pressure: 0,
    visibility: 0,
    uvIndex: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchWeatherData = async () => {
      try {
        // Para desarrollo, usaremos una API key pública temporal
        // En producción, deberías obtener tu propia API key de OpenWeatherMap
        const API_KEY = 'demo_key'; // El usuario necesitará su propia clave
        
        // Por ahora, simularemos datos reales para demostrar la funcionalidad
        setTimeout(() => {
          setWeatherData({
            temperature: Math.round(15 + Math.random() * 20), // Temperatura entre 15-35°C
            humidity: Math.round(50 + Math.random() * 40), // Humedad entre 50-90%
            location: 'San José',
            country: 'Costa Rica',
            description: 'Parcialmente nublado',
            windSpeed: Math.round(5 + Math.random() * 10), // Viento entre 5-15 km/h
            pressure: Math.round(1010 + Math.random() * 20), // Presión entre 1010-1030 hPa
            visibility: Math.round(8 + Math.random() * 2), // Visibilidad entre 8-10 km
            uvIndex: Math.round(1 + Math.random() * 10), // UV entre 1-11
            loading: false,
            error: null,
          });
        }, 1000);

        // Código comentado para la implementación real con API key
        /*
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
        );
        
        if (!response.ok) {
          throw new Error('Error al obtener datos del clima');
        }
        
        const data = await response.json();
        
        setWeatherData({
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          location: data.name,
          country: data.sys.country,
          description: data.weather[0].description,
          windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
          pressure: data.main.pressure,
          visibility: Math.round(data.visibility / 1000), // meters to km
          uvIndex: 0, // Requiere llamada adicional a UV API
          loading: false,
          error: null,
        });
        */
        
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(prev => ({
          ...prev,
          loading: false,
          error: 'Error al obtener datos del clima',
        }));
      }
    };

    setWeatherData(prev => ({ ...prev, loading: true }));
    fetchWeatherData();
  }, [latitude, longitude]);

  return weatherData;
};
