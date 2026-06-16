import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Check, X, Clock } from 'react-icons/fa';
import { cn } from '@/utils/cn';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizViewProps {
  title: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
}

const QuizView: React.FC<QuizViewProps> = ({ title, questions, timeLimit, passingScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const score = calculateScore();
  const isPassed = score >= passingScore;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <div className="text-center space-y-4">
            <div className={cn('w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl font-bold', isPassed ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600')}>
              {score}%
            </div>
            <div>
              <h2 className="text-2xl font-bold">{isPassed ? '🎉 Congratulations!' : 'Try Again'}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {isPassed ? `You scored ${score}% and passed!` : `You scored ${score}%. You need ${passingScore}% to pass.`}
              </p>
            </div>
          </div>
        </Card>

        {/* Review Answers */}
        <Card>
          <h3 className="font-bold text-lg mb-4">Review Your Answers</h3>
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                <p className="font-semibold mb-2">Q{index + 1}: {q.question}</p>
                <p className={cn('text-sm mb-2', selectedAnswers[index] === q.correctAnswer ? 'text-green-600' : 'text-red-600')}>
                  {selectedAnswers[index] === q.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">{q.explanation}</p>
              </div>
            ))}
          </div>
        </Card>

        <Button className="w-full" onClick={() => window.location.reload()}>
          Retake Quiz
        </Button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Clock size={20} /> {formatTime(timeLeft)}
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all',
                selectedAnswers[currentQuestion] === index
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center', selectedAnswers[currentQuestion] === index ? 'border-primary-500 bg-primary-500' : 'border-gray-400')}>
                  {selectedAnswers[currentQuestion] === index && <span className="text-white text-sm">✓</span>}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="flex-1"
        >
          Previous
        </Button>
        {currentQuestion === questions.length - 1 ? (
          <Button onClick={handleSubmitQuiz} className="flex-1">
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="flex-1">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizView;
