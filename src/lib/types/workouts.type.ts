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
  id: string;
  date: string;
  duration: number;
  distance: number;
  calories: number;
  type: string;
  isStrava?: boolean;
};

export type GoalData = {
  title: string;
  description?: string;
  period: string;
  type: string;
  targetValue: number;
  specificType?: string;
};
