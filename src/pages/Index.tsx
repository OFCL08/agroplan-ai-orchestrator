
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
import FarmerDashboard from "@/components/FarmerDashboard";

const Index = () => {
  const [activeAgent, setActiveAgent] = useState("farmer");

  const agents = [
    {
      id: "farmer",
      name: "Mi Finca",
      icon: Sprout,
      status: "active",
      accuracy: 96,
      description: "Dashboard personalizado para agricultores"
    },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header con información de temporada */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-white/10 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          <div className="relative p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Activity className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">📊 Vista General del Sistema</h1>
                  <div className="flex items-center gap-3 text-blue-100">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{currentSeason.region}</span>
                    <span className="text-lg">•</span>
                    <span className="text-lg">{currentSeason.season}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentSeason.estimatedYield}</div>
                <div className="text-blue-200">Proyección de valor</div>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas principales con gradientes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="absolute top-2 right-2 text-3xl opacity-80">🌾</div>
            <div className="flex flex-col h-full justify-between">
              <MapPin className="h-8 w-8 mb-3" />
              <div>
                <p className="text-3xl font-bold mb-1">{currentSeason.totalArea}</p>
                <p className="text-green-100 text-sm font-medium">Área Total</p>
                <p className="text-xs text-green-200">+8% vs año anterior</p>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400 to-cyan-500 p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="absolute top-2 right-2 text-3xl opacity-80">🌱</div>
            <div className="flex flex-col h-full justify-between">
              <Sprout className="h-8 w-8 mb-3" />
              <div>
                <p className="text-3xl font-bold mb-1">{currentSeason.crops.length}</p>
                <p className="text-blue-100 text-sm font-medium">Cultivos Activos</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {currentSeason.crops.slice(0, 2).map((crop, idx) => (
                    <span key={idx} className="bg-white/20 text-xs px-2 py-1 rounded">{crop}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-400 to-pink-500 p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="absolute top-2 right-2 text-3xl opacity-80">🎯</div>
            <div className="flex flex-col h-full justify-between">
              <TrendingUp className="h-8 w-8 mb-3" />
              <div>
                <p className="text-3xl font-bold mb-1">91.4%</p>
                <p className="text-purple-100 text-sm font-medium">Precisión Promedio</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="absolute top-2 right-2 text-3xl opacity-80">🤖</div>
            <div className="flex flex-col h-full justify-between">
              <Activity className="h-8 w-8 mb-3" />
              <div>
                <p className="text-3xl font-bold mb-1">{agents.filter(a => a.status === 'active').length}/5</p>
                <p className="text-orange-100 text-sm font-medium">Agentes Activos</p>
                <p className="text-xs text-orange-200">Todos operativos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estados de agentes con diseño visual */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🤖 Estado de Agentes IA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              const gradientColors = {
                farmer: "from-green-400 to-emerald-500",
                climate: "from-cyan-400 to-blue-500", 
                crop: "from-emerald-400 to-green-500",
                market: "from-orange-400 to-amber-500",
                scenario: "from-purple-400 to-purple-500",
                report: "from-pink-400 to-rose-500"
              };
              return (
                <div key={agent.id} className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradientColors[agent.id]} p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer`}
                      onClick={() => setActiveAgent(agent.id)}>
                  <div className="absolute top-4 right-4 opacity-20">
                    <IconComponent className="h-16 w-16" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <IconComponent className="h-8 w-8" />
                      <span className="font-bold text-lg">{agent.name}</span>
                    </div>
                    <p className="text-white/90 text-sm mb-4">{agent.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">{agent.status}</span>
                      <span className="font-bold text-lg">{agent.accuracy}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
                <h1 className="text-xl font-bold text-gray-900">AgroSync</h1>
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
          <TabsList className="grid grid-cols-7 w-full h-20 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-2">
            <TabsTrigger 
              value="farmer" 
              className="flex flex-col items-center gap-2 h-full rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-50 transition-all duration-300"
            >
              <Sprout className="h-6 w-6" />
              <span className="text-xs font-medium">Mi Finca</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="overview" 
              className="flex flex-col items-center gap-2 h-full rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50 transition-all duration-300"
            >
              <Activity className="h-6 w-6" />
              <span className="text-xs font-medium">Vista General</span>
            </TabsTrigger>

            <TabsTrigger 
              value="climate" 
              className="flex flex-col items-center gap-2 h-full rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-cyan-50 transition-all duration-300"
            >
              <Cloud className="h-6 w-6" />
              <span className="text-xs font-medium">Clima</span>
            </TabsTrigger>

            <TabsTrigger 
              value="crop" 
              className="flex flex-col items-center gap-2 h-full rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-emerald-50 transition-all duration-300"
            >
              <Sprout className="h-6 w-6" />
              <span className="text-xs font-medium">Cultivos</span>
            </TabsTrigger>

            <TabsTrigger 
              value="market" 
              className="flex flex-col items-center gap-2 h-full rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-orange-50 transition-all duration-300"
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-xs font-medium">Mercado</span>
            </TabsTrigger>

            <TabsTrigger 
              value="scenario" 
              className="flex flex-col items-center gap-2 h-full rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50 transition-all duration-300"
            >
              <Settings className="h-6 w-6" />
              <span className="text-xs font-medium">Escenarios</span>
            </TabsTrigger>

            <TabsTrigger 
              value="report" 
              className="flex flex-col items-center gap-2 h-full rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-pink-50 transition-all duration-300"
            >
              <FileText className="h-6 w-6" />
              <span className="text-xs font-medium">Reportes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farmer">
            <FarmerDashboard />
          </TabsContent>

          <TabsContent value="overview">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="climate">
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-4">
              <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white mb-8">
                  <div className="absolute top-4 right-4 opacity-20">
                    <Cloud className="h-24 w-24" />
                  </div>
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <Cloud className="h-12 w-12" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold mb-2">🌤️ Climate Forecaster</h1>
                      <p className="text-cyan-100 text-lg">Análisis climático avanzado con IA</p>
                    </div>
                  </div>
                </div>
                <ClimateAgent />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="crop">
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-4">
              <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-white mb-8">
                  <div className="absolute top-4 right-4 opacity-20">
                    <Sprout className="h-24 w-24" />
                  </div>
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <Sprout className="h-12 w-12" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold mb-2">🌱 Crop Modeling</h1>
                      <p className="text-emerald-100 text-lg">Simulación de rendimientos por cultivo</p>
                    </div>
                  </div>
                </div>
                <CropAgent />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="market">
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
              <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-amber-600 p-8 text-white mb-8">
                  <div className="absolute top-4 right-4 opacity-20">
                    <TrendingUp className="h-24 w-24" />
                  </div>
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <TrendingUp className="h-12 w-12" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold mb-2">📈 Market Predictor</h1>
                      <p className="text-orange-100 text-lg">Proyecciones de precios y demanda</p>
                    </div>
                  </div>
                </div>
                <MarketAgent />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenario">
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 p-4">
              <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-500 to-violet-600 p-8 text-white mb-8">
                  <div className="absolute top-4 right-4 opacity-20">
                    <Settings className="h-24 w-24" />
                  </div>
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <Settings className="h-12 w-12" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold mb-2">⚙️ Scenario Planner</h1>
                      <p className="text-purple-100 text-lg">Planificación estratégica integrada</p>
                    </div>
                  </div>
                </div>
                <ScenarioPlanner />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="report">
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-4">
              <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 to-rose-600 p-8 text-white mb-8">
                  <div className="absolute top-4 right-4 opacity-20">
                    <FileText className="h-24 w-24" />
                  </div>
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <FileText className="h-12 w-12" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold mb-2">📄 Report Generator</h1>
                      <p className="text-pink-100 text-lg">Reportes automáticos multimodales</p>
                    </div>
                  </div>
                </div>
                <ReportGenerator />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
