export default {
    title: '평가',
    tagline: '학생 참여를 검토하고 평가합니다.',
    evaluateButton: '평가하기',
    evaluatedStatus: '평가됨',
    rejectedStatus: '거부됨',
    noChallenges: '이 학생에게는 아직 기록된 도전 과제가 없습니다.',
    noEvaluations: {
      title: '아직 평가 없음',
      description:
        '학생이 도전 과제를 수락하면 여기에서 평가할 수 있습니다.',
    },
    evaluationDialog: {
      title: '도전 과제 평가',
      forStudent: '{name}을(를) 위한',
      challenge: '도전 과제',
      rating: '평점',
      feedback: '피드백',
      feedbackPlaceholder: '여기에 피드백을 입력하세요...',
      saveButton: '평가 저장',
      mood: '학생 기분',
    },
    ratings: {
      needsSupport: '지원이 필요함',
      metExpectations: '기대 충족',
      exceededExpectations: '기대 초과',
    },
    moods: {
      enthusiastic: '열정적',
      focused: '집중함',
      nervous: '긴장함',
      frustrated: '좌절함',
      happy: '행복함',
      tired: '피곤함',
    },
    pagination: {
        previous: '이전',
        next: '다음',
        page: '페이지 {currentPage}/{totalPages}',
    }
} as const;
