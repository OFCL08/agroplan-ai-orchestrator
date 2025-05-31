
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Cloud, 
  Sprout, 
  TrendingUp, 
  FileText, 
  Settings,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react";
import ClimateAgent from "@/components/ClimateAgent";
import CropAgent from "@/components/CropAgent";
import MarketAgent from "@/components/MarketAgent";
import ScenarioPlanner from "@/components/ScenarioPlanner";
import ReportGenerator from "@/components/ReportGenerator";

const Index = () => {
  const [activeAgent, setActiveAgent] = useState("overview");

  const agents = [
    {
      id: "climate",
      name: "Climate Forecaster",
      icon: Cloud,
      status: "active",
      accuracy: 94,
      description: "Análisis climático avanzado con IA"
    },
    {
      id: "crop",
      name: "Crop Modeling",
      icon: Sprout,
      status: "active",
      accuracy: 87,
      description: "Simulación de rendimientos por cultivo"
    },
    {
      id: "market",
      name: "Market Predictor",
      icon: TrendingUp,
      status: "processing",
      accuracy: 91,
      description: "Proyecciones de precios y demanda"
    },
    {
      id: "scenario",
      name: "Scenario Planner",
      icon: Settings,
      status: "active",
      accuracy: 89,
      description: "Planificación estratégica integrada"
    },
    {
      id: "report",
      name: "Report Generator",
      icon: FileText,
      status: "ready",
      accuracy: 96,
      description: "Reportes automáticos multimodales"
    }
  ];

  const currentSeason = {
    region: "Valle Central, Costa Rica",
    season: "Temporada 2024-2025",
    startDate: "Octubre 2024",
    crops: ["Café", "Arroz", "Frijoles", "Maíz"],
    totalArea: "125,000 hectáreas",
    estimatedYield: "$2.8B USD"
  };

  const alerts = [
    {
      type: "warning",
      message: "Posible sequía en región Norte - Abril 2025",
      priority: "alta"
    },
    {
      type: "success",
      message: "Condiciones óptimas para siembra de café detectadas",
      priority: "media"
    },
    {
      type: "info",
      message: "Nuevos datos de mercado internacional disponibles",
      priority: "baja"
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header con información de temporada */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{currentSeason.season}</h2>
            <div className="flex items-center gap-4 text-green-100">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{currentSeason.region}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Inicio: {currentSeason.startDate}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{currentSeason.estimatedYield}</div>
            <div className="text-green-200">Proyección de valor</div>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Área Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSeason.totalArea}</div>
            <p className="text-xs text-green-600">+8% vs año anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cultivos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSeason.crops.length}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {currentSeason.crops.map((crop, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{crop}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Precisión Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.4%</div>
            <Progress value={91.4} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Agentes Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.filter(a => a.status === 'active').length}/5</div>
            <div className="flex items-center gap-1 mt-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600">Todos operativos</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estados de agentes */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Agentes IA</CardTitle>
          <CardDescription>
            Monitoreo en tiempo real de todos los agentes del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <Card key={agent.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveAgent(agent.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{agent.name}</span>
                      </div>
                      <Badge 
                        variant={agent.status === 'active' ? 'default' : 
                                agent.status === 'processing' ? 'secondary' : 'outline'}
                      >
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Precisión</span>
                      <span className="font-semibold">{agent.accuracy}%</span>
                    </div>
                    <Progress value={agent.accuracy} className="mt-1" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alertas y notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas del Sistema</CardTitle>
          <CardDescription>
            Notificaciones importantes basadas en análisis de IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border">
                {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />}
                {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                {alert.type === 'info' && <Activity className="h-5 w-5 text-blue-500 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <Badge 
                    variant={alert.priority === 'alta' ? 'destructive' : 
                            alert.priority === 'media' ? 'secondary' : 'outline'}
                    className="mt-1"
                  >
                    Prioridad {alert.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AgroPlan AgentNet</h1>
                <p className="text-sm text-gray-600">Simulación y Planificación Agrícola con IA</p>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeAgent} onValueChange={setActiveAgent} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="climate">Clima</TabsTrigger>
            <TabsTrigger value="crop">Cultivos</TabsTrigger>
            <TabsTrigger value="market">Mercado</TabsTrigger>
            <TabsTrigger value="scenario">Escenarios</TabsTrigger>
            <TabsTrigger value="report">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="climate">
            <ClimateAgent />
          </TabsContent>

          <TabsContent value="crop">
            <CropAgent />
          </TabsContent>

          <TabsContent value="market">
            <MarketAgent />
          </TabsContent>

          <TabsContent value="scenario">
            <ScenarioPlanner />
          </TabsContent>

          <TabsContent value="report">
            <ReportGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
