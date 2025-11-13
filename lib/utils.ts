export const avatarColors = [
  '#8B5CF6', // purple
  '#06B6D4', // cyan
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#EC4899', // pink
  '#6366F1', // indigo
  '#14B8A6', // teal
  '#F97316', // orange
  '#A855F7', // violet
  '#3B82F6', // blue
  '#22C55E', // green
];

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getRandomColor(index: number): string {
  return avatarColors[index % avatarColors.length];
}

export function getAvatarSeed(name: string): string {
  return name.toLowerCase().replace(/\s/g, '');
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}