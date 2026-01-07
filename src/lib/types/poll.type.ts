export type Poll = {
  id: string;
  question: string;
  createdBy: string;
  options: Array<{
    text: string;
    votes: number;
  }>;
  totalVotes: number;
  endsAt: string;
};