
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cloud, CloudRain, Sun, Thermometer, Droplets, Wind } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const ClimateAgent = () => {
  const [selectedScenario, setSelectedScenario] = useState("normal");
  const [timeRange, setTimeRange] = useState([6]);

  // Datos simulados de temperatura y precipitación
  const temperatureData = [
    { month: 'Ene', temp: 24, precip: 45 },
    { month: 'Feb', temp: 25, precip: 38 },
    { month: 'Mar', temp: 26, precip: 52 },
    { month: 'Abr', temp: 27, precip: 78 },
    { month: 'May', temp: 26, precip: 156 },
    { month: 'Jun', temp: 25, precip: 189 },
    { month: 'Jul', temp: 24, precip: 165 },
    { month: 'Ago', temp: 25, precip: 142 },
    { month: 'Sep', temp: 25, precip: 198 },
    { month: 'Oct', temp: 24, precip: 225 },
    { month: 'Nov', temp: 23, precip: 156 },
    { month: 'Dic', temp: 23, precip: 89 }
  ];

  const scenarios = {
    normal: {
      name: "Escenario Normal",
      description: "Condiciones climáticas promedio histórico",
      risk: "Bajo",
      color: "green"
    },
    drought: {
      name: "Sequía Prolongada",
      description: "Reducción del 40% en precipitaciones",
      risk: "Alto",
      color: "red"
    },
    flood: {
      name: "Lluvias Intensas",
      description: "Aumento del 60% en precipitaciones",
      risk: "Medio",
      color: "orange"
    },
    heatwave: {
      name: "Ola de Calor",
      description: "Temperaturas 3°C por encima del promedio",
      risk: "Alto",
      color: "red"
    }
  };

  const weatherMetrics = [
    { label: "Temperatura Promedio", value: "25.2°C", change: "+1.2°C", icon: Thermometer },
    { label: "Precipitación Acumulada", value: "1,433mm", change: "-15%", icon: CloudRain },
    { label: "Humedad Relativa", value: "78%", change: "+3%", icon: Droplets },
    { label: "Velocidad del Viento", value: "12 km/h", change: "-2%", icon: Wind }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Cloud className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Climate Forecaster Agent</CardTitle>
              <CardDescription className="text-blue-100">
                Análisis climático avanzado con modelos de IA generativa
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Métricas climáticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {weatherMetrics.map((metric, idx) => {
          const IconComponent = metric.icon;
          return (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-xl font-bold">{metric.value}</p>
                    <p className={`text-xs ${metric.change.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                      {metric.change} vs promedio
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Simulador de escenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Simulador de Escenarios Climáticos</CardTitle>
          <CardDescription>
            Genera y analiza diferentes escenarios climáticos usando IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Escenario Climático</label>
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar escenario" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(scenarios).map(([key, scenario]) => (
                    <SelectItem key={key} value={key}>
                      {scenario.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">{scenarios[selectedScenario].name}</h4>
                <p className="text-sm text-gray-600 mt-1">{scenarios[selectedScenario].description}</p>
                <Badge 
                  className="mt-2"
                  variant={scenarios[selectedScenario].color === 'red' ? 'destructive' : 
                          scenarios[selectedScenario].color === 'orange' ? 'secondary' : 'default'}
                >
                  Riesgo {scenarios[selectedScenario].risk}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Horizonte de Predicción: {timeRange[0]} meses
              </label>
              <Slider
                value={timeRange}
                onValueChange={setTimeRange}
                max={12}
                min={1}
                step={1}
                className="mt-2"
              />
              
              <Button className="w-full mt-4" size="lg">
                <Cloud className="h-4 w-4 mr-2" />
                Generar Simulación IA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos de datos climáticos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendencias de Temperatura</CardTitle>
            <CardDescription>Proyección mensual para los próximos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Precipitaciones Proyectadas</CardTitle>
            <CardDescription>Milímetros de lluvia esperados por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="precip" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas climáticas */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Climáticas Generadas por IA</CardTitle>
          <CardDescription>
            Notificaciones automáticas basadas en análisis predictivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
              <Sun className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">Posible Sequía - Abril 2025</h4>
                <p className="text-sm text-orange-700">
                  Los modelos de IA detectan 73% de probabilidad de condiciones secas prolongadas.
                  Recomendación: Ajustar plan de riego para cultivos sensibles.
                </p>
                <Badge variant="secondary" className="mt-2">Confianza: 87%</Badge>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <CloudRain className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Ventana Óptima de Siembra</h4>
                <p className="text-sm text-blue-700">
                  Condiciones ideales detectadas para siembra de maíz entre el 15-25 de Marzo.
                  Temperatura y humedad en rangos óptimos.
                </p>
                <Badge variant="default" className="mt-2">Confianza: 94%</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClimateAgent;
