export enum ChallengeStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
export interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: string;
  rules: string;
  category?: string | null;
  tags: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  startDate?: Date | null; 
  endDate: Date;
  circleId: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: ChallengeStatus;
  averageProgress: number;
}

export interface CreateChallengeData {
  title: string;
  description: string;
  goal: string;
  rules: string;
  category?: string | null;
  tags: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  startDate?: Date | null; 
}
