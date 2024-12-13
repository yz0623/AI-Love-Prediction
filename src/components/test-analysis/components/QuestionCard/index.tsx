import { Question } from '../../types';
import { useTest } from '../../context/TestContext';
import AnswerOptions from '../AnswerOptions';

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const { state, dispatch } = useTest();
  const currentRole = state.progress.currentRole;
  
  console.log('QuestionCard render:', {
    currentRole,
    question,
    answers: state.progress.answers,
    state: state,
  });

  const currentAnswer = currentRole 
    ? state.progress.answers[currentRole]?.[question.id]
    : undefined;

  const handleSelect = (selectedOptionIds: string[]) => {
    console.log('handleSelect called:', {
      selectedOptionIds,
      currentRole,
      questionId: question.id,
      state: state,
    });
    
    if (!currentRole) {
      console.warn('No current role available');
      return;
    }

    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        role: currentRole,
        answer: {
          questionId: question.id,
          selectedOptionIds,
          timestamp: Date.now(),
        },
      },
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{question.content}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {question.type === 'single' ? '请选择一个选项' : '可多选'}
        </p>
        {currentRole && (
          <p className="text-sm text-purple-500 mt-1">
            当前答题: {currentRole === 'self' ? '自己' : '伴侣'}
          </p>
        )}
      </div>

      <AnswerOptions
        options={question.options}
        type={question.type} 
        selectedOptionIds={currentAnswer?.selectedOptionIds || []}
        onSelect={handleSelect}
      />
    </div>
  );
} 