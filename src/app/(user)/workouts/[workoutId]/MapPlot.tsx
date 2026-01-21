'use client';

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import polyline from '@mapbox/polyline';
import 'leaflet/dist/leaflet.css';
import type {
  WorkoutModel,
  StravaWorkoutModel,
} from '@/generated/prisma/models';


import L from 'leaflet';
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPlotProps {
  workout: WorkoutModel | StravaWorkoutModel;
  isStrava: boolean;
}

const MapPlot = ({ workout, isStrava }: MapPlotProps) => {
  const [routeCoordinates, setRouteCoordinates] = useState<LatLngTuple[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([51.505, -0.09]); 
  const [mapZoom, setMapZoom] = useState(13);

  useEffect(() => {
    if (isStrava) {
      const stravaWorkout = workout as StravaWorkoutModel;

  
      if (stravaWorkout.summaryPolyline) {
        try {
          const decoded = polyline.decode(stravaWorkout.summaryPolyline);
          const coordinates: LatLngTuple[] = decoded.map((coord) => [
            coord[0],
            coord[1],
          ]);
          setRouteCoordinates(coordinates);

      
          if (coordinates.length > 0) {
            const lats = coordinates.map((coord) => coord[0]);
            const lngs = coordinates.map((coord) => coord[1]);
            const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
            const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
            setMapCenter([centerLat, centerLng]);

  
            const latRange = Math.max(...lats) - Math.min(...lats);
            const lngRange = Math.max(...lngs) - Math.min(...lngs);
            const maxRange = Math.max(latRange, lngRange);
            const zoom =
              maxRange > 0 ? Math.floor(8 - Math.log2(maxRange)) : 13;
            setMapZoom(Math.max(8, Math.min(16, zoom)));
          }
        } catch (error) {
          console.error('Error decoding polyline:', error);
        }
      } else if (stravaWorkout.startLat && stravaWorkout.startLng) {
  
        setMapCenter([stravaWorkout.startLat, stravaWorkout.startLng]);
      }
    }
  }, [workout, isStrava]);

  if (!isStrava || routeCoordinates.length === 0) {
    return (
      <div className="bg-[#202020] border border-red-700/30 rounded-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {isStrava ? 'No Route Data Available' : 'Map Not Available'}
          </h3>
          <p className="text-gray-400">
            {isStrava
              ? "This workout doesn't have GPS route data."
              : 'Maps are only available for Strava workouts.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#202020] border border-red-700/30 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Workout Route
        </h3>
      </div>
      <div className="h-96 w-full">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          className="rounded-b-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {routeCoordinates.length > 0 && (
            <Polyline
              positions={routeCoordinates}
              color="#dc2626"
              weight={4}
              opacity={0.8}
            />
          )}

          {routeCoordinates.length > 0 && (
            <Marker position={routeCoordinates[0]}>
              <Popup>
                <div className="text-center">
                  <div className="font-semibold text-green-600">Start</div>
                  <div className="text-sm text-gray-600">
                    {routeCoordinates[0][0].toFixed(6)},{' '}
                    {routeCoordinates[0][1].toFixed(6)}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
      
          {routeCoordinates.length > 1 && (
            <Marker position={routeCoordinates[routeCoordinates.length - 1]}>
              <Popup>
                <div className="text-center">
                  <div className="font-semibold text-red-600">Finish</div>
                  <div className="text-sm text-gray-600">
                    {routeCoordinates[routeCoordinates.length - 1][0].toFixed(
                      6,
                    )}
                    ,{' '}
                    {routeCoordinates[routeCoordinates.length - 1][1].toFixed(
                      6,
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPlot;
