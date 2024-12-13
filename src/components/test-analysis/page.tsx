'use client';

import { useEffect, useState } from 'react';
import { TestProvider } from './context/TestContext';
import { useTest } from './context/TestContext';
import { useTestProgress } from './hooks/useTestProgress';
import { useAnswerValidation } from './hooks/useAnswerValidation';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultPanel from './components/ResultPanel';
import { calculateMatchResult } from './utils/resultCalculation';
import { getNextQuestion, getPreviousQuestion } from './utils/questionLogic';
import { questions } from './data/questions';
import PersonalInfoForm from './components/PersonalInfoForm';

function TestContent() {
  const { state, dispatch } = useTest();
  const { restoreProgress, clearProgress } = useTestProgress();
  const { validateAllAnswers } = useAnswerValidation();
  const [mounted, setMounted] = useState(false);

  console.log('TestContent render:', {
    status: state.status,
    currentRole: state.progress.currentRole,
    answers: state.progress.answers,
  });

  // 处理客户端挂载
  useEffect(() => {
    setMounted(true);
  }, []);

  // 初始化测试
  useEffect(() => {
    if (mounted && state.status === 'not_started') {
      console.log('Test not started yet, waiting for personal info');
      return;
    }

    if (mounted && state.status === 'in_progress' && !state.progress.currentRole) {
      console.warn('Test in progress but no current role set');
      dispatch({
        type: 'SET_ERROR',
        payload: '请先选择答题身份',
      });
    }
  }, [mounted, state.status, state.progress.currentRole]);

  // 键盘导航
  useEffect(() => {
    if (!mounted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (state.status !== 'in_progress' || !state.progress.currentRole) return;

      switch (e.key) {
        case 'ArrowLeft':
          navigateQuestion('prev');
          break;
        case 'ArrowRight':
          navigateQuestion('next');
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          // 数字键选择选项
          const currentQuestion = questions[state.progress.currentQuestionIndex];
          const optionIndex = parseInt(e.key) - 1;
          const option = currentQuestion.options[optionIndex];
          if (option) {
            dispatch({
              type: 'ANSWER_QUESTION',
              payload: {
                role: state.progress.currentRole,
                answer: {
                  questionId: currentQuestion.id,
                  selectedOptionIds: [option.id],
                  timestamp: Date.now(),
                },
              },
            });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mounted, state.status, state.progress.currentQuestionIndex, state.progress.currentRole]);

  const navigateQuestion = (direction: 'prev' | 'next') => {
    const currentIndex = state.progress.currentQuestionIndex;
    const newIndex = direction === 'next'
      ? getNextQuestion(questions, currentIndex, state.progress.answers[state.progress.currentRole || 'self'] || {})
      : getPreviousQuestion(questions, currentIndex);

    dispatch({
      type: 'NAVIGATE_QUESTION',
      payload: newIndex,
    });
  };

  const handleComplete = () => {
    console.log('Complete button clicked'); // 添加调试日志
    
    const currentRole = state.progress.currentRole;
    if (!currentRole) {
      console.log('No current role'); // 调试日志
      return;
    }
    const answers = state.progress.answers[currentRole] || {};
    if (!validateAllAnswers(questions, answers)) {
      console.log('Validation failed'); // 调试日志
      dispatch({
        type: 'SET_ERROR',
        payload: '请完成所有题目后再提交',
      });
      return;
    }

    if (currentRole === 'self') {
      console.log('Switching to partner'); // 调试日志
      dispatch({ type: 'SWITCH_ROLE', payload: 'partner' });
      dispatch({
        type: 'SET_ERROR',
        payload: '请伴侣继续完成测试',
      });
    } else {
      console.log('Completing test'); // 调试日志
      const result = calculateMatchResult(
        questions,
        state.progress.answers.self || {},
        state.progress.answers.partner || {},
        state.personalInfo?.self,
        state.personalInfo?.partner,
      );
      dispatch({
        type: 'COMPLETE_TEST',
        payload: result,
      });
    }
  };

  const handleRetry = () => {
    dispatch({ type: 'RESET_TEST' });
    clearProgress();
  };

  if (!mounted) {
    return null; // 或者返回加载状态
  }

  if (state.status === 'completed' && state.result) {
    return (
      <ResultPanel 
        result={state.result} 
        selfInfo={state.personalInfo?.self}
        partnerInfo={state.personalInfo?.partner}
        onRetry={handleRetry} 
      />
    );
  }

  if (state.status === 'not_started') {
    return <PersonalInfoForm />;
  }

  const currentQuestion = questions[state.progress.currentQuestionIndex];
  console.log('Current question:', currentQuestion);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <ProgressBar />
        
        {currentQuestion && (
          <QuestionCard question={currentQuestion} />
        )}

        <div className="flex justify-between mt-8 max-w-2xl mx-auto">
          <button
            onClick={() => navigateQuestion('prev')}
            disabled={state.progress.currentQuestionIndex === 0}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
          >
            上一题
          </button>

          {state.progress.currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleComplete}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
            >
              完成测试
            </button>
          ) : (
            <button
              onClick={() => navigateQuestion('next')}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
            >
              下一题
            </button>
          )}
        </div>

        {state.error && (
          <div className="mt-4 text-center text-red-500">
            {state.error}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <TestProvider>
      <TestContent />
    </TestProvider>
  );
} 