import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Maximize } from 'react-icons/fa';
import { cn } from '@/utils/cn';
import Card from '../common/Card';

interface VideoViewProps {
  videoId: string;
  title: string;
  description: string;
  duration: number;
  resourceLinks?: Array<{ title: string; url: string }>;
}

const VideoView: React.FC<VideoViewProps> = ({
  videoId,
  title,
  description,
  duration,
  resourceLinks = [],
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card>
        <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>

      {/* Video Info */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Duration: {duration} minutes</p>
        </div>

        <Card>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </Card>

        {resourceLinks.length > 0 && (
          <Card>
            <h3 className="font-semibold mb-3">Resources</h3>
            <div className="space-y-2">
              {resourceLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary-500 hover:text-primary-600 font-medium"
                >
                  → {link.title}
                </a>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoView;
