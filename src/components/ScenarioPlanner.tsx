
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Map, Calendar, Target, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const ScenarioPlanner = () => {
  const [selectedPlan, setSelectedPlan] = useState("national");
  const [planningHorizon, setPlanningHorizon] = useState("5years");

  const planTypes = {
    national: {
      name: "Plan Nacional",
      scope: "Todo el país",
      duration: "5 años",
      budget: "$2.8B",
      regions: 7
    },
    regional: {
      name: "Plan Regional",
      scope: "Valle Central",
      duration: "3 años",
      budget: "$850M",
      regions: 3
    },
    cooperative: {
      name: "Plan Cooperativa",
      scope: "COOCAFE",
      duration: "2 años",
      budget: "$120M",
      regions: 1
    }
  };

  const integrationData = [
    { factor: 'Clima', weight: 95, integration: 92 },
    { factor: 'Cultivos', weight: 88, integration: 89 },
    { factor: 'Mercado', weight: 91, integration: 87 },
    { factor: 'Logística', weight: 75, integration: 78 },
    { factor: 'Políticas', weight: 82, integration: 74 },
    { factor: 'Recursos', weight: 86, integration: 81 }
  ];

  const timelineData = [
    { phase: 'Q1 2025', climate: 85, crops: 60, market: 70, integration: 72 },
    { phase: 'Q2 2025', climate: 88, crops: 75, market: 78, integration: 80 },
    { phase: 'Q3 2025', climate: 90, crops: 85, market: 82, integration: 86 },
    { phase: 'Q4 2025', climate: 92, crops: 90, market: 85, integration: 89 },
    { phase: 'Q1 2026', climate: 94, crops: 92, market: 88, integration: 91 },
    { phase: 'Q2 2026', climate: 95, crops: 94, market: 90, integration: 93 }
  ];

  const strategicObjectives = [
    {
      title: "Incrementar Productividad",
      target: "25% en 5 años",
      current: 68,
      status: "en progreso",
      priority: "alta"
    },
    {
      title: "Reducir Riesgos Climáticos",
      target: "50% vulnerabilidad",
      current: 45,
      status: "en progreso",
      priority: "alta"
    },
    {
      title: "Optimizar Mercados",
      target: "15% nuevos mercados",
      current: 32,
      status: "planificado",
      priority: "media"
    },
    {
      title: "Sostenibilidad Ambiental",
      target: "Carbon neutral 2030",
      current: 28,
      status: "iniciado",
      priority: "media"
    }
  ];

  const scenarios = [
    {
      name: "Escenario Base",
      probability: 45,
      impact: "Medio",
      description: "Condiciones normales de mercado y clima",
      outcomes: {
        productivity: "+12%",
        revenue: "+$340M",
        sustainability: "Mejora gradual"
      }
    },
    {
      name: "Escenario Optimista",
      probability: 25,
      impact: "Alto",
      description: "Demanda global alta, clima favorable",
      outcomes: {
        productivity: "+28%",
        revenue: "+$890M",
        sustainability: "Avance acelerado"
      }
    },
    {
      name: "Escenario de Crisis",
      probability: 30,
      impact: "Alto",
      description: "Cambio climático severo, volatilidad de mercados",
      outcomes: {
        productivity: "-8%",
        revenue: "-$220M",
        sustainability: "Retroceso temporal"
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Scenario Planner Agent</CardTitle>
              <CardDescription className="text-purple-100">
                Planificación estratégica integral con simulaciones multi-agente
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Controles de planificación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <label className="text-sm font-medium mb-2 block">Tipo de Plan</label>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo de plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="national">Plan Nacional</SelectItem>
                <SelectItem value="regional">Plan Regional</SelectItem>
                <SelectItem value="cooperative">Plan Cooperativa</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <label className="text-sm font-medium mb-2 block">Horizonte de Planificación</label>
            <Select value={planningHorizon} onValueChange={setPlanningHorizon}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar horizonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2years">2 Años</SelectItem>
                <SelectItem value="3years">3 Años</SelectItem>
                <SelectItem value="5years">5 Años</SelectItem>
                <SelectItem value="10years">10 Años</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Resumen del plan seleccionado */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{planTypes[selectedPlan].name}</CardTitle>
              <CardDescription>
                Alcance: {planTypes[selectedPlan].scope} • Duración: {planTypes[selectedPlan].duration}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{planTypes[selectedPlan].budget}</div>
              <div className="text-sm text-gray-600">Inversión total</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Map className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Regiones</p>
                <p className="font-semibold">{planTypes[selectedPlan].regions}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Objetivos</p>
                <p className="font-semibold">{strategicObjectives.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Fases</p>
                <p className="font-semibold">6</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className="font-semibold">Planificación</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs principales */}
      <Tabs defaultValue="integration" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integration">Integración</TabsTrigger>
          <TabsTrigger value="objectives">Objetivos</TabsTrigger>
          <TabsTrigger value="scenarios">Escenarios</TabsTrigger>
          <TabsTrigger value="timeline">Cronograma</TabsTrigger>
        </TabsList>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integración Multi-Agente</CardTitle>
              <CardDescription>
                Nivel de integración de datos entre todos los agentes del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={integrationData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="factor" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Peso/Importancia"
                    dataKey="weight"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Nivel Integración"
                    dataKey="integration"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Integración</CardTitle>
                <CardDescription>Progreso de sincronización entre agentes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrationData.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.factor}</span>
                      <span className="text-sm text-gray-600">{item.integration}%</span>
                    </div>
                    <Progress value={item.integration} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Coherencia</CardTitle>
                <CardDescription>Indicadores de calidad del plan integrado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                  <h4 className="font-medium text-green-800">Coherencia Climática</h4>
                  <p className="text-sm text-green-700">94% alineación con pronósticos</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                  <h4 className="font-medium text-blue-800">Viabilidad Económica</h4>
                  <p className="text-sm text-blue-700">87% factibilidad financiera</p>
                </div>
                <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded-r">
                  <h4 className="font-medium text-orange-800">Riesgo Integrado</h4>
                  <p className="text-sm text-orange-700">Nivel medio - monitoreando</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategicObjectives.map((objective, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{objective.title}</CardTitle>
                    <Badge 
                      variant={objective.priority === 'alta' ? 'default' : 'secondary'}
                    >
                      {objective.priority}
                    </Badge>
                  </div>
                  <CardDescription>Meta: {objective.target}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progreso</span>
                      <span className="font-semibold">{objective.current}%</span>
                    </div>
                    <Progress value={objective.current} className="h-2" />
                    <div className="flex items-center gap-2">
                      {objective.status === 'en progreso' && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {objective.status === 'planificado' && <Clock className="h-4 w-4 text-orange-500" />}
                      {objective.status === 'iniciado' && <AlertTriangle className="h-4 w-4 text-blue-500" />}
                      <span className="text-sm capitalize">{objective.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generador de Objetivos IA</CardTitle>
              <CardDescription>
                Crea objetivos estratégicos adicionales basados en análisis predictivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Button size="lg" className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Generar Objetivos IA
                  </Button>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Parámetros de Generación:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Contexto: {planTypes[selectedPlan].name}</li>
                      <li>• Horizonte: {planTypes[selectedPlan].duration}</li>
                      <li>• Presupuesto: {planTypes[selectedPlan].budget}</li>
                      <li>• Prioridad: Sostenibilidad + ROI</li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-700 mb-2">Objetivos Generados</h4>
                  <p className="text-sm text-gray-600">
                    Los nuevos objetivos estratégicos aparecerán aquí
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario, idx) => (
              <Card key={idx} className={idx === 0 ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    {idx === 0 && <Badge>Seleccionado</Badge>}
                  </div>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Probabilidad:</span>
                    <span className="font-semibold">{scenario.probability}%</span>
                  </div>
                  <Progress value={scenario.probability} className="h-2" />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Resultados Esperados:</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Productividad:</span>
                        <span className="font-medium">{scenario.outcomes.productivity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ingresos:</span>
                        <span className="font-medium">{scenario.outcomes.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sostenibilidad:</span>
                        <span className="font-medium">{scenario.outcomes.sustainability}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Simular Escenario
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Matriz de Escenarios</CardTitle>
              <CardDescription>
                Análisis comparativo de todos los escenarios posibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Escenario</th>
                      <th className="text-left p-3">Probabilidad</th>
                      <th className="text-left p-3">Impacto</th>
                      <th className="text-left p-3">Preparación</th>
                      <th className="text-left p-3">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((scenario, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{scenario.name}</td>
                        <td className="p-3">{scenario.probability}%</td>
                        <td className="p-3">
                          <Badge 
                            variant={scenario.impact === 'Alto' ? 'default' : 'secondary'}
                          >
                            {scenario.impact}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Progress value={75 - idx * 20} className="w-16 h-2" />
                        </td>
                        <td className="p-3">
                          <Button variant="outline" size="sm">
                            Ver Plan
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cronograma de Implementación</CardTitle>
              <CardDescription>
                Progreso planificado de integración y despliegue por fases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="phase" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="climate" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Climate Agent"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="crops" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Crop Agent"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="market" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    name="Market Agent"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="integration" 
                    stroke="#8b5cf6" 
                    strokeWidth={4}
                    name="Integración Total"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hitos Principales</CardTitle>
                <CardDescription>Eventos clave en el cronograma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { phase: "Q1 2025", milestone: "Integración Climate Agent", status: "completado" },
                  { phase: "Q2 2025", milestone: "Despliegue Crop Modeling", status: "en progreso" },
                  { phase: "Q3 2025", milestone: "Activación Market Predictor", status: "planificado" },
                  { phase: "Q4 2025", milestone: "Integración Completa", status: "planificado" },
                  { phase: "Q1 2026", milestone: "Optimización Multi-Agente", status: "futuro" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                    {item.status === 'completado' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {item.status === 'en progreso' && <Clock className="h-5 w-5 text-orange-500" />}
                    {item.status === 'planificado' && <AlertTriangle className="h-5 w-5 text-blue-500" />}
                    {item.status === 'futuro' && <Settings className="h-5 w-5 text-gray-400" />}
                    <div className="flex-1">
                      <h4 className="font-medium">{item.milestone}</h4>
                      <p className="text-sm text-gray-600">{item.phase}</p>
                    </div>
                    <Badge 
                      variant={item.status === 'completado' ? 'default' : 
                              item.status === 'en progreso' ? 'secondary' : 'outline'}
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recursos y Dependencias</CardTitle>
                <CardDescription>Gestión de recursos por fase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 border rounded">
                  <h4 className="font-medium text-blue-800">Recursos Técnicos</h4>
                  <p className="text-sm text-blue-700">Infrastructure: AWS, Azure ML</p>
                  <p className="text-sm text-blue-700">Personal: 12 ingenieros, 3 científicos de datos</p>
                </div>
                <div className="p-3 bg-green-50 border rounded">
                  <h4 className="font-medium text-green-800">Datos y APIs</h4>
                  <p className="text-sm text-green-700">Climate: NOAA, NASA</p>
                  <p className="text-sm text-green-700">Market: Bloomberg, Reuters</p>
                </div>
                <div className="p-3 bg-orange-50 border rounded">
                  <h4 className="font-medium text-orange-800">Dependencias Críticas</h4>
                  <p className="text-sm text-orange-700">Aprobaciones regulatorias</p>
                  <p className="text-sm text-orange-700">Integración con sistemas legacy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScenarioPlanner;
