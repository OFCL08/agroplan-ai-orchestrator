
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Key } from "lucide-react";

interface WeatherApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

const WeatherApiKeySetup = ({ onApiKeySet }: WeatherApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openweather_api_key') || '');

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openweather_api_key', apiKey.trim());
      onApiKeySet(apiKey.trim());
    }
  };

  const handleUseDemo = () => {
    onApiKeySet('demo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-500 p-3 rounded-full w-fit mb-4">
            <Key className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Configurar API de Clima</CardTitle>
          <CardDescription>
            Para obtener datos meteorológicos reales, necesitas una API key de OpenWeatherMap
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="apikey">API Key de OpenWeatherMap</Label>
            <Input
              id="apikey"
              type="password"
              placeholder="Ingresa tu API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleSaveApiKey} 
              disabled={!apiKey.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Guardar API Key
            </Button>
            
            <Button 
              onClick={handleUseDemo} 
              variant="outline"
              className="w-full"
            >
              Usar datos de demostración
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <p className="text-sm text-blue-800 font-medium">¿No tienes una API key?</p>
            <p className="text-sm text-blue-700">
              Obtén una gratis en OpenWeatherMap. Solo toma unos minutos.
            </p>
            <Button
              variant="link"
              className="text-blue-600 h-auto p-0"
              onClick={() => window.open('https://openweathermap.org/api', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Obtener API Key gratis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherApiKeySetup;
