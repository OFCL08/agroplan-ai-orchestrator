import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, DollarSign, BarChart3, Globe, AlertTriangle, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const MarketAgent = () => {
  const [selectedMarket, setSelectedMarket] = useState("cafe");
  const [timeHorizon, setTimeHorizon] = useState("6months");

  const marketData = [
    { month: 'Ene', cafe: 2.45, arroz: 0.65, frijoles: 1.8, maiz: 0.45 },
    { month: 'Feb', cafe: 2.52, arroz: 0.68, frijoles: 1.85, maiz: 0.47 },
    { month: 'Mar', cafe: 2.48, arroz: 0.72, frijoles: 1.92, maiz: 0.51 },
    { month: 'Abr', cafe: 2.61, arroz: 0.75, frijoles: 1.97, maiz: 0.53 },
    { month: 'May', cafe: 2.73, arroz: 0.78, frijoles: 2.05, maiz: 0.56 },
    { month: 'Jun', cafe: 2.85, arroz: 0.82, frijoles: 2.12, maiz: 0.58 }
  ];

  const demandProjections = [
    { region: 'América del Norte', demand: 35, growth: 2.3 },
    { region: 'Europa', demand: 28, growth: 1.8 },
    { region: 'Asia', demand: 25, growth: 4.2 },
    { region: 'América Latina', demand: 12, growth: 3.1 }
  ];

  const marketMetrics = [
    { label: "Precio Promedio", value: "$2.67/kg", change: "+8.3%", icon: DollarSign },
    { label: "Volumen Export.", value: "2.8M tons", change: "+12%", icon: TrendingUp },
    { label: "Demanda Global", value: "15.2M tons", change: "+5.7%", icon: Globe },
    { label: "Volatilidad", value: "14.2%", change: "-2.1%", icon: BarChart3 }
  ];

  const riskFactors = [
    {
      factor: "Clima Extremo",
      probability: 0.32,
      impact: "Alto",
      description: "Sequías o lluvias excesivas pueden afectar el 23% de la producción regional"
    },
    {
      factor: "Volatilidad Precios",
      probability: 0.28,
      impact: "Medio",
      description: "Fluctuaciones del mercado internacional pueden generar variaciones del 15%"
    },
    {
      factor: "Competencia Regional",
      probability: 0.41,
      impact: "Medio",
      description: "Nuevos productores en la región pueden reducir márgenes en 8-12%"
    }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Market Predictor Agent</CardTitle>
              <CardDescription className="text-emerald-100">
                Proyecciones de mercado y análisis de precios con IA predictiva
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Métricas de mercado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {marketMetrics.map((metric, idx) => {
          const IconComponent = metric.icon;
          return (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-xl font-bold">{metric.value}</p>
                    <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change} vs año anterior
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Simulador de mercado */}
      <Tabs defaultValue="prices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="prices">Precios</TabsTrigger>
          <TabsTrigger value="demand">Demanda</TabsTrigger>
          <TabsTrigger value="risks">Riesgos</TabsTrigger>
          <TabsTrigger value="scenarios">Escenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="prices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Proyecciones de Precios</CardTitle>
              <CardDescription>
                Análisis predictivo de precios por cultivo y región
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cultivo Objetivo</label>
                  <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cultivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="arroz">Arroz</SelectItem>
                      <SelectItem value="frijoles">Frijoles</SelectItem>
                      <SelectItem value="maiz">Maíz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Horizonte Temporal</label>
                  <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar periodo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 meses</SelectItem>
                      <SelectItem value="6months">6 meses</SelectItem>
                      <SelectItem value="12months">12 meses</SelectItem>
                      <SelectItem value="24months">24 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">
                  Análisis de {capitalizeFirst(selectedMarket)} - {timeHorizon}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Precio actual:</span>
                    <span className="ml-1 font-medium">$2.67/kg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Proyección:</span>
                    <span className="ml-1 font-medium text-green-600">$2.95/kg (+10.5%)</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Confianza:</span>
                    <span className="ml-1 font-medium">87%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Volatilidad:</span>
                    <span className="ml-1 font-medium">±8.2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Precios</CardTitle>
              <CardDescription>Evolución histórica y proyecciones</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMarket} 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demand" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demanda por Región</CardTitle>
                <CardDescription>Distribución global de demanda proyectada</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={demandProjections}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ region, demand }) => `${region}: ${demand}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="demand"
                    >
                      {demandProjections.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crecimiento Proyectado</CardTitle>
                <CardDescription>Tasa de crecimiento anual por región</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demandProjections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="growth" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Oportunidades de Mercado</CardTitle>
              <CardDescription>
                Análisis de nichos y segmentos emergentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                  <h4 className="font-medium text-green-800">Mercado Orgánico</h4>
                  <p className="text-sm text-green-700">
                    Crecimiento del 23% anual. Premium de precio del 40-60% sobre productos convencionales.
                  </p>
                  <Badge variant="default" className="mt-2">Oportunidad Alta</Badge>
                </div>

                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <h4 className="font-medium text-blue-800">Exportación Directa</h4>
                  <p className="text-sm text-blue-700">
                    Eliminación de intermediarios puede aumentar márgenes en 25-35%.
                  </p>
                  <Badge variant="secondary" className="mt-2">Oportunidad Media</Badge>
                </div>

                <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                  <h4 className="font-medium text-orange-800">Procesamiento Local</h4>
                  <p className="text-sm text-orange-700">
                    Valor agregado puede incrementar ingresos en 45-70% pero requiere inversión inicial.
                  </p>
                  <Badge variant="outline" className="mt-2">Evaluación Requerida</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Riesgos de Mercado</CardTitle>
              <CardDescription>
                Identificación y evaluación de factores de riesgo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((risk, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        {risk.factor}
                      </h4>
                      <Badge 
                        variant={risk.impact === 'Alto' ? 'destructive' : 'secondary'}
                      >
                        Impacto {risk.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Probabilidad: {(risk.probability * 100).toFixed(0)}%
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${risk.probability * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estrategias de Mitigación</CardTitle>
              <CardDescription>
                Recomendaciones para reducir exposición al riesgo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Diversificación</h4>
                  <p className="text-sm text-blue-700">
                    Distribuir cultivos en múltiples variedades y ciclos de cosecha.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Contratos Forward</h4>
                  <p className="text-sm text-green-700">
                    Asegurar precios mediante contratos a futuro con compradores.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Seguros Agrícolas</h4>
                  <p className="text-sm text-purple-700">
                    Protección contra pérdidas por eventos climáticos extremos.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Monitoreo Continuo</h4>
                  <p className="text-sm text-orange-700">
                    Seguimiento en tiempo real de indicadores de mercado.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Simulación de Escenarios</CardTitle>
              <CardDescription>
                Análisis de diferentes condiciones de mercado futuras
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-800">Escenario Optimista</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Precio:</span>
                      <span className="font-medium text-green-700">+15-25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Demanda:</span>
                      <span className="font-medium text-green-700">+12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Probabilidad:</span>
                      <span className="font-medium">32%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-800">Escenario Base</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Precio:</span>
                      <span className="font-medium text-yellow-700">+5-10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Demanda:</span>
                      <span className="font-medium text-yellow-700">+6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Probabilidad:</span>
                      <span className="font-medium">45%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium text-red-800">Escenario Pesimista</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Precio:</span>
                      <span className="font-medium text-red-700">-10-5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Demanda:</span>
                      <span className="font-medium text-red-700">-3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Probabilidad:</span>
                      <span className="font-medium">23%</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ejecutar Simulación Monte Carlo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketAgent;
