import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Rating from '../ui/Rating';
import { Send } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ReviewFormProps {
  onSubmit?: (review: { title: string; content: string; rating: number }) => Promise<void>;
  onCancel?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim()) newErrors.content = 'Review content is required';
    if (rating === 0) newErrors.rating = 'Please select a rating';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.({ title, content, rating });
      setTitle('');
      setContent('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Card className="space-y-4">
        <h3 className="text-lg font-bold">Share Your Review</h3>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold mb-2">Rating</label>
          <Rating rating={rating} onChange={setRating} />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
        </div>

        {/* Title */}
        <Input
          label="Review Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your review"
          error={errors.title}
        />

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold mb-2">Your Review</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your detailed thoughts..."
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-surface-light dark:bg-surface-dark focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 gap-2"
          >
            <Send size={16} /> Submit Review
          </Button>
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReviewForm;
