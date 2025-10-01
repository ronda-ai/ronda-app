
export default {
    title: '그룹 활동',
    tagline: '지능적으로 그룹을 구성하고 협업 활동을 생성합니다.',
    generator: {
      title: '그룹 제안 생성기',
      description: 'AI가 반을 분석하여 균형 잡힌 그룹과 진행 팁을 제안합니다.',
      button: '새 제안 생성',
    },
    manualMode: {
        title: '수동 그룹 빌더',
        description: '자신만의 그룹을 만들고 AI 지원을 받으세요.',
        selectLabel: '새 그룹의 학생 선택',
        selectPlaceholder: '학생 선택...',
        createGroupButton: '그룹 만들기',
        groupTitle: '새 그룹',
        analyzeButton: '역학 분석',
        generateActivityButton: '활동 생성',
        warningTitle: '관계 경고',
        conflictWarning: '{nameA}와(과) {nameB}는 기록된 갈등이 있습니다. 신중하게 진행하세요.',
        skillsLabel: '개발할 협업 기술',
        skillsPlaceholder: '예: 의사소통, 리더십',
        themesLabel: '활동 테마 (선택 사항)',
        themesPlaceholder: '예: 우주 임무, 미스터리 해결',
        activityGeneratedToast: '활동이 성공적으로 생성되었습니다!',
    },
    aiSuggestions: {
        title: 'AI 생성 제안',
    },
    history: {
      title: '제안 내역',
      description: '이전에 생성된 그룹 제안을 검토합니다.',
      suggestionFor: '{date}의 제안',
      teacherTipTitle: '진행자 팁',
      suggestedGroups: '제안된 그룹',
      group: '그룹',
      suggestedSkills: '제안된 협업 기술',
      suggestedThemes: '제안된 활동 테마',
      useSuggestionButton: '이 제안 사용',
      suggestionUsedToast: '수동 그룹 빌더에 제안이 적용되었습니다!',
      noResults: {
        title: '협업할 준비가 되셨나요?',
        description: '위 버튼을 클릭하여 반을 위한 첫 번째 그룹 제안 세트를 생성하세요.',
      },
      toastDeleted: '제안이 삭제되었습니다.',
      toastDeleteFailed: '제안 삭제에 실패했습니다.',
      deleteDialog: {
        title: '이 제안을 삭제하시겠습니까?',
        description: '이 작업은 영구적이며 되돌릴 수 없습니다.',
      },
    },
    viewActivitiesButton: '생성된 활동 보기',
    details: {
        title: '그룹을 위해 생성된 활동',
        description: '{members}을(를) 위해 다음 활동이 생성되었습니다.',
        deleteButton: '활동 계획 삭제',
    }
} as const;
