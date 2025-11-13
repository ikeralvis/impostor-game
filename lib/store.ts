import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Player, Round, GameState } from './types';
import { generateId, getRandomColor, getAvatarSeed, shuffleArray } from './utils';
import { categories } from './wordBank';

interface GameStore extends GameState {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  startNewRound: (categoryIds: string[]) => void;
  endRound: (votedImpostorId: string | null) => void;
  resetGame: () => void;
  nextPlayer: () => void;
  resetRound: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      players: [],
      currentRound: null,
      gameActive: false,
      totalRounds: 0,
      currentPlayerIndex: 0,

      addPlayer: (name: string) => {
        const players = get().players;
        const newPlayer: Player = {
          id: generateId(),
          name,
          avatar: getAvatarSeed(name),
          score: 0,
          color: getRandomColor(players.length),
        };
        set({ players: [...players, newPlayer] });
      },

      removePlayer: (id: string) => {
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
        }));
      },

      startNewRound: (categoryIds: string[]) => {
        const players = get().players;
        
        if (categoryIds.length === 0 || players.length < 3) return;

        // Obtener categorías seleccionadas
        const selectedCategories = categories.filter((c) => categoryIds.includes(c.id));
        
        if (selectedCategories.length === 0) return;

        // Combinar todas las palabras de las categorías seleccionadas
        const allWords = selectedCategories.flatMap(cat => cat.words);
        const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        
        // Seleccionar nombre de categoría
        const categoryName = selectedCategories.length === 1 
          ? selectedCategories[0].name 
          : `🎲 Mixto (${selectedCategories.length} categorías)`;
        
        const randomImpostor = players[Math.floor(Math.random() * players.length)];

        set({
          currentRound: {
            category: categoryName,
            word: randomWord.main,
            impostorWord: randomWord.impostor,
            impostorId: randomImpostor.id,
            roundNumber: get().totalRounds + 1,
          },
          gameActive: true,
          currentPlayerIndex: 0,
        });
      },

      endRound: (votedImpostorId: string | null) => {
        const { currentRound, players } = get();
        if (!currentRound) return;

        const correctGuess = votedImpostorId === currentRound.impostorId;
        
        const updatedPlayers = players.map((player) => {
          if (correctGuess) {
            // Si adivinaron al impostor, todos menos el impostor ganan 1 punto
            return player.id === currentRound.impostorId
              ? player
              : { ...player, score: player.score + 1 };
          } else {
            // Si no adivinaron, el impostor gana 2 puntos
            return player.id === currentRound.impostorId
              ? { ...player, score: player.score + 2 }
              : player;
          }
        });

        set({
          players: updatedPlayers,
          totalRounds: get().totalRounds + 1,
        });
      },

      resetRound: () => {
        set({
          currentRound: null,
          currentPlayerIndex: 0,
        });
      },

      resetGame: () => {
        set({
          players: [],
          currentRound: null,
          gameActive: false,
          totalRounds: 0,
          currentPlayerIndex: 0,
        });
      },

      nextPlayer: () => {
        set((state) => ({
          currentPlayerIndex: state.currentPlayerIndex + 1,
        }));
      },
    }),
    {
      name: 'impostor-game-storage',
    }
  )
);