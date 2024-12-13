import { createContext, useContext, useReducer, ReactNode } from 'react';
import { TestProgress, TestStatus, Answer, TestResult, PersonalInfo, TestState } from '../types';
import { questions } from '../data/questions';

type TestAction = 
  | { type: 'START_TEST', payload: { totalQuestions: number, startRole: 'self' | 'partner' } }
  | { type: 'SET_PERSONAL_INFO', payload: { role: 'self' | 'partner', info: PersonalInfo } }
  | { type: 'SWITCH_ROLE', payload: 'self' | 'partner' }
  | { type: 'ANSWER_QUESTION', payload: { role: 'self' | 'partner', answer: Answer } }
  | { type: 'NAVIGATE_QUESTION', payload: number }
  | { type: 'SAVE_PROGRESS' }
  | { type: 'COMPLETE_TEST', payload: TestResult }
  | { type: 'SET_ERROR', payload: string }
  | { type: 'RESET_TEST' };

const initialState: TestState = {
  status: 'not_started',
  progress: {
    currentQuestionIndex: 0,
    totalQuestions: 0,
    answers: {
      self: {},
      partner: {},
    },
    currentRole: undefined,
  },
  result: null,
  personalInfo: {
    self: undefined,
    partner: undefined,
  },
};

function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      console.log('Setting personal info:', action.payload);
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          [action.payload.role]: action.payload.info,
        },
      };

    case 'START_TEST':
      console.log('Starting test with role:', action.payload.startRole);
      return {
        ...state,
        status: 'in_progress',
        error: undefined,
        progress: {
          currentQuestionIndex: 0,
          totalQuestions: action.payload.totalQuestions,
          answers: {
            self: {},
            partner: {},
          },
          currentRole: action.payload.startRole,
          startTime: Date.now(),
        },
      };

    case 'SWITCH_ROLE':
      return {
        ...state,
        progress: {
          ...state.progress,
          currentQuestionIndex: 0,
          currentRole: action.payload,
        },
      };

    case 'ANSWER_QUESTION':
      console.log('Answering question:', action.payload);
      if (!state.progress.currentRole) {
        console.warn('No current role available');
        return state;
      }

      return {
        ...state,
        progress: {
          ...state.progress,
          answers: {
            ...state.progress.answers,
            [action.payload.role]: {
              ...(state.progress.answers[action.payload.role] || {}),
              [action.payload.answer.questionId]: action.payload.answer,
            },
          },
        },
      };
      
    case 'NAVIGATE_QUESTION':
      return {
        ...state,
        progress: {
          ...state.progress,
          currentQuestionIndex: action.payload,
        },
      };
      
    case 'SAVE_PROGRESS':
      return {
        ...state,
        progress: {
          ...state.progress,
          lastSaveTime: Date.now(),
        },
      };
      
    case 'COMPLETE_TEST':
      return {
        ...state,
        status: 'completed',
        result: action.payload,
      };
      
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
      
    case 'RESET_TEST':
      return initialState;
      
    default:
      return state;
  }
}

const TestContext = createContext<{
  state: TestState;
  dispatch: React.Dispatch<TestAction>;
} | null>(null);

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(testReducer, initialState);

  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
} 