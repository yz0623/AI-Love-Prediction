// 题目类型
export interface Question {
  id: string;
  content: string;
  options: QuestionOption[];
  type: 'single' | 'multiple';  // 单选或多选
  category: 'personality' | 'values' | 'lifestyle' | 'goals';  // 题目类别
}

// 选项类型
export interface QuestionOption {
  id: string;
  content: string;
  score?: number;  // 选项分值
}

// 答案类型
export interface Answer {
  questionId: string;
  selectedOptionIds: string[];
  timestamp: number;
}

// 测试进度类型
export interface TestProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: {
    self?: Record<string, Answer>;
    partner?: Record<string, Answer>;
  };
  startTime?: number;
  lastSaveTime?: number;
  currentRole?: 'self' | 'partner';
}

// 测试结果类型
export interface TestResult {
  overallScore: number;
  categoryScores: Record<string, number>;
  analysis: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  timestamp: number;
}

// 测试状态类型
export type TestStatus = 
  | 'not_started'  // 未开始
  | 'in_progress'  // 进行中
  | 'paused'       // 暂停
  | 'completed'    // 已完成
  | 'error';       // 错误状态 

// 个人信息类型
export interface PersonalInfo {
  name: string;
  gender: 'male' | 'female';
  age: number;
  role: 'self' | 'partner';
}

// 测试状态类型
export interface TestState {
  status: TestStatus;
  progress: TestProgress;
  result: TestResult | null;
  error?: string;
  personalInfo?: {
    self?: PersonalInfo;
    partner?: PersonalInfo;
  };
}

// 添加新的 Action 类型
export type TestAction = 
  | { type: 'SET_PERSONAL_INFO', payload: { role: 'self' | 'partner', info: PersonalInfo } }
  | { type: 'SWITCH_ROLE', payload: 'self' | 'partner' }
  // ... 其他已有的 action 类型