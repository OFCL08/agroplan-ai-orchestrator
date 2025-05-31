
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Share, Eye, Zap, BarChart3, MapPin, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ReportGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("executive");
  const [reportFormat, setReportFormat] = useState("pdf");

  const reportTemplates = {
    executive: {
      name: "Reporte Ejecutivo",
      description: "Resumen para tomadores de decisiones",
      duration: "2-3 minutos",
      pages: "8-12 páginas",
      audience: "Directivos"
    },
    technical: {
      name: "Reporte Técnico",
      description: "Análisis detallado con metodología",
      duration: "5-7 minutos",
      pages: "25-35 páginas",
      audience: "Especialistas"
    },
    policy: {
      name: "Reporte de Políticas",
      description: "Recomendaciones para políticas públicas",
      duration: "3-4 minutos",
      pages: "15-20 páginas",
      audience: "Gobierno"
    },
    cooperative: {
      name: "Reporte Cooperativa",
      description: "Análisis operacional para cooperativas",
      duration: "4-5 minutos",
      pages: "18-22 páginas",
      audience: "Cooperativas"
    }
  };

  const reportMetrics = [
    { label: "Reportes Generados", value: "1,247", change: "+23%", icon: FileText },
    { label: "Tiempo Promedio", value: "3.2 min", change: "-15%", icon: Zap },
    { label: "Precisión IA", value: "94.7%", change: "+2.1%", icon: BarChart3 },
    { label: "Satisfacción", value: "4.8/5", change: "+0.3", icon: Eye }
  ];

  const recentReports = [
    {
      title: "Análisis Temporada Café 2024-2025",
      type: "Ejecutivo",
      date: "2024-12-15",
      status: "Completado",
      downloads: 127,
      format: "PDF"
    },
    {
      title: "Proyecciones Climáticas Q1 2025",
      type: "Técnico",
      date: "2024-12-14",
      status: "Completado",
      downloads: 89,
      format: "PowerPoint"
    },
    {
      title: "Recomendaciones Política Agrícola",
      type: "Políticas",
      date: "2024-12-13",
      status: "En revisión",
      downloads: 45,
      format: "Word"
    },
    {
      title: "Plan Estratégico COOCAFE",
      type: "Cooperativa",
      date: "2024-12-12",
      status: "Completado",
      downloads: 67,
      format: "PDF"
    }
  ];

  const contentSections = [
    { name: "Resumen Ejecutivo", included: true, aiGenerated: 95 },
    { name: "Análisis Climático", included: true, aiGenerated: 87 },
    { name: "Proyecciones de Cultivos", included: true, aiGenerated: 91 },
    { name: "Análisis de Mercado", included: true, aiGenerated: 89 },
    { name: "Recomendaciones", included: true, aiGenerated: 93 },
    { name: "Gráficos y Visualizaciones", included: true, aiGenerated: 88 },
    { name: "Anexos Técnicos", included: false, aiGenerated: 85 },
    { name: "Metodología", included: false, aiGenerated: 92 }
  ];

  const visualizationData = [
    { category: 'Gráficos de Barras', count: 12, percentage: 35 },
    { category: 'Gráficos de Línea', count: 8, percentage: 24 },
    { category: 'Mapas', count: 6, percentage: 18 },
    { category: 'Tablas', count: 5, percentage: 15 },
    { category: 'Otros', count: 3, percentage: 8 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Report Generator Agent</CardTitle>
              <CardDescription className="text-indigo-100">
                Generación automática de reportes multimodales con IA avanzada
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Métricas de reportes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reportMetrics.map((metric, idx) => {
          const IconComponent = metric.icon;
          return (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-indigo-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-xl font-bold">{metric.value}</p>
                    <p className="text-xs text-green-600">{metric.change}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Generador de reportes */}
      <Tabs defaultValue="generator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator">Generador</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuración */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Reporte</CardTitle>
                <CardDescription>
                  Personaliza el contenido y formato de tu reporte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de Reporte</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(reportTemplates).map(([key, template]) => (
                        <SelectItem key={key} value={key}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">{reportTemplates[selectedTemplate].name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{reportTemplates[selectedTemplate].description}</p>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                      <div>
                        <span className="text-gray-500">Duración:</span>
                        <span className="ml-1 font-medium">{reportTemplates[selectedTemplate].duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Páginas:</span>
                        <span className="ml-1 font-medium">{reportTemplates[selectedTemplate].pages}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Formato de Salida</label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="word">Microsoft Word</SelectItem>
                      <SelectItem value="powerpoint">PowerPoint</SelectItem>
                      <SelectItem value="html">HTML Interactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Secciones del Reporte</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {contentSections.map((section, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={section.included}
                            className="rounded"
                            readOnly
                          />
                          <span className="text-sm">{section.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          IA {section.aiGenerated}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button size="lg" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Generar Reporte con IA
                </Button>
              </CardContent>
            </Card>

            {/* Vista previa */}
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
                <CardDescription>
                  Previsualización del reporte generado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-700 mb-2">
                    {reportTemplates[selectedTemplate].name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    La vista previa aparecerá aquí una vez generado el reporte
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="block text-gray-500">Formato:</span>
                      <span className="font-medium uppercase">{reportFormat}</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="block text-gray-500">Secciones:</span>
                      <span className="font-medium">{contentSections.filter(s => s.included).length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Opciones adicionales */}
          <Card>
            <CardHeader>
              <CardTitle>Opciones Avanzadas</CardTitle>
              <CardDescription>
                Configuración adicional para la generación de reportes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Idioma y Localización</h4>
                  <select className="w-full p-2 border rounded">
                    <option>Español (Costa Rica)</option>
                    <option>English (US)</option>
                    <option>Português (BR)</option>
                  </select>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Nivel de Detalle</h4>
                  <select className="w-full p-2 border rounded">
                    <option>Alto Nivel</option>
                    <option>Detallado</option>
                    <option>Exhaustivo</option>
                  </select>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Audiencia Objetivo</h4>
                  <select className="w-full p-2 border rounded">
                    <option>Ejecutivos</option>
                    <option>Técnicos</option>
                    <option>Políticos</option>
                    <option>Agricultores</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(reportTemplates).map(([key, template]) => (
              <Card key={key} className={selectedTemplate === key ? 'ring-2 ring-indigo-500' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.audience}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Duración:</span>
                      <span className="ml-1 font-medium">{template.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Páginas:</span>
                      <span className="ml-1 font-medium">{template.pages}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Características:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Generación automática con IA</li>
                      <li>• Gráficos y visualizaciones</li>
                      <li>• Análisis predictivo integrado</li>
                      <li>• Recomendaciones personalizadas</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={selectedTemplate === key ? "default" : "outline"} 
                      className="flex-1"
                      onClick={() => setSelectedTemplate(key)}
                    >
                      {selectedTemplate === key ? "Seleccionado" : "Seleccionar"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Crear Plantilla Personalizada</CardTitle>
              <CardDescription>
                Diseña tu propia plantilla con configuraciones específicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Nuevo Template IA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reportes Recientes</CardTitle>
              <CardDescription>
                Historial de reportes generados y su estado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium">{report.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {report.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {report.downloads} descargas
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={report.status === 'Completado' ? 'default' : 'secondary'}
                      >
                        {report.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Visualizaciones</CardTitle>
                <CardDescription>Tipos de gráficos más utilizados</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={visualizationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {visualizationData.map((entry, index) => (
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
                <CardTitle>Uso por Tipo de Reporte</CardTitle>
                <CardDescription>Frecuencia de generación por plantilla</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'Ejecutivo', value: 45 },
                    { name: 'Técnico', value: 32 },
                    { name: 'Políticas', value: 15 },
                    { name: 'Cooperativa', value: 8 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Métricas de Calidad IA</CardTitle>
              <CardDescription>
                Indicadores de rendimiento del sistema de generación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">94.7%</div>
                  <div className="text-sm text-green-700">Precisión Textual</div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">91.2%</div>
                  <div className="text-sm text-blue-700">Coherencia Datos</div>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">96.1%</div>
                  <div className="text-sm text-purple-700">Calidad Visual</div>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">4.8/5</div>
                  <div className="text-sm text-orange-700">Satisfacción</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportGenerator;
