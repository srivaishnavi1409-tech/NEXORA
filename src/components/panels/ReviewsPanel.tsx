import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Rating from '../ui/Rating';
import { MessageCircle, ThumbsUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  timestamp: string;
  likes: number;
}

interface ReviewsPanelProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: () => void;
}

const ReviewsPanel: React.FC<ReviewsPanelProps> = ({
  reviews,
  averageRating,
  totalReviews,
  onAddReview,
}) => {
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());

  const toggleLike = (reviewId: string) => {
    const newLiked = new Set(likedReviews);
    if (newLiked.has(reviewId)) {
      newLiked.delete(reviewId);
    } else {
      newLiked.add(reviewId);
    }
    setLikedReviews(newLiked);
  };

  return (
    <Card className="space-y-6">
      {/* Rating Summary */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Reviews</h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary-500">{averageRating.toFixed(1)}</span>
            <div>
              <Rating rating={Math.round(averageRating)} readOnly />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{totalReviews} reviews</p>
            </div>
          </div>
        </div>
        <Button onClick={onAddReview} size="sm">
          <MessageCircle size={16} /> Add Review
        </Button>
      </div>

      {/* Reviews List */}
      <AnimatePresence>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
            >
              {/* Review Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{review.author}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{review.timestamp}</p>
                  </div>
                </div>
                <Rating rating={review.rating} readOnly size="sm" />
              </div>

              {/* Review Comment */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>

              {/* Like Button */}
              <button
                onClick={() => toggleLike(review.id)}
                className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
              >
                <ThumbsUp size={14} className={likedReviews.has(review.id) ? 'fill-primary-500' : ''} />
                <span>{review.likes + (likedReviews.has(review.id) ? 1 : 0)}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </Card>
  );
};

export default ReviewsPanel;
