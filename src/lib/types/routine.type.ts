
export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum StepType {
  WARM_UP = 'WARM_UP',
  EXERCISE = 'EXERCISE',
  COOL_DOWN = 'COOL_DOWN',
}

export type Routine = {
  id: string;
  title: string;
  description?: string | null; 
  difficulty: Difficulty; 
  estimatedDuration?: number | null; 
  requiredEquipment?: string | null; 
  category?: string | null; 
  fitnessGoals: string[];
  tags: string[];
  createdAt: Date;
  createdBy: {
    id: string;
    name?: string | null; 
    avatarUrl?: string | null; 
  };
  steps: RoutineStep[];
};

export type RoutineStep = {
  id: string;
  stepNumber: number;
  type: StepType; 
  name: string;
  sets?: number | null; 
  reps?: number | null;
  duration?: number | null;
  rest?: number | null; 
  instructions?: string | null; 
  equipment?: string | null;
};

