
export default {
    title: '도구',
    tagline: 'AI 도구를 사용하여 교육을 강화하세요.',
    activityAdapter: {
      title: '활동 어댑터',
      description: '기존 활동을 특정 학생이나 전체 그룹의 필요에 맞게 조정하세요.',
      placeholder: '여기에 조정하고 싶은 활동을 붙여넣거나 작성하세요...',
      activityLabel: '조정할 활동',
      existingActivityLabel: '기존 활동 또는 테스트 선택',
      existingActivityPlaceholder: '요약 및 조정할 활동/테스트 선택...',
      studentLabel: '특정 학생을 위해 조정 (선택 사항)',
      studentPlaceholder: '학생 선택...',
      customPromptLabel: '조정의 구체적인 목표 (선택 사항)',
      customPromptPlaceholder: '예: 게임으로 만들기, 작문에 집중하기...',
      button: '활동 조정',
      generatingTitle: '조정안 생성 중...',
      activityType: '활동'
    },
     rubricGenerator: {
      title: '평가 기준 생성기',
      description: '모든 활동에 대해 공정하고 균형 잡힌 평가 기준을 만듭니다.',
      placeholder: '평가 기준을 생성할 활동을 설명하세요...',
      button: '평가 기준 생성',
      testType: '테스트'
    },
    history: {
      title: '내역',
      descriptionAdapter: '이전에 조정된 활동을 검토합니다.',
      descriptionRubric: '이전에 생성된 평가 기준을 검토합니다.',
      reasoning: '근거',
      criterion: '기준',
      excellent: '우수',
      satisfactory: '만족',
      needsImprovement: '개선 필요',
      scoringGuide: '채점 가이드',
      toastDeleteSuccess: '성공적으로 삭제되었습니다.',
      toastDeleteFailed: '삭제에 실패했습니다.',
      noResults: {
        title: '아직 결과 없음',
        description: '왼쪽의 도구를 사용하여 첫 번째 결과를 생성하세요.',
      },
      deleteDialogAdapter: {
          title: '이 조정을 삭제하시겠습니까?',
          description: '이 작업은 되돌릴 수 없습니다. 활동 조정이 영구적으로 삭제됩니다.',
          confirm: '삭제'
      },
      deleteDialogRubric: {
          title: '이 평가 기준을 삭제하시겠습니까?',
          description: '이 작업은 되돌릴 수 없습니다. 생성된 평가 기준이 영구적으로 삭제됩니다.',
          confirm: '삭제'
      }
    }
} as const;
