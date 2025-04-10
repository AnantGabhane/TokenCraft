'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TokenDisplay } from '@/components/token-display';
import { Tokenizer, Token } from '@/lib/tokenizer';

export default function Home() {
  const [input, setInput] = useState('');
  const [messageType, setMessageType] = useState<'system' | 'user' | 'assistant'>('system');
  const [tokens, setTokens] = useState<Token[]>([]);

  // Update tokens whenever input or messageType changes
  useEffect(() => {
    if (input.trim()) {
      const newTokens = Tokenizer.tokenize(input, messageType);
      setTokens(newTokens);
    } else {
      setTokens([]);
    }
  }, [input, messageType]);

  return (
    <main className="container mx-auto p-4 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">TokenCraft</h1>
      </div>

      <div className="grid gap-4">
        <Card className="p-4">
          <div className="flex gap-2">
            <Select 
              value={messageType}
              onValueChange={(value: 'system' | 'user' | 'assistant') => setMessageType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Message type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to tokenize..."
              className="flex-1"
            />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 min-h-[200px] bg-white">
            <div className="mb-2 text-sm text-gray-500">Input Text</div>
            <pre className="whitespace-pre-wrap text-sm">
              {input}
            </pre>
          </Card>

          <Card className="p-4 min-h-[200px] bg-white">
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold">Token count</div>
              <div className="text-3xl font-semibold">
                {tokens.length}
              </div>
            </div>
            <div className="mt-4">
              <TokenDisplay tokens={tokens} />
            </div>
            <div className="mt-4 font-mono text-sm break-all text-gray-600">
              {tokens.map(t => t.id).join(', ')}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
