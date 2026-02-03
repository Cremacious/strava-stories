'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { createPollSchema } from '@/lib/validators/poll.validators';
import { useCircleStore } from '@/stores/useCircleStore';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/shared/BackButton';

export default function CirclePollForm({ circleId }: { circleId: string }) {
  const router = useRouter();
  const { createCirclePoll, isLoading } = useCircleStore();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [resultsVisibility, setResultsVisibility] = useState('LIVE');
  const [closedAt, setClosedAt] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      question,
      options: options.filter((opt) => opt.trim() !== ''),
      resultsVisibility,
      closedAt: closedAt ? new Date(closedAt) : null,
    };

    const result = createPollSchema.safeParse(data);
    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        errorMap[err.path.join('.')] = err.message;
      });
      setErrors(errorMap);
      return;
    }
    const pollResult = await createCirclePoll(data, circleId);
    if (pollResult.success) {
      setQuestion('');
      setOptions(['', '']);
      setResultsVisibility('LIVE');
      setClosedAt('');
      setErrors({});
      router.push(`/circles/${circleId}`);

    }
  };

  return (
    <>
      <BackButton href={`/circles/${circleId}`} text="Back to Circle" />
      <div className="max-w-2xl mx-auto ">
        <Card className="bg-[#3f3f3f] border-0 mt-4 px-2 md:px-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Plus className="w-6 h-6 text-red-500" />
              Create Poll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="question" className="text-gray-300">
                  Question
                </Label>
                <Input
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter poll question"
                  className="bg-[#2e2e2e] border-0 text-white placeholder-gray-400 mt-1"
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-300">Options</Label>
                <div className="space-y-2 mt-1">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="bg-[#2e2e2e] border-0 text-white placeholder-gray-400"
                      />
                      {options.length > 2 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeOption(index)}
                          className=""
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" size={'sm'} onClick={addOption}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                </div>
                {errors.options && (
                  <p className="text-red-500 text-sm mt-1">{errors.options}</p>
                )}
              </div>

              <div>
                <Label htmlFor="resultsVisibility" className="text-gray-300">
                  Results Visibility
                </Label>
                <Select
                  value={resultsVisibility}
                  onValueChange={setResultsVisibility}
                >
                  <SelectTrigger className="bg-[#2e2e2e] border-0 text-white placeholder-gray-400 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2e2e2e] border-0 text-white">
                    <SelectItem value="LIVE">Live</SelectItem>
                    <SelectItem value="HIDDEN">Hidden</SelectItem>
                    <SelectItem value="AFTER_VOTE">After Vote</SelectItem>
                  </SelectContent>
                </Select>
                {errors.resultsVisibility && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.resultsVisibility}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="closedAt" className="text-gray-300">
                  End Date (Optional)
                </Label>
                <Input
                  id="closedAt"
                  type="datetime-local"
                  value={closedAt}
                  onChange={(e) => setClosedAt(e.target.value)}
                  className="bg-[#2e2e2e] border-0 text-white placeholder-gray-400 mt-1"
                />
                {errors.closedAt && (
                  <p className="text-red-500 text-sm mt-1">{errors.closedAt}</p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className=""
                  disabled={isLoading}
                  onClick={() => router.push(`/circles/${circleId}`)}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isLoading} className="">
                  {isLoading ? 'Submitting...' : 'Create Poll'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>{' '}
    </>
  );
}
