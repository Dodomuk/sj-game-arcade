export interface Celebrity {
  id: string;
  name: string;
  image: string;
}

export interface GuessCelebrityGame {
  celebrities: Celebrity[];
}

export interface MemoryCard {
  id: string;
  celebrity: Celebrity;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameScore {
  score: number;
  timeElapsed: number;
  level: number;
}
