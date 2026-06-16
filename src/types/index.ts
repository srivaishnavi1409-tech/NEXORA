export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  theme: 'light' | 'dark';
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  content: ContentItem[];
}

export interface ContentItem {
  id: string;
  type: 'video' | 'notes' | 'practice' | 'quiz';
  title: string;
  completed: boolean;
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  description: string;
  duration: number;
  resourceLinks: ResourceLink[];
}

export interface ResourceLink {
  title: string;
  url: string;
}

export interface Notes {
  id: string;
  title: string;
  content: string;
  codeBlocks: CodeBlock[];
  sections: Section[];
}

export interface CodeBlock {
  language: string;
  code: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'warning' | 'tip' | 'important';
}

export interface PracticeProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sampleInput: string;
  sampleOutput: string;
  hints: string[];
  starterCode: string;
  solutions: string[];
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  output: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Review {
  id: string;
  userName: string;
  email: string;
  rating: number;
  subject: string;
  text: string;
  timestamp: string;
  helpful: number;
}

export interface Streak {
  count: number;
  lastDate: string;
}

export interface UserProgress {
  userId: string;
  subject: string;
  moduleId: string;
  videoCompleted: boolean;
  notesCompleted: boolean;
  practiceCompleted: boolean;
  quizCompleted: boolean;
  quizScore: number;
  completedAt: string;
}
