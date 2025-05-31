
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, Globe, Truck, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const MarketAgent = () => {
  const [selectedMarket, setSelectedMarket] = useState("international");
  const [timeHorizon, setTimeHorizon] = useState("12months");

  const priceData = [
    { month: 'Ene', cafe: 4.2, arroz: 0.8, frijoles: 1.2, maiz: 0.6 },
    { month: 'Feb', cafe: 4.4, arroz: 0.9, frijoles: 1.3, maiz: 0.7 },
    { month: 'Mar', cafe: 4.8, arroz: 0.85, frijoles: 1.25, maiz: 0.65 },
    { month: 'Abr', cafe: 5.1, arroz: 0.82, frijoles: 1.4, maiz: 0.68 },
    { month: 'May', cafe: 5.3, arroz: 0.78, frijoles: 1.5, maiz: 0.7 },
    { month: 'Jun', cafe: 5.0, arroz: 0.8, frijoles: 1.45, maiz: 0.72 },
    { month: 'Jul', cafe: 4.9, arroz: 0.85, frijoles: 1.3, maiz: 0.68 },
    { month: 'Ago', cafe: 5.2, arroz: 0.9, frijoles: 1.35, maiz: 0.75 },
    { month: 'Sep', cafe: 5.4, arroz: 0.95, frijoles: 1.4, maiz: 0.78 },
    { month: 'Oct', cafe: 5.6, arroz: 1.0, frijoles: 1.5, maiz: 0.8 },
    { month: 'Nov', cafe: 5.8, arroz: 1.05, frijoles: 1.6, maiz: 0.82 },
    { month: 'Dic', cafe: 6.0, arroz: 1.1, frijoles: 1.7, maiz: 0.85 }
  ];

  const marketShare = [
    { name: 'Estados Unidos', value: 35, color: '#3b82f6' },
    { name: 'Europa', value: 28, color: '#10b981' },
    { name: 'Asia', value: 22, color: '#f59e0b' },
    { name: 'América Latina', value: 10, color: '#ef4444' },
    { name: 'Otros', value: 5, color: '#8b5cf6' }
  ];

  const supplyChainData = [
    { stage: 'Producción', current: 100, optimized: 100, cost: 45 },
    { stage: 'Procesamiento', current: 95, optimized: 98, cost: 15 },
    { stage: 'Almacenamiento', current: 92, optimized: 96, cost: 8 },
    { stage: 'Transporte', current: 88, optimized: 94, cost: 18 },
    { stage: 'Distribución', current: 85, optimized: 92, cost: 14 }
  ];

  const marketMetrics = [
    {
      title: "Precio Promedio",
      value: "$5.20/kg",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Demanda Global",
      value: "2.8M ton",
      change: "+8.3%",
      trend: "up",
      icon: Globe
    },
    {
      title: "Inventarios",
      value: "180k ton",
      change: "-15.2%",
      trend: "down",
      icon: Truck
    },
    {
      title: "Volatilidad",
      value: "18.5%",
      change: "+2.1%",
      trend: "up",
      icon: BarChart3
    }
  ];

  const scenarios = {
    optimistic: {
      name: "Escenario Optimista",
      priceChange: "+25%",
      demandGrowth: "+15%",
      description: "Crecimiento sostenido de la demanda global"
    },
    realistic: {
      name: "Escenario Base",
      priceChange: "+12%",
      demandGrowth: "+8%",
      description: "Tendencias actuales del mercado"
    },
    pessimistic: {
      name: "Escenario Pesimista",
      priceChange: "-5%",
      demandGrowth: "+2%",
      description: "Posible recesión económica global"
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Market Predictor Agent</CardTitle>
              <CardDescription className="text-blue-100">
                Análisis predictivo de mercados y cadenas de distribución con IA
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Controles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <label className="text-sm font-medium mb-2 block">Mercado Objetivo</label>
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar mercado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="international">Mercado Internacional</SelectItem>
                <SelectItem value="domestic">Mercado Doméstico</SelectItem>
                <SelectItem value="regional">Mercado Regional</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <label className="text-sm font-medium mb-2 block">Horizonte Temporal</label>
            <Select value={timeHorizon} onValueChange={setTimeHorizon}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Meses</SelectItem>
                <SelectItem value="6months">6 Meses</SelectItem>
                <SelectItem value="12months">12 Meses</SelectItem>
                <SelectItem value="24months">24 Meses</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {marketMetrics.map((metric, idx) => {
          const IconComponent = metric.icon;
          return (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-xl font-bold">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs principales */}
      <Tabs defaultValue="prices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="prices">Precios</TabsTrigger>
          <TabsTrigger value="demand">Demanda</TabsTrigger>
          <TabsTrigger value="supply">Cadena de Suministro</TabsTrigger>
          <TabsTrigger value="scenarios">Escenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="prices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Proyecciones de Precios</CardTitle>
              <CardDescription>
                Análisis predictivo de precios por cultivo basado en IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`$${value}/kg`, name.charAt(0).toUpperCase() + name.slice(1)]}
                  />
                  <Line type="monotone" dataKey="cafe" stroke="#8b5cf6" strokeWidth={3} name="café" />
                  <Line type="monotone" dataKey="arroz" stroke="#3b82f6" strokeWidth={3} name="arroz" />
                  <Line type="monotone" dataKey="frijoles" stroke="#10b981" strokeWidth={3} name="frijoles" />
                  <Line type="monotone" dataKey="maiz" stroke="#f59e0b" strokeWidth={3} name="maíz" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Factores de Precio</CardTitle>
                <CardDescription>Principales impulsores del mercado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                  <h4 className="font-medium text-green-800">Demanda Creciente</h4>
                  <p className="text-sm text-green-700">+15% en mercados asiáticos</p>
                </div>
                <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded-r">
                  <h4 className="font-medium text-orange-800">Clima Adverso</h4>
                  <p className="text-sm text-orange-700">Sequías en Brasil afectan oferta</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                  <h4 className="font-medium text-blue-800">Logística</h4>
                  <p className="text-sm text-blue-700">Costos de transporte +8%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas de Mercado</CardTitle>
                <CardDescription>Notificaciones generadas por IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">Volatilidad Alta</h4>
                    <p className="text-sm text-red-700">Precios del café +25% en 30 días</p>
                    <Badge variant="destructive" className="mt-1">Urgente</Badge>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Oportunidad de Venta</h4>
                    <p className="text-sm text-yellow-700">Ventana óptima: próximos 14 días</p>
                    <Badge variant="secondary" className="mt-1">Moderado</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demand" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Demanda Global</CardTitle>
                <CardDescription>Participación por región en el mercado</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketShare}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Demanda</CardTitle>
                <CardDescription>Proyección de crecimiento por región</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketShare.map((region, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: region.color }}
                        />
                        <span className="font-medium">{region.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{region.value}%</div>
                        <div className="text-sm text-green-600">
                          +{Math.floor(Math.random() * 10 + 3)}% anual
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Análisis de Demanda Sintética</CardTitle>
              <CardDescription>
                Simulaciones de diferentes escenarios de mercado generados por IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="cafe"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="arroz"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supply" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimización de Cadena de Suministro</CardTitle>
              <CardDescription>
                Análisis de eficiencia y costos en cada etapa del proceso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplyChainData.map((stage, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{stage.stage}</h4>
                      <Badge variant="outline">{stage.cost}% del costo total</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Eficiencia Actual</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${stage.current}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{stage.current}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">IA Optimizada</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${stage.optimized}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{stage.optimized}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-2">
                      Mejora potencial: +{stage.optimized - stage.current}%
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución Alternativa</CardTitle>
                <CardDescription>Rutas optimizadas por IA</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-4">
                  <Truck className="h-4 w-4 mr-2" />
                  Generar Rutas IA
                </Button>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border rounded">
                    <h4 className="font-medium">Ruta Actual</h4>
                    <p className="text-sm text-gray-600">Costo: $2.5M | Tiempo: 15 días</p>
                  </div>
                  <div className="p-3 bg-green-50 border rounded">
                    <h4 className="font-medium">Ruta Optimizada IA</h4>
                    <p className="text-sm text-gray-600">Costo: $2.1M | Tiempo: 12 días</p>
                    <Badge variant="default" className="mt-1">-16% costo</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventario Inteligente</CardTitle>
                <CardDescription>Gestión predictiva de stock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>Stock Actual</span>
                    <span className="font-semibold">180k ton</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span>Demanda Proyectada</span>
                    <span className="font-semibold">220k ton</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded">
                    <span>Déficit Estimado</span>
                    <span className="font-semibold text-orange-600">-40k ton</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Ajustar Plan de Producción
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <Card key={key} className={key === 'realistic' ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {scenario.name}
                    {key === 'realistic' && <Badge>Base</Badge>}
                  </CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cambio en Precios:</span>
                    <span className={`font-semibold ${
                      scenario.priceChange.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {scenario.priceChange}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crecimiento Demanda:</span>
                    <span className="font-semibold text-blue-600">{scenario.demandGrowth}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Simular Escenario
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generador de Escenarios Sintéticos</CardTitle>
              <CardDescription>
                Crea nuevos escenarios de mercado usando modelos generativos de IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Button size="lg" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generar Escenario IA
                  </Button>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Parámetros de Generación:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Volatilidad: Media-Alta</li>
                      <li>• Horizonte: 18 meses</li>
                      <li>• Factores externos: Activados</li>
                      <li>• Confianza: 89%</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-700 mb-2">Escenario Generado</h4>
                  <p className="text-sm text-gray-600">
                    Los resultados del escenario sintético aparecerán aquí
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Tiempo de generación: ~30 segundos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketAgent;
