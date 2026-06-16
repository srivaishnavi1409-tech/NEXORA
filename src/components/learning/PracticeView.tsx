import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Code, Play } from 'react-icons/fa';
import { cn } from '@/utils/cn';

interface PracticeViewProps {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sampleInput: string;
  sampleOutput: string;
  hints: string[];
  starterCode: string;
}

const PracticeView: React.FC<PracticeViewProps> = ({
  title,
  description,
  difficulty,
  sampleInput,
  sampleOutput,
  hints,
  starterCode,
}) => {
  const [code, setCode] = useState(starterCode);
  const [showHints, setShowHints] = useState(false);
  const [output, setOutput] = useState('');

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'Medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      case 'Hard':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
      default:
        return '';
    }
  };

  const handleSubmit = () => {
    // Placeholder for code execution
    setOutput('Output will appear here...');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Problem Description */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            <span className={cn('px-3 py-1 rounded-full text-sm font-semibold', getDifficultyColor(difficulty))}>
              {difficulty}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Problem #{Math.random().toString().slice(2, 7)}</p>
        </div>

        <Card>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2">Sample Input</h3>
          <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
            {sampleInput}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2">Sample Output</h3>
          <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
            {sampleOutput}
          </div>
        </Card>

        {/* Hints */}
        <Card>
          <button
            onClick={() => setShowHints(!showHints)}
            className="font-semibold text-primary-500 hover:text-primary-600"
          >
            {showHints ? '✕ Hide Hints' : '? Show Hints'}
          </button>
          {showHints && (
            <div className="mt-3 space-y-2">
              {hints.map((hint, index) => (
                <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm">
                  <strong>Hint {index + 1}:</strong> {hint}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Code Editor */}
      <div className="space-y-4">
        <Card className="flex-1">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Code size={18} /> Write Your Solution
          </h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Write your code here..."
          />
        </Card>

        <div className="flex gap-2">
          <Button onClick={handleSubmit} className="flex-1 gap-2">
            <Play size={16} /> Run Code
          </Button>
          <Button variant="secondary" className="flex-1">
            Submit
          </Button>
        </div>

        {output && (
          <Card>
            <h3 className="font-semibold mb-2">Output</h3>
            <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
              {output}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PracticeView;
