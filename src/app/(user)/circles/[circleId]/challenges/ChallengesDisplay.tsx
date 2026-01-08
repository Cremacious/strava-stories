'use client';
import ChallengeCard from '../components/FeatureSelector/ChallengeCard';
import { Challenge } from '@/lib/types/challenge.type';

type ChallengesDisplayProps = {
  challenges: Challenge[] | undefined;
};

const ChallengesDisplay = ({ challenges = [] }: ChallengesDisplayProps) => {
  return (
    <div>
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default ChallengesDisplay;
