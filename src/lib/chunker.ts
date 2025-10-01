
interface ChunkingConfig {
  minLength?: number;
  maxLength?: number;
  splitter?: 'sentence'; // For now, only sentence splitting is supported
  overlap?: number;
}

// Simple sentence tokenizer
function getSentences(text: string): string[] {
  // Use a regex to split by sentence-ending punctuation.
  // This is a simplified approach and may not handle all edge cases perfectly.
  return text.match(/[^.!?]+[.!?]\s*/g) || [text];
}

export function chunk(text: string, config: ChunkingConfig): string[] {
  const {
    minLength = 1000,
    maxLength = 2000,
    overlap = 100,
  } = config;

  if (text.length <= maxLength) {
    return [text];
  }

  const sentences = getSentences(text);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > maxLength) {
      chunks.push(currentChunk);
      
      // Handle overlap by taking the last few sentences of the previous chunk
      const overlapSentences: string[] = [];
      let overlapLength = 0;
      const reversedPrevSentences = getSentences(currentChunk).reverse();
      for(const s of reversedPrevSentences) {
        if(overlapLength < overlap) {
            overlapSentences.unshift(s);
            overlapLength += s.length;
        } else {
            break;
        }
      }

      currentChunk = overlapSentences.join(" ");

    } else {
        currentChunk += sentence;
    }
  }

  // Add the last chunk if it's not empty
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}
