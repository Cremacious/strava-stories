import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { CircleMember } from '@/lib/types/circle-detail.type';

const TopMembers = ({ circle }: { circle: { members: CircleMember[] } }) => {
  return (
    <div className="">
      <Card className="border-0 cardBackground mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-red-400" />
            Top Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {circle.members.slice(0, 4).map((member, index) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 darkBackground2 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{member.name}</p>
                    <p className="text-gray-400 text-sm">
                      Level {member.level}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-red-400 font-bold">
                    {member.xp.toLocaleString()} XP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TopMembers;
