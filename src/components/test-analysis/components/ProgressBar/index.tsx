import { useTest } from '../../context/TestContext';

export default function ProgressBar() {
  const { state } = useTest();
  const { currentQuestionIndex, totalQuestions, currentRole } = state.progress;
  
  const progress = totalQuestions > 0 
    ? Math.round((currentQuestionIndex + 1) / totalQuestions * 100)
    : 0;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between text-sm mb-2">
        <span>进度: {progress}%</span>
        <span>
          {currentQuestionIndex + 1} / {totalQuestions}
          {currentRole && (
            <span className="ml-2 text-purple-500">
              ({currentRole === 'self' ? '自己' : '伴侣'})
            </span>
          )}
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${
            currentRole === 'self' ? 'bg-purple-500' : 'bg-pink-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 