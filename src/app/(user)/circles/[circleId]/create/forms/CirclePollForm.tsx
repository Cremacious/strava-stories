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

export default function CirclePollForm({ circleId }: { circleId: string }) {
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
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-gray-900 border-gray-700">
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
                className="bg-gray-800 border-gray-700 text-white mt-1"
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
                      className="bg-gray-800 border-gray-700 text-white flex-1"
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(index)}
                        className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOption}
                  className="text-gray-300 border-gray-600 hover:bg-gray-700"
                >
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
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
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
                className="bg-gray-800 border-gray-700 text-white mt-1"
              />
              {errors.closedAt && (
                <p className="text-red-500 text-sm mt-1">{errors.closedAt}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              {isLoading ? 'Submitting...' : 'Create Poll'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
