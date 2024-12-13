import { useTest } from '../context/TestContext';
import { Question } from '../types';

export function useAnswerValidation() {
  const validateAnswer = (
    question: Question,
    answers: Record<string, Answer>
  ) => {
    const answer = answers[question.id];
    
    if (!answer) {
      return false;
    }

    // 单选题必须选择一个选项
    if (question.type === 'single' && answer.selectedOptionIds.length !== 1) {
      return false;
    }

    // 多选题至少选择一个选项
    if (question.type === 'multiple' && answer.selectedOptionIds.length === 0) {
      return false;
    }

    return true;
  };

  const validateAllAnswers = (
    questions: Question[],
    answers: Record<string, Answer>
  ) => {
    return questions.every(q => validateAnswer(q, answers));
  };

  return {
    validateAnswer,
    validateAllAnswers,
  };
} 