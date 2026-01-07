// Define enums locally (matches your Prisma schema)
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
  description?: string | null; // Allow null from DB
  difficulty: Difficulty; // Uses local enum
  estimatedDuration?: number | null; // Allow null
  requiredEquipment?: string | null; // Allow null
  category?: string | null; // Allow null
  fitnessGoals: string[];
  tags: string[];
  createdAt: Date;
  createdBy: {
    id: string;
    name?: string | null; // Allow null
    avatarUrl?: string | null; // Allow null
  };
  steps: RoutineStep[];
};

export type RoutineStep = {
  id: string;
  stepNumber: number;
  type: StepType; // Uses local enum
  name: string;
  sets?: number | null; // Allow null
  reps?: number | null; // Allow null
  duration?: number | null; // Allow null
  rest?: number | null; // Allow null
  instructions?: string | null; // Allow null
  equipment?: string | null; // Allow null
};