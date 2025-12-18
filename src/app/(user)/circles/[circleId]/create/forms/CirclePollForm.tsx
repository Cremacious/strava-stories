'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CirclePollForm() {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [endsAt, setEndsAt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ question, options: [option1, option2], endsAt });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-6">Create Poll</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Question</label>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter poll question"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Option 1</label>
          <Input
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            placeholder="First option"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Option 2</label>
          <Input
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            placeholder="Second option"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Ends At</label>
          <Input
            type="datetime-local"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Button type="submit" className="bg-red-500 hover:bg-red-600">
          Create Poll
        </Button>
      </form>
    </div>
  );
}
