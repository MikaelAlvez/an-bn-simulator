"use client";

import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');

const handleAnalyze = async () => {
  try {
    const response = await fetch('http://localhost:3000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error('Erro ao analisar:', error);
    alert('Erro ao se comunicar com o servidor');
  }
};


  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Reconhecedor a^n b^n
          </h1>
          <p className="text-gray-600">
            Analisador que verifica se uma string pertence à linguagem a^n b^n (n ≥ 0)
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Digite a string para análise:
          </label>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder=""
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-500"
            />
            
            <button
              onClick={handleAnalyze}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4" />
              Analisar
            </button>
            
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Limpar
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sobre a Linguagem a^n b^n
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              A linguagem a^n b^n consiste em todas as strings que têm exatamente n caracteres 'a' 
              seguidos por exatamente n caracteres 'b', onde n ≥ 0.
            </p>
            
            <div>
              <p className="font-medium text-green-700 mb-2">Exemplos válidos:</p>
              <div className="bg-green-50 p-3 rounded font-mono text-sm">
                ε, ab, aabb, aaabbb, aaaabbbb...
              </div>
            </div>
            
            <div>
              <p className="font-medium text-red-700 mb-2">Exemplos inválidos:</p>
              <div className="bg-red-50 p-3 rounded font-mono text-sm">
                a, b, abb, aab, abab, ba...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}