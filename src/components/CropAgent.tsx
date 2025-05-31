import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Sprout, Wheat, Coffee, Apple, TrendingUp, AlertCircle } from "lucide-react";
import { Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Unity, useUnityContext } from "react-unity-webgl";

const CropAgent = () => {
  const [selectedCrop, setSelectedCrop] = useState("cafe");
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/agri.loader.js",
    dataUrl: "/Build/agri.data.br",
    frameworkUrl: "/Build/agri.framework.js.br",
    codeUrl: "/Build/agri.wasm.br"
  });

  const crops = {
    cafe: {
      name: "Café",
      icon: Coffee,
      currentYield: 1.2,
      projectedYield: 1.4,
      area: "45,000 ha",
      value: "$890M",
      growth: "+16.7%",
      risk: "Medio"
    },
    arroz: {
      name: "Arroz",
      icon: Wheat,
      currentYield: 4.8,
      projectedYield: 5.1,
      area: "32,000 ha",
      value: "$540M",
      growth: "+6.3%",
      risk: "Bajo"
    },
    frijoles: {
      name: "Frijoles",
      icon: Sprout,
      currentYield: 0.9,
      projectedYield: 1.0,
      area: "28,000 ha",
      value: "$320M",
      growth: "+11.1%",
      risk: "Medio"
    },
    maiz: {
      name: "Maíz",
      icon: Apple,
      currentYield: 3.2,
      projectedYield: 3.5,
      area: "20,000 ha",
      value: "$280M",
      growth: "+9.4%",
      risk: "Alto"
    }
  };

  const yieldData = [
    { region: 'Norte', cafe: 1.3, arroz: 5.2, frijoles: 1.1, maiz: 3.8 },
    { region: 'Central', cafe: 1.4, arroz: 4.9, frijoles: 0.9, maiz: 3.2 },
    { region: 'Sur', cafe: 1.2, arroz: 4.6, frijoles: 1.0, maiz: 3.4 },
    { region: 'Pacífico', cafe: 1.5, arroz: 5.1, frijoles: 0.8, maiz: 3.6 },
    { region: 'Caribe', cafe: 1.1, arroz: 4.8, frijoles: 1.2, maiz: 3.1 }
  ];

  const optimizationFactors = [
    { factor: 'Fertilización', actual: 65, optimal: 85, fullMark: 100 },
    { factor: 'Riego', actual: 78, optimal: 90, fullMark: 100 },
    { factor: 'Rotación', actual: 45, optimal: 75, fullMark: 100 },
    { factor: 'Pest Control', actual: 82, optimal: 88, fullMark: 100 },
    { factor: 'Timing', actual: 70, optimal: 92, fullMark: 100 },
    { factor: 'Densidad', actual: 68, optimal: 80, fullMark: 100 }
  ];

  const simulationResults = [
    {
      scenario: "Optimización Actual",
      yield: crops[selectedCrop].currentYield,
      efficiency: 68,
      cost: 100,
      profit: 145
    },
    {
      scenario: "IA Recomendado",
      yield: crops[selectedCrop].projectedYield,
      efficiency: 85,
      cost: 108,
      profit: 187
    },
    {
      scenario: "Máximo Teórico",
      yield: crops[selectedCrop].projectedYield * 1.2,
      efficiency: 95,
      cost: 125,
      profit: 203
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Sprout className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Crop Modeling Agent</CardTitle>
              <CardDescription className="text-green-100">
                Simulación avanzada de rendimientos y optimización de cultivos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Selector de cultivos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(crops).map(([key, crop]) => {
          const IconComponent = crop.icon;
          const isSelected = selectedCrop === key;
          return (
            <Card 
              key={key} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-green-500 bg-green-50' : ''
              }`}
              onClick={() => setSelectedCrop(key)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className={`h-6 w-6 ${isSelected ? 'text-green-600' : 'text-gray-600'}`} />
                  <h3 className="font-semibold">{crop.name}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Área:</span>
                    <span className="font-medium">{crop.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor:</span>
                    <span className="font-medium">{crop.value}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Proyección:</span>
                    <Badge variant="default" className="text-xs">{crop.growth}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detalles del cultivo seleccionado */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="optimization">Optimización</TabsTrigger>
          <TabsTrigger value="simulation">Simulación</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Métricas de rendimiento */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Rendimiento Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{crops[selectedCrop].currentYield} t/ha</div>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Proyección IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{crops[selectedCrop].projectedYield} t/ha</div>
                <p className="text-sm text-green-600 mt-1">{crops[selectedCrop].growth}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Área Cultivada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{crops[selectedCrop].area}</div>
                <p className="text-sm text-gray-600 mt-1">Total nacional</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Valor Estimado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{crops[selectedCrop].value}</div>
                <Badge variant={crops[selectedCrop].risk === 'Alto' ? 'destructive' : 
                              crops[selectedCrop].risk === 'Medio' ? 'secondary' : 'default'}>
                  Riesgo {crops[selectedCrop].risk}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de rendimiento por región */}
          <Unity unityProvider={unityProvider} style={{ width: '100%', height: '400px' }} />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Factores de Optimización</CardTitle>
              <CardDescription>
                Comparación entre prácticas actuales y recomendaciones de IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={optimizationFactors}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="factor" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Actual"
                    dataKey="actual"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Óptimo IA"
                    dataKey="optimal"
                    stroke="#059669"
                    fill="#059669"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {optimizationFactors.map((factor, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{factor.factor}</h4>
                    <Badge variant="outline">{factor.optimal - factor.actual}% mejora</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Actual: {factor.actual}%</span>
                      <span>Óptimo: {factor.optimal}%</span>
                    </div>
                    <Progress value={factor.actual} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Simulaciones de Escenarios</CardTitle>
              <CardDescription>
                Comparación de diferentes estrategias de manejo de cultivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {simulationResults.map((scenario, idx) => (
                  <Card key={idx} className={idx === 1 ? 'ring-2 ring-green-500' : ''}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{scenario.scenario}</CardTitle>
                      {idx === 1 && <Badge className="w-fit">Recomendado</Badge>}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rendimiento:</span>
                        <span className="font-semibold">{scenario.yield} t/ha</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Eficiencia:</span>
                        <span className="font-semibold">{scenario.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Costo:</span>
                        <span className="font-semibold">{scenario.cost}%</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Beneficio:</span>
                        <span className="font-bold">{scenario.profit}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simulador Interactivo</CardTitle>
              <CardDescription>
                Genera nuevas simulaciones con parámetros personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Ejecutar Simulación IA
                  </Button>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Configuración Actual:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Cultivo: {crops[selectedCrop].name}</li>
                      <li>• Temporada: 2024-2025</li>
                      <li>• Región: Nacional</li>
                      <li>• Modelo: DeepCrop v2.1</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <Sprout className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Los resultados de la simulación aparecerán aquí</p>
                  <p className="text-sm text-gray-500 mt-1">Tiempo estimado: 2-3 minutos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Oportunidades de Mejora
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                  <h4 className="font-medium text-green-800">Optimizar Fertilización</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Implementar fertilización variable puede aumentar el rendimiento en 15-20%.
                  </p>
                  <Badge variant="default" className="mt-2">Impacto Alto</Badge>
                </div>

                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                  <h4 className="font-medium text-blue-800">Mejorar Timing de Siembra</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Ajustar fechas de siembra según predicciones climáticas (+12% rendimiento).
                  </p>
                  <Badge variant="secondary" className="mt-2">Impacto Medio</Badge>
                </div>

                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r">
                  <h4 className="font-medium text-yellow-800">Implementar Rotación</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    La rotación de cultivos puede mejorar la salud del suelo a largo plazo.
                  </p>
                  <Badge variant="outline" className="mt-2">Impacto Bajo</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Alertas y Riesgos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                  <h4 className="font-medium text-red-800">Riesgo de Plagas</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Condiciones favorables para broca del café detectadas en región Norte.
                  </p>
                  <Badge variant="destructive" className="mt-2">Urgente</Badge>
                </div>

                <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded-r">
                  <h4 className="font-medium text-orange-800">Estrés Hídrico</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Posible déficit de agua en abril-mayo. Preparar sistemas de riego.
                  </p>
                  <Badge variant="secondary" className="mt-2">Moderado</Badge>
                </div>

                <div className="p-3 bg-gray-50 border-l-4 border-gray-500 rounded-r">
                  <h4 className="font-medium text-gray-800">Monitoreo Nutricional</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Realizar análisis de suelo en parcelas con bajo rendimiento histórico.
                  </p>
                  <Badge variant="outline" className="mt-2">Preventivo</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Plan de Acción Recomendado</CardTitle>
              <CardDescription>
                Cronograma de implementación generado por IA para maximizar rendimientos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: "Marzo 2025", action: "Preparación de suelo y análisis nutricional", priority: "Alta" },
                  { month: "Abril 2025", action: "Siembra optimizada según ventana climática", priority: "Alta" },
                  { month: "Mayo 2025", action: "Primera fertilización variable", priority: "Media" },
                  { month: "Junio 2025", action: "Monitoreo de plagas y control preventivo", priority: "Alta" },
                  { month: "Julio 2025", action: "Evaluación intermedia y ajustes", priority: "Media" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.action}</h4>
                      <p className="text-sm text-gray-600">{item.month}</p>
                    </div>
                    <Badge 
                      variant={item.priority === 'Alta' ? 'default' : 'secondary'}
                    >
                      {item.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CropAgent;
