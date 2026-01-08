import { EventStatus } from '@/generated/prisma/enums';

export interface Event {
  id: string;
  userId: string;
  circleId: string;
  name: string;
  description: string;
  date: Date;
  location?: string | null;
  category?: string | null;
  image?: string | null;
  tags: string[];
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  totalRsvps: number;
  confirmedAttendees: number;
}

export interface CreateEventData {
  name: string;
  description: string;
  date: Date;
  location?: string | null;
  category?: string | null;
  image?: string | null;
  tags: string[];
  status: EventStatus;
}
