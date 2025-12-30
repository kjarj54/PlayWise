export interface Game {
  id: string;
  image: string;
  title: string;
  genre: string;
  rating?: number;
  description?: string;
}

export interface HeroGame extends Game {
  description: string;
  rating: number;
}
