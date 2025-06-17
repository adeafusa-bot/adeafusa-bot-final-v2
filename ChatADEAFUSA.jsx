'use client';
import { useState, useId } from 'react';

const respuestas = {
  "futsal": "📘 Reglas de Futsal 2024-25: https://adeafusa.vercel.app/reglas/futsal",
  "fútbol playa": "🏖️ Reglas de Fútbol Playa 2024-25: https://adeafusa.vercel.app/reglas/playa",
  "fútbol": "⚽ Reglas de Fútbol 2025-26 (IFAB): https://adeafusa.vercel.app/reglas/futbol",
  "u12": "📄 Normas U12 Mixto 2025: https://adeafusa.vercel.app/normas/u12-mixto.pdf",
  "u14": "📄 Normas U14 Masculino 2025: https://adeafusa.vercel.app/normas/u14-masculino.pdf",
  "u16": "📄 Normas U16 Masculino 2025: https://adeafusa.vercel.app/normas/u16-masculino.pdf",
  "u18": "📄 Normas U18 Masculino 2025: https://adeafusa.vercel.app/normas/u18-masculino.pdf",
  "u20": "📄 Normas U20 Masculino 2025: https://adeafusa.vercel.app/normas/u20-masculino.pdf",
  "primera": "📄 Normas Primera A Masculino 2025: https://adeafusa.vercel.app/normas/primera-a.doc",
  "uniffut": "📘 Reglamento UNIFFUT 2024: https://adeafusa.vercel.app/reglamentos/uniffut.pdf",
  "lifutsal": "📘 Reglamento LIFUTSAL 2025: https://adeafusa.vercel.app/reglamentos/lifutsal.pdf",
  "liasce": "📘 Normas LIASCE 2025: https://adeafusa.vercel.app/reglamentos/liasce.pdf"
};

export default function ChatADEAFUSA() {
  const baseId = useId();
  const [input, setInput] = useState('');
  const [mensajes, setMensajes] = useState([
    { tipo: 'bot', texto: '👋 Hola, soy el bot oficial de ADEAFUSA. ¿En qué puedo ayudarte hoy?', id: baseId + '-0' }
  ]);
  const [msgIndex, setMsgIndex] = useState(1);

  const enviarMensaje = () => {
    if (!input.trim()) return;

    const userMsg = {
      tipo: 'usuario',
      texto: input,
      id: `${baseId}-${msgIndex}`
    };

    const clave = Object.keys(respuestas).find(k => input.toLowerCase().includes(k));
    const respuesta = clave ? respuestas[clave] : '🤖 No encontré esa consulta. Intenta con "futsal", "U20", "UNIFFUT"...';

    const botMsg = {
      tipo: 'bot',
      texto: respuesta,
      id: `${baseId}-${msgIndex + 1}`
    };

    setMensajes(prev => [...prev, userMsg, botMsg]);
    setMsgIndex(prev => prev + 2);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-center mb-2">
          <img src="/logo.png" alt="Logo ADEAFUSA" className="h-20" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-center">🤖 Bot ADEAFUSA</h2>
        <div className="h-96 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
          {mensajes.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded-xl text-sm ${msg.tipo === 'bot' ? 'bg-blue-100 text-left' : 'bg-green-100 text-right'}`}
            >
              {msg.texto}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-grow border rounded px-3 py-1"
            placeholder="Escribe tu consulta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
          />
          <button onClick={enviarMensaje} className="bg-blue-600 text-white px-4 py-1 rounded">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}