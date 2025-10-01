export default {
    title: '개별 활동',
    tagline: '특정 학생을 위한 맞춤형 활동을 디자인합니다.',
    step0: {
        title: '학생 선택',
        description: '맞춤형 활동 생성을 시작하려면 학생을 선택하세요.',
    },
    step1: {
      selectLabel: '학생',
      selectPlaceholder: '학생 선택...',
    },
    generator: {
        title: '{name}을(를) 위한 활동 생성기',
        description: '활동의 매개변수를 정의하거나 AI를 사용하여 아이디어를 제안받으세요.',
        topicLabel: '학업 주제',
        topicPlaceholder: '예: 분수, 광합성',
        skillsLabel: '개발할 기술',
        skillsPlaceholder: '예: 비판적 사고, 협업',
        themesLabel: '참여 테마',
        themesPlaceholder: '예: 우주, 공룡, 미스터리',
        customPromptLabel: '사용자 지정 프롬프트 (선택 사항)',
        customPromptPlaceholder: '예: 시각적 요소에 집중, 실습 활동 만들기',
        negativePromptLabel: '부정적 프롬프트 (선택 사항)',
        negativePromptPlaceholder: '예: 쓰기 과제 피하기, 거미 언급하지 않기',
        generateButton: '활동 생성',
        toastSuccess: '활동이 성공적으로 생성되었습니다!',
        noSkills: '아직 사용 가능한 기술이 없습니다.',
        addSkills: '새로운 기술 추가'
    },
    suggestions: {
        button: 'AI로 제안하기',
        toastSuccess: '제안이 채워졌습니다!',
    },
    history: {
        title: "활동 계획 내역",
        description: "{name}을(를) 위해 이전에 생성된 활동 계획을 검토하고 관리합니다.",
        toastDeleted: '활동 계획이 삭제되었습니다.',
        toastDeleteFailed: '활동 계획 삭제에 실패했습니다.',
        noResults: {
            title: "아직 활동 계획이 없습니다",
            description: "이 학생의 첫 번째 계획을 생성하여 여기에서 내역을 확인하세요."
        },
        deleteDialog: {
            title: "이 활동 계획을 삭제하시겠습니까?",
            description: "이 작업은 되돌릴 수 없습니다. 활동 계획이 영구적으로 삭제됩니다.",
        },
        stepDialog: {
            title: '활동 단계 평가',
            description: '이 활동은 어땠나요?',
            status: '상태',
            feedback: '단계 피드백 (선택 사항)',
            feedbackPlaceholder: '이 활동에 대한 메모 추가...',
            saveButton: '평가 저장',
            statuses: {
                pending: '대기 중',
                'in-progress': '진행 중',
                completed: '완료됨',
                skipped: '건너뜀'
            },
        },
    },
    democratizer: {
      title: '자원 민주화 도구',
      descriptionSingle: '이 활동을 더 접근하기 쉽도록 조정합니다.',
      descriptionAll: '이 계획의 모든 활동을 다양한 필요나 자원 제한에 따라 더 접근하기 쉽도록 조정합니다.',
      descriptionSelected: '이 계획에서 선택된 {count}개의 활동을 더 접근하기 쉽도록 조정합니다.',
      prompt: '활동에 적용할 조정 옵션을 선택하세요.',
      selectPlaceholder: '조정 선택...',
      activitiesToAdapt: "조정할 활동:",
      adaptButton: '활동 조정',
      toastSuccess: '활동이 성공적으로 조정되었습니다!',
      options: {
        commonMaterials: '일반적인 가정용 재료에 맞게 조정',
        lowEnergy: '저에너지/차분한 시나리오에 맞게 조정',
        socialInteraction: '사회적 상호작용 요소 증가',
        simpleInstructions: '지침 단순화',
      },
    }
} as const;
