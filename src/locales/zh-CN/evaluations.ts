export default {
    title: '评估',
    tagline: '回顾和评估学生的参与情况。',
    evaluateButton: '评估',
    evaluatedStatus: '已评估',
    rejectedStatus: '已拒绝',
    noChallenges: '该学生尚无挑战记录。',
    noEvaluations: {
      title: '暂无评估',
      description:
        '一旦学生接受挑战，您就可以在这里进行评估。',
    },
    evaluationDialog: {
      title: '评估挑战',
      forStudent: '给 {name}',
      challenge: '挑战',
      rating: '评分',
      feedback: '反馈',
      feedbackPlaceholder: '在此输入您的反馈...',
      saveButton: '保存评估',
      mood: '学生情绪',
    },
    ratings: {
      needsSupport: '需要支持',
      metExpectations: '符合预期',
      exceededExpectations: '超出预期',
    },
    moods: {
      enthusiastic: '热情',
      focused: '专注',
      nervous: '紧张',
      frustrated: '沮丧',
      happy: '开心',
      tired: '疲惫',
    },
    pagination: {
        previous: '上一页',
        next: '下一页',
        page: '第 {currentPage} 页，共 {totalPages} 页',
    }
} as const;
