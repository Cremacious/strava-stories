'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CircleWorkoutForm() {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ type, duration, distance, description });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-6">Log Workout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Workout Type</label>
          <Input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g., Run, Bike"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Duration (minutes)</label>
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Distance (km)</label>
          <Input
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your workout"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Button type="submit" className="bg-red-500 hover:bg-red-600">
          Log Workout
        </Button>
      </form>
    </div>
  );
}
