export interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: string;
  rules: string;
  category?: string;
  tags: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  startDate?: Date;
  endDate: Date;
  circleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateChallengeData {
  title: string;
  description: string;
  goal: string;
  rules: string;
  category?: string;
  tags: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  startDate?: Date;
  endDate: Date;
}