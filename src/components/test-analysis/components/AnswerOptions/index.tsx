// src/components/test-analysis/components/AnswerOptions/index.tsx
import { QuestionOption } from '../../types';

interface AnswerOptionsProps {
  options: QuestionOption[];
  type: 'single' | 'multiple';
  selectedOptionIds: string[];
  onSelect: (selectedIds: string[]) => void;
}

export default function AnswerOptions({
  options,
  type,
  selectedOptionIds,
  onSelect,
}: AnswerOptionsProps) {
  const handleOptionClick = (optionId: string) => {
    console.log('Option clicked:', {
      optionId,
      type,
      currentSelection: selectedOptionIds,
    });
    
    if (type === 'single') {
      console.log('Single selection:', [optionId]);
      onSelect([optionId]);
    } else {
      const newSelection = selectedOptionIds.includes(optionId)
        ? selectedOptionIds.filter(id => id !== optionId)
        : [...selectedOptionIds, optionId];
      console.log('Multiple selection:', newSelection);
      onSelect(newSelection);
    }
  };

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => {
            console.log('Button clicked:', option.id);
            handleOptionClick(option.id);
          }}
          className="w-full text-left"
        >
          <div className={`
            flex items-center p-4 rounded-lg border-2 transition-all
            ${
              selectedOptionIds.includes(option.id)
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-200'
            }
          `}>
            <div className={`
              w-5 h-5 mr-3 flex items-center justify-center
              border-2 transition-colors
              ${
                type === 'single' 
                  ? 'rounded-full' 
                  : 'rounded-md'
              }
              ${
                selectedOptionIds.includes(option.id)
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-gray-300'
              }
            `}>
              {selectedOptionIds.includes(option.id) && (
                <span className="text-white text-sm">✓</span>
              )}
            </div>
            
            <span className="flex-1">{option.content}</span>
          </div>
        </button>
      ))}
    </div>
  );
}