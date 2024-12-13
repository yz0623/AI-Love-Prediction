import { Question, Answer, TestResult } from '../types';

export function calculateTestResult(
  questions: Question[],
  answers: Record<string, Answer>
): TestResult {
  // 计算各类别得分
  const categoryScores = calculateCategoryScores(questions, answers);
  
  // 计算总体得分
  const overallScore = calculateOverallScore(categoryScores);
  
  // 生成分析结果
  const analysis = generateAnalysis(categoryScores);

  return {
    overallScore,
    categoryScores,
    analysis,
    timestamp: Date.now(),
  };
}

function calculateCategoryScores(
  questions: Question[],
  answers: Record<string, Answer>
): Record<string, number> {
  const categories = new Set(questions.map(q => q.category));
  const scores: Record<string, number> = {};

  categories.forEach(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    let totalScore = 0;
    let maxPossibleScore = 0;

    categoryQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        // 计算该题得分
        const questionScore = answer.selectedOptionIds.reduce((score, optionId) => {
          const option = question.options.find(opt => opt.id === optionId);
          return score + (option?.score || 0);
        }, 0);
        totalScore += questionScore;

        // 计算该题最高可能分数
        const maxQuestionScore = Math.max(
          ...question.options.map(opt => opt.score || 0)
        );
        maxPossibleScore += maxQuestionScore;
      }
    });

    scores[category] = maxPossibleScore > 0
      ? Math.round((totalScore / maxPossibleScore) * 100)
      : 0;
  });

  return scores;
}

function calculateOverallScore(
  categoryScores: Record<string, number>
): number {
  const scores = Object.values(categoryScores);
  if (scores.length === 0) return 0;
  
  return Math.round(
    scores.reduce((sum, score) => sum + score, 0) / scores.length
  );
}

function generateAnalysis(
  categoryScores: Record<string, number>
): {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
} {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  // 基于分数生成分析
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score >= 80) {
      strengths.push(getStrengthMessage(category, score));
    } else if (score <= 60) {
      weaknesses.push(getWeaknessMessage(category, score));
      suggestions.push(getSuggestionMessage(category));
    }
  });

  return {
    strengths,
    weaknesses,
    suggestions,
  };
}

// 辅助函数用于生成分析文本
function getStrengthMessage(category: string, score: number): string {
  const messages: Record<string, string> = {
    personality: `你们的性格特征非常匹配(${score}分),这为关系提供了良好的基础`,
    values: `在价值观方面高度一致(${score}分),这有助于建立长期稳定的关系`,
    lifestyle: `生活方式非常协调(${score}分),这让日常相处更加融洽`,
    goals: `对未来目标有着共同的愿景(${score}分),这对关系的发展很有帮助`,
  };
  return messages[category] || `${category}方面表现优秀(${score}分)`;
}

function getWeaknessMessage(category: string, score: number): string {
  const messages: Record<string, string> = {
    personality: `性格特征方面存在一些差异(${score}分),需要互相理解和包容`,
    values: `价值观念有待调和(${score}分),这需要更多沟通和理解`,
    lifestyle: `生活方式有所不同(${score}分),可能需要适当的调整和妥协`,
    goals: `未来规划方面存在分歧(${score}分),建议及时沟通和协调`,
  };
  return messages[category] || `${category}方面需要改善(${score}分)`;
}

function getSuggestionMessage(category: string): string {
  const messages: Record<string, string> = {
    personality: '建议多花时间了解对方的性格特点,学会欣赏彼此的不同',
    values: '可以通过深入交流,找到价值观的共同点,建立互信基础',
    lifestyle: '尝试制定共同的生活计划,在彼此习惯中找到平衡点',
    goals: '建议坦诚地讨论未来规划,找到能够共同努力的方向',
  };
  return messages[category] || '建议通过沟通和理解来改善这方面的问题';
}

// 添加新的结果计算函数
export function calculateMatchResult(
  questions: Question[],
  selfAnswers: Record<string, Answer>,
  partnerAnswers: Record<string, Answer>,
  selfInfo?: {
    name: string;
    gender: string;
    age: number;
    [key: string]: any;
  },
  partnerInfo?: {
    name: string; 
    gender: string;
    age: number;
    [key: string]: any;
  },
): TestResult {
  // 计算每个类别的匹配度
  const categoryScores = calculateCategoryMatchScores(
    questions,
    selfAnswers,
    partnerAnswers
  );
  
  // 计算总体匹配度
  const overallScore = calculateOverallScore(categoryScores);
  
  // 生成匹配分析
  const analysis = generateMatchAnalysis(
    categoryScores,
    selfInfo,
    partnerInfo
  );

  return {
    overallScore,
    categoryScores,
    analysis,
    timestamp: Date.now(),
  };
}

// 添加匹配度计算函数
function calculateCategoryMatchScores(
  questions: Question[],
  selfAnswers: Record<string, Answer>,
  partnerAnswers: Record<string, Answer>
): Record<string, number> {
  const categories = new Set(questions.map(q => q.category));
  const scores: Record<string, number> = {};

  categories.forEach(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    let matchScore = 0;
    let totalQuestions = categoryQuestions.length;

    categoryQuestions.forEach(question => {
      const selfAnswer = selfAnswers[question.id];
      const partnerAnswer = partnerAnswers[question.id];

      if (selfAnswer && partnerAnswer) {
        // 计算答案的相似度
        const similarity = calculateAnswerSimilarity(
          question,
          selfAnswer.selectedOptionIds,
          partnerAnswer.selectedOptionIds
        );
        matchScore += similarity;
      }
    });

    scores[category] = totalQuestions > 0
      ? Math.round((matchScore / totalQuestions) * 100)
      : 0;
  });

  return scores;
}

function calculateAnswerSimilarity(
  question: Question,
  selfOptionIds: string[],
  partnerOptionIds: string[]
): number {
  if (question.type === 'single') {
    // 单选题：选择相同选项得1分，不同得0分
    return selfOptionIds[0] === partnerOptionIds[0] ? 1 : 0;
  } else {
    // 多选题：计算选项的交集与并集的比率
    const intersection = selfOptionIds.filter(id => partnerOptionIds.includes(id));
    const union = [...new Set([...selfOptionIds, ...partnerOptionIds])];
    return intersection.length / union.length;
  }
}

function generateMatchAnalysis(
  categoryScores: Record<string, number>,
  selfInfo?: {
    name: string;
    gender: string;
    age: number;
    [key: string]: any;
  },
  partnerInfo?: {
    name: string;
    gender: string;
    age: number;
    [key: string]: any;
  }
): {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
} {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score >= 80) {
      strengths.push(getStrengthMessage(category, score));
    } else if (score <= 60) {
      weaknesses.push(getWeaknessMessage(category, score));
      suggestions.push(getSuggestionMessage(category));
    }
  });

  return { strengths, weaknesses, suggestions };
} 