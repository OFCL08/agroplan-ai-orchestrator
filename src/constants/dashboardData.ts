import { AlertTriangle, CheckCircle, Activity, Droplets, Leaf, Sun, Cloud } from "lucide-react";

export const getLocationData = (coordinates: { latitude: number; longitude: number } | null) => ({
  region: coordinates ? `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}` : "Loading...",
  elevation: "1,435 msnm",
  soilType: "Andisol volcánico",
  microclimate: "Subtropical húmedo"
});

export const alerts = [
  {
    type: "warning",
    message: "Posible sequía en región Norte - Abril 2025",
    priority: "alta",
    icon: AlertTriangle,
    color: "from-orange-400 to-red-500"
  },
  {
    type: "success",
    message: "Condiciones óptimas para siembra de café detectadas",
    priority: "media",
    icon: CheckCircle,
    color: "from-green-400 to-emerald-500"
  },
  {
    type: "info",
    message: "Nuevos datos de mercado internacional disponibles",
    priority: "baja",
    icon: Activity,
    color: "from-blue-400 to-cyan-500"
  }
];

export const todayRecommendations = [
  {
    category: "Riego",
    priority: "alta",
    icon: Droplets,
    title: "🌧️ Pausa el riego por 2 días",
    description: "Se esperan lluvias perfectas de 15-20mm",
    action: "Revisa los drenajes",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    category: "Nutrición",
    priority: "media",
    icon: Leaf,
    title: "🌱 Momento ideal para fertilizar",
    description: "Las plantas absorberán mejor los nutrientes",
    action: "Aplica antes de las 10:00 AM",
    gradient: "from-green-500 to-emerald-400"
  },
  {
    category: "Cosecha",
    priority: "alta",
    icon: CheckCircle,
    title: "☕ Tu café está listo",
    description: "Humedad perfecta del 22% alcanzada",
    action: "Cosecha lotes 3 y 4 hoy",
    gradient: "from-orange-500 to-amber-400"
  }
];

export const weeklyCards = [
  { day: "HOY", temp: "22°", icon: Sun, rain: "15mm", color: "from-yellow-400 to-orange-500", textColor: "text-white" },
  { day: "MAÑ", temp: "21°", icon: Cloud, rain: "8mm", color: "from-gray-400 to-gray-600", textColor: "text-white" },
  { day: "MIÉ", temp: "24°", icon: Sun, rain: "2mm", color: "from-blue-400 to-blue-600", textColor: "text-white" },
  { day: "JUE", temp: "25°", icon: Sun, rain: "0mm", color: "from-green-400 to-green-600", textColor: "text-white" },
  { day: "VIE", temp: "23°", icon: Droplets, rain: "5mm", color: "from-purple-400 to-purple-600", textColor: "text-white" }
]; 