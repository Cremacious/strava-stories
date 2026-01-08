import { getEventById } from '@/actions/event.actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Tag, Clock } from 'lucide-react';
import Link from 'next/link';

const CircleEventsPage = async ({
  params,
}: {
  params: Promise<{ eventId: string; circleId: string }>;
}) => {
  const { eventId, circleId } = await params;
  const eventResult = await getEventById(eventId);
  const event = eventResult.success ? eventResult.event : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p>The event you are looking for does not exist or is unavailable.</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/circles/${circleId}/events`}
            className="text-red-400 hover:text-red-300"
          >
            ← Back to Events
          </Link>
        </div>

        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              {event.name}
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="bg-red-600 text-white">
                {event.status}
              </Badge>
              {event.category && (
                <Badge
                  variant="outline"
                  className="text-gray-300 border-gray-600"
                >
                  {event.category}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {event.image && (
              <div
                className="w-full h-64 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${event.image})` }}
              ></div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Description
              </h3>
              <p className="text-gray-400">{event.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Date & Time</p>
                  <p className="text-white font-medium">
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>

              {event.location && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-medium">{event.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Total RSVPs</p>
                  <p className="text-white font-medium">{event.totalRsvps}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Confirmed Attendees</p>
                  <p className="text-white font-medium">
                    {event.confirmedAttendees}
                  </p>
                </div>
              </div>
            </div>

            {event.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-gray-300 border-gray-600"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Metadata
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Created At</p>
                  <p className="text-white">{formatDate(event.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Updated At</p>
                  <p className="text-white">{formatDate(event.updatedAt)}</p>
                </div>
                {event.publishedAt && (
                  <div>
                    <p className="text-gray-400">Published At</p>
                    <p className="text-white">
                      {formatDate(event.publishedAt)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400">User ID</p>
                  <p className="text-white">{event.userId}</p>
                </div>
                <div>
                  <p className="text-gray-400">Circle ID</p>
                  <p className="text-white">{event.circleId}</p>
                </div>
                <div>
                  <p className="text-gray-400">Event ID</p>
                  <p className="text-white">{event.id}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CircleEventsPage;
