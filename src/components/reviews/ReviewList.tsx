import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Rating from '../ui/Rating';
import { UserCircle, Calendar, MapPin, MessageSquare } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  avatar?: string;
}

interface ReviewListProps {
  reviews: Review[];
  onReplyClick?: (reviewId: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onReplyClick }) => {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review!</p>
        </Card>
      ) : (
        reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card
              hoverable
              onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Calendar size={12} /> {review.date}
                    </p>
                  </div>
                </div>
                <Rating rating={review.rating} readOnly size="sm" />
              </div>

              {/* Review Title */}
              <h4 className="font-semibold mb-2 text-lg">{review.title}</h4>

              {/* Review Content */}
              <p
                className={`text-gray-700 dark:text-gray-300 mb-3 ${
                  expandedReview === review.id ? '' : 'line-clamp-3'
                }`}
              >
                {review.content}
              </p>

              {/* Expandable Content */}
              {expandedReview === review.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-sm">
                      <button className="text-gray-600 dark:text-gray-400 hover:text-primary-500 flex items-center gap-1">
                        👍 {review.helpful} Helpful
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onReplyClick?.(review.id);
                        }}
                        className="text-primary-500 hover:text-primary-600 flex items-center gap-1"
                      >
                        <MessageSquare size={14} /> Reply
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
