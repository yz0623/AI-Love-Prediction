import { TestResult } from '../../types';
import { PersonalInfo } from '../../types';

interface ResultPanelProps {
  result: TestResult;
  selfInfo?: PersonalInfo;
  partnerInfo?: PersonalInfo;
  onRetry?: () => void;
}

export default function ResultPanel({ 
  result, 
  selfInfo,
  partnerInfo,
  onRetry 
}: ResultPanelProps) {
  const { overallScore, categoryScores, analysis } = result;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
      {/* 基本信息 */}
      {selfInfo && partnerInfo && (
        <div className="mb-8 text-center">
          <h3 className="text-lg font-medium mb-4">测试者信息</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="font-medium mb-2">自己</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {selfInfo.name} ({selfInfo.age}岁)
              </div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="font-medium mb-2">伴侣</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {partnerInfo.name} ({partnerInfo.age}岁)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 匹配度结果 */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">匹配度分析</h2>
        <div className="text-5xl font-bold text-purple-500 mb-4">
          {overallScore}%
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          整体契合度评分
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">分类得分</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryScores).map(([category, score]) => (
            <div 
              key={category}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {getCategoryLabel(category)}
              </div>
              <div className="text-2xl font-bold">{score}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <AnalysisSection
          title="优势特点"
          items={analysis.strengths}
          icon="💪"
        />
        <AnalysisSection
          title="需要关注"
          items={analysis.weaknesses}
          icon="💭"
        />
        <AnalysisSection
          title="建议方向"
          items={analysis.suggestions}
          icon="💡"
        />
      </div>

      {onRetry && (
        <div className="mt-8 text-center">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white rounded-full transition-colors"
          >
            重新测试
          </button>
        </div>
      )}
    </div>
  );
}

function AnalysisSection({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: string;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
        <span>{icon}</span>
        <span>{title}</span>
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li 
            key={index}
            className="pl-4 border-l-2 border-purple-500"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    personality: '性格特征',
    values: '价值观念',
    lifestyle: '生活方式',
    goals: '未来目标',
  };
  return labels[category] || category;
} 