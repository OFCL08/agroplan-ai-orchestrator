import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Droplets, Leaf, TrendingUp, Download, CheckCircle, AlertTriangle, Sun, Cloud, Zap, Activity } from "lucide-react";

const FarmerDashboard = () => {
  const [coordinates] = useState({ lat: 9.9281, lng: -84.0907 });

  const locationData = {
    region: "Cartago, Costa Rica",
    elevation: "1,435 msnm",
    soilType: "Andisol volcánico",
    microclimate: "Subtropical húmedo"
  };

  const alerts = [
    {
      type: "warning",
      message: "Posible sequía en región Norte - Abril 2025",
      priority: "alta",
      icon: AlertTriangle,
      color: "from-amarillo-maiz to-orange-500"
    },
    {
      type: "success",
      message: "Condiciones óptimas para siembra de café detectadas",
      priority: "media",
      icon: CheckCircle,
      color: "from-verde-hoja to-verde-oliva"
    },
    {
      type: "info",
      message: "Nuevos datos de mercado internacional disponibles",
      priority: "baja",
      icon: Activity,
      color: "from-azul-cielo to-blue-500"
    }
  ];

  const todayRecommendations = [
    {
      category: "Riego",
      priority: "alta",
      icon: Droplets,
      title: "🌧️ Pausa el riego por 2 días",
      description: "Se esperan lluvias perfectas de 15-20mm",
      action: "Revisa los drenajes",
      gradient: "from-azul-cielo to-blue-500"
    },
    {
      category: "Nutrición",
      priority: "media",
      icon: Leaf,
      title: "🌱 Momento ideal para fertilizar",
      description: "Las plantas absorberán mejor los nutrientes",
      action: "Aplica antes de las 10:00 AM",
      gradient: "from-verde-hoja to-verde-oliva"
    },
    {
      category: "Cosecha",
      priority: "alta",
      icon: CheckCircle,
      title: "☕ Tu café está listo",
      description: "Humedad perfecta del 22% alcanzada",
      action: "Cosecha lotes 3 y 4 hoy",
      gradient: "from-tierra-calida to-amber-600"
    }
  ];

  const weeklyCards = [
    { day: "HOY", temp: "22°", icon: Sun, rain: "15mm", color: "from-amarillo-maiz to-orange-500", textColor: "text-gris-piedra" },
    { day: "MAÑ", temp: "21°", icon: Cloud, rain: "8mm", color: "from-azul-cielo to-blue-500", textColor: "text-white" },
    { day: "MIÉ", temp: "24°", icon: Sun, rain: "2mm", color: "from-verde-oliva to-verde-hoja", textColor: "text-white" },
    { day: "JUE", temp: "25°", icon: Sun, rain: "0mm", color: "from-verde-hoja to-emerald-600", textColor: "text-white" },
    { day: "VIE", temp: "23°", icon: Droplets, rain: "5mm", color: "from-tierra-calida to-amber-600", textColor: "text-white" }
  ];

  const quickStats = [
    { label: "Temperatura", value: "22°C", icon: Thermometer, color: "from-tierra-calida to-red-500", emoji: "🌡️" },
    { label: "Humedad", value: "78%", icon: Droplets, color: "from-azul-cielo to-blue-500", emoji: "💧" },
    { label: "Precio Café", value: "$2.85", icon: TrendingUp, color: "from-verde-hoja to-verde-oliva", emoji: "📈" },
    { label: "Estado", value: "Óptimo", icon: Zap, color: "from-amarillo-maiz to-orange-500", emoji: "⚡" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blanco-natural via-azul-cielo/20 to-verde-oliva/20 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header con paleta natural */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-verde-hoja via-verde-oliva to-tierra-calida opacity-90"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-white/10 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Leaf className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">🌱 Mi Finca Inteligente</h1>
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{locationData.region}</span>
                    <span className="text-lg">•</span>
                    <span className="text-lg">{locationData.elevation}</span>
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

        {/* Alertas del Sistema con nueva paleta */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gris-piedra mb-6">🚨 Alertas del Sistema</h2>
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

        {/* Stats Rápidas con nueva paleta */}
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

        {/* Recomendaciones con nueva paleta */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gris-piedra mb-6">✨ Recomendaciones de Hoy</h2>
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

        {/* Pronóstico con nueva paleta */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gris-piedra mb-6">🌤️ Esta Semana</h2>
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

        {/* Estado del Cultivo con nueva paleta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-verde-hoja to-verde-oliva rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-center">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="text-2xl font-bold mb-2">Floración</h3>
              <p className="text-white/80">Etapa actual del cultivo</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-azul-cielo to-blue-500 rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-center">
              <div className="text-6xl mb-4">💚</div>
              <h3 className="text-2xl font-bold mb-2">Excelente</h3>
              <p className="text-white/80">Salud del cultivo</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-tierra-calida to-amber-600 rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-2">+12%</h3>
              <p className="text-white/80">Sobre el promedio</p>
            </div>
          </div>
        </div>

        {/* Footer con nueva paleta */}
        <div className="bg-blanco-natural/80 backdrop-blur-sm rounded-3xl p-6 text-center border border-verde-oliva/20">
          <div className="flex items-center justify-center gap-8 text-sm text-gris-piedra">
            <div>📍 {coordinates.lat}, {coordinates.lng}</div>
            <div>🌱 {locationData.soilType}</div>
            <div>🕐 Actualizado hace 5 min</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboard;
