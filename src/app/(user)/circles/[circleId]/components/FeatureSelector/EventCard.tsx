import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/lib/types/event.type';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';

const EventCard = ({ event }: { event: Event }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <Card className="bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {event.image && (
        <div
          className="relative h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-red-600 text-white">
              {event.status}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-xl font-bold mb-2">
              {event.name}
            </CardTitle>
            {event.category && (
              <Badge
                variant="outline"
                className="text-gray-300 border-gray-600 mb-2"
              >
                {event.category}
              </Badge>
            )}
          </div>
          {!event.image && (
            <Badge variant="secondary" className="bg-red-600 text-white">
              {event.status}
            </Badge>
          )}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          {event.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-red-400" />
            <div>
              <p className="text-gray-400 text-xs">Date & Time</p>
              <p className="text-white font-medium text-sm">
                {formatDate(event.date)}
              </p>
            </div>
          </div>
          {event.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-gray-400 text-xs">Location</p>
                <p className="text-white font-medium text-sm">
                  {event.location}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-red-400" />
            <div>
              <p className="text-gray-400 text-xs">RSVP / Confirmed</p>
              <p className="text-white font-medium text-sm">
                {event.totalRsvps} / {event.confirmedAttendees}
              </p>
            </div>
          </div>
          {event.tags.length > 0 && (
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-gray-400 text-xs">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {event.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs text-gray-300 border-gray-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200">
          RSVP
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
