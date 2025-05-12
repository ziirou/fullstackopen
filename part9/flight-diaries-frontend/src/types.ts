export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
export const weatherOptions: Weather[] = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];

export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor'];

export interface Diary {
  id: number,
  date: string,
  weather: Weather,
  visibility: Visibility,
  comment?: string,
};

export type NewDiary = Omit<Diary, 'id'>;
