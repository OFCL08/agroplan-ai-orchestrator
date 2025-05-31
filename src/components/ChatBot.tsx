import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Simulated responses for agricultural queries
const SIMULATED_RESPONSES: { [key: string]: string } = {
  default: "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla o ser más específico sobre el tema agrícola que te interesa?",
  greeting: "¡Hola! Estoy aquí para ayudarte con cualquier consulta sobre agricultura y gestión de cultivos.",
  weather: "Según los datos actuales, las condiciones climáticas son favorables para el cultivo. La temperatura se mantiene en el rango óptimo y la humedad es adecuada.",
  crops: "Para optimizar tu cultivo, te recomiendo monitorear regularmente la humedad del suelo y mantener un registro de las condiciones climáticas.",
  soil: "El análisis de suelo es fundamental. Te sugiero realizar pruebas periódicas para mantener los niveles de nutrientes adecuados.",
  pests: "Para el control de plagas, es importante implementar un manejo integrado que combine métodos preventivos y de control biológico.",
};

const getSimulatedResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas')) {
    return SIMULATED_RESPONSES.greeting;
  }
  if (lowerMessage.includes('clima') || lowerMessage.includes('tiempo') || lowerMessage.includes('lluvia')) {
    return SIMULATED_RESPONSES.weather;
  }
  if (lowerMessage.includes('cultivo') || lowerMessage.includes('cosecha') || lowerMessage.includes('sembrar')) {
    return SIMULATED_RESPONSES.crops;
  }
  if (lowerMessage.includes('suelo') || lowerMessage.includes('tierra') || lowerMessage.includes('nutrientes')) {
    return SIMULATED_RESPONSES.soil;
  }
  if (lowerMessage.includes('plaga') || lowerMessage.includes('enfermedad') || lowerMessage.includes('insecto')) {
    return SIMULATED_RESPONSES.pests;
  }
  
  return SIMULATED_RESPONSES.default;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "¡Hola! Soy NatuSync, tu asistente virtual especializado en agricultura. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const botMessage: Message = {
        text: getSimulatedResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-[calc(100vw-2rem)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-white" />
              <h3 className="text-lg font-semibold text-white">NatuSync</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Container with Auto-scroll */}
          <div 
            className="h-96 overflow-y-auto p-4 space-y-4"
            style={{ scrollBehavior: 'smooth' }}
            ref={(el) => {
              if (el) {
                el.scrollTop = el.scrollHeight;
              }
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.isUser
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 resize-none rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={1}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                className={`bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 