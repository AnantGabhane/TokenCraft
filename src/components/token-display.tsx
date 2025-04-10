import React from 'react';
import { Token } from '@/lib/tokenizer';

interface TokenDisplayProps {
  tokens: Token[];
}

const getTokenColor = (type: Token['type']) => {
  switch (type) {
    case 'system':
      return 'bg-yellow-100 border-yellow-200';
    case 'user':
      return 'bg-blue-100 border-blue-200';
    case 'assistant':
      return 'bg-green-100 border-green-200';
    case 'separator':
      return 'bg-gray-100 border-gray-200';
    default:
      return 'bg-white border-gray-100';
  }
};

export function TokenDisplay({ tokens }: TokenDisplayProps) {
  return (
    <div className="space-y-2 overflow-y-auto max-h-[300px]">
      <div className="flex flex-wrap gap-1">
        {tokens.map((token, index) => (
          <span
            key={`${token.text}-${index}`}
            className={`
              inline-block px-2 py-1 rounded 
              text-sm font-mono border
              transition-all duration-200 ease-in-out
              hover:scale-105 hover:shadow-sm
              cursor-default
              ${getTokenColor(token.type)}
            `}
            title={`ID: ${token.id}`}
          >
            {token.text}
          </span>
        ))}
      </div>
    </div>
  );
}
