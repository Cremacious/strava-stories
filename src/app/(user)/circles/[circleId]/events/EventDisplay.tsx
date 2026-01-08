'use client';

import { useState, useEffect } from 'react';
import EventCard from '../components/FeatureSelector/EventCard';
import { Event } from '@/lib/types/event.type';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const EventDisplay = ({
  events,
  circleId,
}: {
  events: Event[];
  circleId: string;
}) => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [events, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Circle Events</h1>

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search events by name, category, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} circleId={circleId} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No events found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;
