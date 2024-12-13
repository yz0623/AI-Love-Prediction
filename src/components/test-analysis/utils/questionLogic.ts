import { Question, Answer } from '../types';

export function getNextQuestion(
  questions: Question[],
  currentIndex: number,
  answers: Record<string, Answer>
): number {
  // 如果是最后一题,返回当前索引
  if (currentIndex >= questions.length - 1) {
    return currentIndex;
  }

  // 简单的线性前进
  return currentIndex + 1;
}

export function getPreviousQuestion(
  questions: Question[],
  currentIndex: number
): number {
  // 如果是第一题,返回当前索引
  if (currentIndex <= 0) {
    return currentIndex;
  }

  // 简单的线性后退
  return currentIndex - 1;
}

export function canNavigateToQuestion(
  targetIndex: number,
  questions: Question[],
  answers: Record<string, Answer>
): boolean {
  // 检查目标索引是否有效
  if (targetIndex < 0 || targetIndex >= questions.length) {
    return false;
  }

  // 只允许导航到已答题的位置或下一题
  const answeredCount = Object.keys(answers).length;
  return targetIndex <= answeredCount;
}

export function getQuestionProgress(
  questions: Question[],
  answers: Record<string, Answer>
): number {
  if (questions.length === 0) return 0;
  return (Object.keys(answers).length / questions.length) * 100;
}

export function estimateRemainingTime(
  questions: Question[],
  answers: Record<string, Answer>,
  averageTimePerQuestion: number = 30 // 默认每题30秒
): number {
  const remainingQuestions = questions.length - Object.keys(answers).length;
  return remainingQuestions * averageTimePerQuestion;
} 