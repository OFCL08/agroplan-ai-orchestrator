import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Thermometer, Droplets, TrendingUp, Download, Zap } from "lucide-react";
import { getLocationData, alerts, todayRecommendations, weeklyCards } from "@/constants/dashboardData";
import ChatBot from "./ChatBot";

// Hardcoded data for development
const MOCK_DATA = {
  coordinates: {
    latitude: 9.9281,
    longitude: -84.0907,
  },
  forecast: {
    humidity: 78,
    condition: "Óptimo",
    price: 2.85
  },
  historical: {
    weeklyTemperatures: [22, 23, 24, 25, 23, 24, 25],
    weeklyHumidity: [75, 78, 76, 77, 78, 75, 74]
  }
};

interface ForecastResponse {
  hourly: {
    temperature_2m: number[];
    relative_humidity_2m: number[];
  };
  elevation: number;
}

const FarmerDashboard = () => {
  const [coordinates, setCoordinates] = useState(MOCK_DATA.coordinates);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [currentHumidity, setCurrentHumidity] = useState<number | null>(null);
  const [elevation, setElevation] = useState<number | null>(null);

  // Get user's location and fetch forecast
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoordinates(coords);
          setError(null);

          // Fetch forecast data
          try {
            const response = await fetch(`http://ec2-44-244-36-34.us-west-2.compute.amazonaws.com:8000/forecast_data`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sensor_id: "default_sensor",
                latitude: coords.latitude,
                longitude: coords.longitude,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to fetch forecast data');
            }

            const data: ForecastResponse = await response.json();
            
            // Get the elevation and weather data
            setElevation(data.elevation);
            if (data.hourly?.temperature_2m?.length > 0) {
              setCurrentTemp(data.hourly.temperature_2m[0]);
            }
            if (data.hourly?.relative_humidity_2m?.length > 0) {
              setCurrentHumidity(data.hourly.relative_humidity_2m[0]);
            }
            if (!data.hourly?.temperature_2m?.length && !data.hourly?.relative_humidity_2m?.length) {
              throw new Error('No weather data available');
            }
          } catch (err) {
            console.error('Error fetching forecast:', err);
            setError('Error fetching weather data. Using default values.');
            setCurrentTemp(24); // Fallback temperature
            setCurrentHumidity(78); // Fallback humidity
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to get your location. Using default coordinates.");
          setCurrentTemp(24); // Fallback temperature
          setCurrentHumidity(78); // Fallback humidity
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Using default coordinates.");
      setCurrentTemp(24); // Fallback temperature
      setCurrentHumidity(78); // Fallback humidity
    }
  }, []);

  const locationData = getLocationData(coordinates);

  // Temperature color logic
  const getTemperatureColor = (temp: number) => {
    if (temp < 10) {
      return "from-blue-400 to-blue-600";
    } else if (temp > 30) {
      return "from-red-400 to-red-600";
    } else {
      return "from-yellow-300 to-yellow-600";
    }
  };

  // Humidity color logic
  const getHumidityColor = (humidity: number) => {
    if (humidity < 30) {
      return "from-yellow-400 to-yellow-600"; // Dry
    } else if (humidity > 70) {
      return "from-blue-600 to-blue-800"; // Very humid
    } else {
      return "from-blue-400 to-cyan-500"; // Normal
    }
  };

  const quickStats = [
    {
      label: "Temperatura",
      value: currentTemp ? `${currentTemp.toFixed(1)}°C` : "Cargando...",
      icon: Thermometer,
      color: currentTemp ? getTemperatureColor(currentTemp) : "from-gray-400 to-gray-600",
      emoji: "🌡️"
    },
    { 
      label: "Humedad", 
      value: currentHumidity ? `${currentHumidity.toFixed(0)}%` : "Cargando...", 
      icon: Droplets, 
      color: currentHumidity ? getHumidityColor(currentHumidity) : "from-gray-400 to-gray-600", 
      emoji: "💧" 
    },
    { 
      label: "Precio Café", 
      value: `$${MOCK_DATA.forecast.price}`, 
      icon: TrendingUp, 
      color: "from-green-400 to-emerald-500", 
      emoji: "📈" 
    },
    { 
      label: "Estado", 
      value: MOCK_DATA.forecast.condition, 
      icon: Zap, 
      color: "from-green-400 to-green-500", 
      emoji: "⚡" 
    }
  ];

  // Add loading state display
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Cargando los datos de tu finca...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Note: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Header Súper Atractivo */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 opacity-90"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-white/10 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <MapPin className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">🌱 Mi Finca Inteligente</h1>
                  <div className="flex items-center gap-3 text-emerald-100">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{`${coordinates.latitude.toFixed(4)}°N, ${coordinates.longitude.toFixed(4)}°W`}</span>
                    <span className="text-lg">•</span>
                    <span className="text-lg">{elevation ? `${elevation}m snm` : 'Cargando...'}</span>
                  </div>
                </div>
              </div>
              <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 text-lg px-8 py-6 rounded-2xl">
                <Download className="h-6 w-6 mr-3" />
                Descargar Reporte Completo
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Rápidas con Estilo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.color} p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl`}>
                <div className="absolute top-2 right-2 text-3xl opacity-80">{stat.emoji}</div>
                <div className="flex flex-col h-full justify-between">
                  <IconComponent className="h-8 w-8 mb-3" />
                  <div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-white/90 text-sm font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alertas del Sistema */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🚨 Alertas del Sistema</h2>
          <div className="grid gap-6">
            {alerts.map((alert, idx) => {
              const IconComponent = alert.icon;
              return (
                <div key={idx} className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${alert.color} p-6 text-white transform hover:scale-[1.02] transition-all duration-300 shadow-2xl`}>
                  <div className="absolute top-4 right-4 opacity-20">
                    <IconComponent className="h-16 w-16" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold mb-2">{alert.message}</p>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                          <span className="text-sm font-medium">Prioridad {alert.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recomendaciones Súper Visuales */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">✨ Recomendaciones de Hoy</h2>
          <div className="grid gap-6">
            {todayRecommendations.map((rec, idx) => {
              const IconComponent = rec.icon;
              return (
                <div key={idx} className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${rec.gradient} p-8 text-white transform hover:scale-[1.02] transition-all duration-300 shadow-2xl`}>
                  <div className="absolute top-4 right-4 opacity-20">
                    <IconComponent className="h-24 w-24" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{rec.title}</h3>
                        <p className="text-white/90 text-lg mb-4">{rec.description}</p>
                        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full inline-block">
                          <span className="font-semibold">✓ {rec.action}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pronóstico Visual */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🌤️ Esta Semana</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {weeklyCards.map((day, idx) => {
              const IconComponent = day.icon;
              return (
                <div key={idx} className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${day.color} p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-xl`}>
                  <div className="space-y-3">
                    <h3 className={`font-bold text-lg ${day.textColor}`}>{day.day}</h3>
                    <IconComponent className={`h-12 w-12 mx-auto ${day.textColor}`} />
                    <div className={`${day.textColor}`}>
                      <p className="text-2xl font-bold">{day.temp}</p>
                      <p className="text-sm opacity-90">{day.rain}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add ChatBot */}
      <ChatBot />
    </div>
  );
};

export default FarmerDashboard;