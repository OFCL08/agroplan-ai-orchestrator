
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Droplets, Leaf, TrendingUp, Download, CheckCircle, AlertTriangle, Sun } from "lucide-react";

const FarmerDashboard = () => {
  const [coordinates] = useState({ lat: 9.9281, lng: -84.0907 }); // Coordenadas de Costa Rica

  const locationData = {
    region: "Cartago, Costa Rica",
    elevation: "1,435 msnm",
    soilType: "Andisol volcánico",
    microclimate: "Subtropical húmedo"
  };

  const todayRecommendations = [
    {
      category: "Riego",
      priority: "alta",
      icon: Droplets,
      title: "Suspender riego por 2 días",
      description: "Se esperan 15-20mm de lluvia en las próximas 48 horas",
      action: "Revisar drenajes"
    },
    {
      category: "Nutrición",
      priority: "media",
      icon: Leaf,
      title: "Aplicar fertilizante foliar",
      description: "Condiciones óptimas para absorción de nutrientes",
      action: "Aplicar antes de las 10:00 AM"
    },
    {
      category: "Cosecha",
      priority: "alta",
      icon: CheckCircle,
      title: "Ventana óptima de cosecha",
      description: "Café alcanzó 22% de humedad ideal",
      action: "Cosechar lotes 3 y 4"
    }
  ];

  const weeklyForecast = [
    { day: "Hoy", temp: "22°C", rain: "15mm", humidity: "78%", recommendation: "Suspender riego" },
    { day: "Mañana", temp: "21°C", rain: "8mm", humidity: "82%", recommendation: "Monitorear plagas" },
    { day: "Miércoles", temp: "24°C", rain: "2mm", humidity: "65%", recommendation: "Riego ligero" },
    { day: "Jueves", temp: "25°C", rain: "0mm", humidity: "58%", recommendation: "Riego normal" },
    { day: "Viernes", temp: "23°C", rain: "5mm", humidity: "72%", recommendation: "Fertilización foliar" }
  ];

  const keyMetrics = [
    { label: "Temperatura", value: "22°C", status: "optimal", icon: Thermometer },
    { label: "Humedad", value: "78%", status: "high", icon: Droplets },
    { label: "Precipitación", value: "15mm", status: "good", icon: Sun },
    { label: "Precio Café", value: "$2.85/kg", status: "rising", icon: TrendingUp }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-green-600 bg-green-50 border-green-200";
      case "good": return "text-blue-600 bg-blue-50 border-blue-200";
      case "high": return "text-orange-600 bg-orange-50 border-orange-200";
      case "rising": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta": return "border-red-400 bg-red-50";
      case "media": return "border-yellow-400 bg-yellow-50";
      case "baja": return "border-green-400 bg-green-50";
      default: return "border-gray-400 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <MapPin className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Mi Finca Inteligente</CardTitle>
                  <CardDescription className="text-green-100 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {locationData.region} • {locationData.elevation}
                  </CardDescription>
                </div>
              </div>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Download className="h-4 w-4 mr-2" />
                Reporte Completo
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Métricas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {keyMetrics.map((metric, idx) => {
            const IconComponent = metric.icon;
            return (
              <Card key={idx} className={`border-2 ${getStatusColor(metric.status)}`}>
                <CardContent className="p-4 text-center">
                  <IconComponent className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm font-medium">{metric.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recomendaciones de hoy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Recomendaciones para Hoy
            </CardTitle>
            <CardDescription>
              Acciones prioritarias basadas en condiciones actuales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayRecommendations.map((rec, idx) => {
                const IconComponent = rec.icon;
                return (
                  <div key={idx} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(rec.priority)}`}>
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-2 rounded-full">
                        <IconComponent className="h-5 w-5 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                          <Badge 
                            variant={rec.priority === "alta" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                        <p className="text-sm font-medium text-gray-800">
                          ✓ {rec.action}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pronóstico de la semana */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-600" />
              Pronóstico Semanal
            </CardTitle>
            <CardDescription>
              Planifica tus actividades agrícolas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {weeklyForecast.map((day, idx) => (
                <div key={idx} className="bg-gradient-to-b from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-800 mb-2">{day.day}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-1">
                      <Thermometer className="h-3 w-3 text-red-500" />
                      <span>{day.temp}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Droplets className="h-3 w-3 text-blue-500" />
                      <span>{day.rain}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Humedad: {day.humidity}
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-white/60 rounded text-xs font-medium">
                    {day.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estado del cultivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Estado del Cultivo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Etapa de Crecimiento</span>
                <Badge variant="default">Floración</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">Salud del Cultivo</span>
                <Badge variant="default" className="bg-green-600">Excelente</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium">Rendimiento Esperado</span>
                <span className="font-semibold text-green-600">+12% vs promedio</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Alertas y Monitoreo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Sin plagas detectadas</p>
                  <p className="text-xs text-green-600">Última inspección: Ayer</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Monitorear humedad del suelo</p>
                  <p className="text-xs text-yellow-600">Revisar en 2 días</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información de ubicación */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Coordenadas</p>
                <p className="font-mono text-sm">{coordinates.lat}, {coordinates.lng}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Tipo de Suelo</p>
                <p className="text-sm font-medium">{locationData.soilType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Microclima</p>
                <p className="text-sm font-medium">{locationData.microclimate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Última Actualización</p>
                <p className="text-sm font-medium">Hace 5 minutos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
