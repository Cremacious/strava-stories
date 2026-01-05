export type WorkoutData = {
  title: string;
  description?: string;
  type: string;
  duration?: number;
  distance?: number;
  calories?: number;
  date: Date;
};

export type WorkoutDisplayData = {
  date: string;
  duration: number;
  distance: number;
  calories: number;
  type: string;
};
