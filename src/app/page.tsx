"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function generateTokens(sentence: string): number[] {
  // Custom tokenization algorithm
  const words = sentence.split(/\s+/); // Split by spaces
  const tokens = words.map((word, index) => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  });
  return tokens;
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [tokens, setTokens] = useState<number[]>([]);

  const handleTokenize = () => {
    const generatedTokens = generateTokens(inputText);
    setTokens(generatedTokens);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-3xl p-4">
        <CardHeader>
          <CardTitle>TokenCraft</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Textarea
              placeholder="Enter sentence to tokenize"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <Button onClick={handleTokenize} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Tokenize
          </Button>
          <div>
            <h3>Tokens:</h3>
            <div className="whitespace-pre-wrap">
              {tokens.length > 0 ? `[${tokens.join(", ")}]` : "No tokens generated yet."}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
