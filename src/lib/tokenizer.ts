export interface Token {
  id: number;
  text: string;
  type: 'system' | 'user' | 'assistant' | 'separator';
}

const SPECIAL_TOKENS = {
  START: '<|im_start|>',
  END: '<|im_end|>',
  SEP: '<|im_sep|>',
};

export class Tokenizer {
  private static specialTokenMap = new Map<string, number>([
    [SPECIAL_TOKENS.START, 200264],
    [SPECIAL_TOKENS.END, 200265],
    [SPECIAL_TOKENS.SEP, 200266],
  ]);

  static tokenize(text: string, type: 'system' | 'user' | 'assistant'): Token[] {
    const tokens: Token[] = [];
    
    // Add start token
    tokens.push({
      id: this.specialTokenMap.get(SPECIAL_TOKENS.START)!,
      text: SPECIAL_TOKENS.START,
      type: 'separator'
    });

    // Add type token
    tokens.push({
      id: this.getTypeId(type),
      text: type,
      type: type
    });

    // Add separator
    tokens.push({
      id: this.specialTokenMap.get(SPECIAL_TOKENS.SEP)!,
      text: SPECIAL_TOKENS.SEP,
      type: 'separator'
    });

    // Tokenize the main text
    const words = text.split(/(\s+)/).filter(word => word.length > 0);
    words.forEach(word => {
      tokens.push({
        id: this.generateTokenId(word),
        text: word,
        type: type
      });
    });

    // Add end token
    tokens.push({
      id: this.specialTokenMap.get(SPECIAL_TOKENS.END)!,
      text: SPECIAL_TOKENS.END,
      type: 'separator'
    });

    return tokens;
  }

  private static getTypeId(type: string): number {
    switch (type) {
      case 'system': return 17360;
      case 'user': return 173781;
      case 'assistant': return 173789;
      default: return 17360;
    }
  }

  private static generateTokenId(word: string): number {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash) + word.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash % 50000) + 1000; // Keep IDs in a reasonable range
  }
}