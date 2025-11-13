export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  color: string;
}

export interface WordPair {
  main: string;
  impostor: string;
}

export interface Category {
  id: string;
  name: string;
  words: WordPair[];
}

export interface Round {
  category: string;
  word: string;
  impostorWord: string;
  impostorId: string;
  roundNumber: number;
}

export interface GameState {
  players: Player[];
  currentRound: Round | null;
  gameActive: boolean;
  totalRounds: number;
  currentPlayerIndex: number;
}