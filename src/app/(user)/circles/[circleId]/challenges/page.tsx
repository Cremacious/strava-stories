import { getCircleChallenges } from '@/actions/challenge.actions';
import ChallengesDisplay from './ChallengesDisplay';

const CircleChallengesPage = async ({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) => {
  const { circleId } = await params;
  const challengesResult = await getCircleChallenges(circleId);
  const challenges = challengesResult.success
    ? challengesResult.challenges
    : [];

  return (
    <div>
      <ChallengesDisplay challenges={challenges} circleId={circleId} />
    </div>
  );
};

export default CircleChallengesPage;
