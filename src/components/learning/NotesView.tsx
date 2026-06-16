import React from 'react';
import Card from '../common/Card';
import { BookOpen, Code } from 'react-icons/fa';
import { cn } from '@/utils/cn';

interface NotesViewProps {
  title: string;
  content: string;
  codeBlocks?: Array<{ language: string; code: string }>;
  sections?: Array<{ id: string; title: string; content: string; type: 'note' | 'warning' | 'tip' | 'important' }>;
}

const NotesView: React.FC<NotesViewProps> = ({
  title,
  content,
  codeBlocks = [],
  sections = [],
}) => {
  const getSectionColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500';
      case 'tip':
        return 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500';
      case 'important':
        return 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400">Master the concepts with detailed notes</p>
      </div>

      {/* Main Content */}
      <Card>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content}</p>
        </div>
      </Card>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.id} className={cn('p-4 rounded-lg', getSectionColor(section.type))}>
          <h3 className="font-bold mb-2">{section.title}</h3>
          <p className="text-sm">{section.content}</p>
        </div>
      ))}

      {/* Code Blocks */}
      {codeBlocks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Code size={20} /> Code Examples
          </h3>
          {codeBlocks.map((block, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                <p className="text-xs text-gray-400 mb-2">{block.language}</p>
                <pre className="font-mono text-sm">{block.code}</pre>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesView;
