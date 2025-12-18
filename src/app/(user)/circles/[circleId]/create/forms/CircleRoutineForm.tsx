'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CircleRoutineForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, description, difficulty });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-6">
        Create Workout Routine
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Routine Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter routine name"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the routine"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Difficulty</label>
          <Input
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            placeholder="e.g., Beginner, Intermediate"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Button type="submit" className="bg-red-500 hover:bg-red-600">
          Submit Routine
        </Button>
      </form>
    </div>
  );
}
