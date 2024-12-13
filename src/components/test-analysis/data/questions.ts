export const questions = [
  {
    id: 'q1',
    content: '你更倾向于如何处理与伴侣的分歧?',
    type: 'single' as const,
    category: 'personality' as const,
    options: [
      {
        id: 'q1_1',
        content: '立即沟通,寻求解决方案',
        score: 10
      },
      {
        id: 'q1_2', 
        content: '先冷静一下,稍后再讨论',
        score: 8
      },
      {
        id: 'q1_3',
        content: '等对方主动提出讨论',
        score: 5
      },
      {
        id: 'q1_4',
        content: '避免冲突,保持沉默',
        score: 3
      }
    ]
  },
  {
    id: 'q2',
    content: '对于未来的规划,你认为哪些方面最重要? (可多选)',
    type: 'multiple' as const,
    category: 'goals' as const,
    options: [
      {
        id: 'q2_1',
        content: '事业发展',
        score: 8
      },
      {
        id: 'q2_2',
        content: '家庭生活',
        score: 10
      },
      {
        id: 'q2_3',
        content: '个人成长',
        score: 7
      },
      {
        id: 'q2_4',
        content: '社交关系',
        score: 6
      }
    ]
  },
  {
    id: 'q3',
    content: '你期望的理想生活方式是什么?',
    type: 'single' as const,
    category: 'lifestyle' as const,
    options: [
      {
        id: 'q3_1',
        content: '规律稳定的生活',
        score: 8
      },
      {
        id: 'q3_2',
        content: '充满挑战和变化',
        score: 7
      },
      {
        id: 'q3_3',
        content: '自由随性的节奏',
        score: 6
      },
      {
        id: 'q3_4',
        content: '平衡工作与生活',
        score: 10
      }
    ]
  }
]; 