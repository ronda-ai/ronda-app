export default {
    title: 'AI 코치',
    tagline: 'AI 기반의 통찰력과 제안을 받으세요.',
    noStudentSelected: {
      title: '학생을 선택하세요',
      description:
        '목록에서 학생을 선택하여 분석을 보고 제안을 받으세요.',
    },
    tabs: {
        classroom: '반 분석',
        individual: '개별 분석'
    },
    coachSuggestion: {
      title: '코치 제안',
      description:
        '학생의 프로필과 성과를 바탕으로 맞춤형 제안을 생성합니다.',
      button: '제안 받기',
      toastDeleted: '제안이 성공적으로 삭제되었습니다.',
      toastDeleteFailed: '제안 삭제에 실패했습니다.',
      deleteDialog: {
        title: '이 제안을 삭제하시겠습니까?',
        description: '이 작업은 되돌릴 수 없습니다. 코치 제안이 영구적으로 삭제됩니다.',
        confirm: '삭제',
      },
      noSuggestions: {
        title: '아직 제안이 없습니다',
        description:
          '시작하려면 이 학생에 대한 첫 번째 제안을 생성하세요.',
      },
    },
    supportPlan: {
      title: '지원 계획',
      description:
        '이 학생의 발달을 지원하기 위한 다단계의 실행 가능한 계획을 생성합니다.',
      button: '새 계획 생성',
      generating: '계획 생성 중, 잠시만 기다려 주세요...',
      planGenerated: '{date}에 계획 생성됨',
      feedbackTitle: '교사 피드백',
      feedbackPlaceholder:
        '무엇이 효과가 있었나요? 무엇이 효과가 없었나요? 여러분의 피드백은 AI 학습에 도움이 됩니다...',
      toastDeleted: '지원 계획이 성공적으로 삭제되었습니다.',
      toastDeleteFailed: '지원 계획 삭제에 실패했습니다.',
      noPlans: {
        title: '아직 지원 계획이 없습니다',
        description:
          '시작하려면 이 학생에 대한 첫 번째 지원 계획을 생성하세요.',
      },
      stepDialog: {
        title: '지원 단계 평가',
        description: '이 단계는 어땠나요?',
        status: '상태',
        feedback: '단계 피드백 (선택 사항)',
        feedbackPlaceholder: '이 단계에 대한 메모 추가...',
        saveButton: '단계 평가 저장',
        statuses: {
          pending: '대기 중',
          achieved: '달성함',
          'partially-achieved': '부분적으로 달성함',
          'not-achieved': '달성하지 못함',
          discarded: '폐기됨',
        },
      },
      deleteDialog: {
        title: '이 계획을 삭제하시겠습니까?',
        description:
          '이 작업은 되돌릴 수 없습니다. 지원 계획이 영구적으로 삭제됩니다.',
        confirm: '삭제',
      },
    },
    moodAnalysis: {
      title: '기분 동향 분석',
      descriptionStudent:
        '다양한 과제에 대한 이 학생의 기분을 분석하여 패턴을 찾으세요.',
      descriptionClassroom:
        '전반적인 역학을 개선하기 위해 반 전체의 기분 동향에 대한 분석을 받으세요.',
      button: '동향 분석',
      buttonClassroom: '교실 동향 분석',
      analysisTitle: 'AI 기반 통찰력',
      noAnalyses: {
        title: '아직 분석 없음',
        descriptionStudent:
          '시작하려면 이 학생에 대한 첫 번째 기분 분석을 생성하세요.',
        descriptionClassroom:
          '시작하려면 교실에 대한 첫 번째 기분 분석을 생성하세요.',
      },
       toastDeleted: '분석이 성공적으로 삭제되었습니다.',
       toastDeleteFailed: '분석 삭제에 실패했습니다.',
       deleteDialog: {
        title: '이 분석을 삭제하시겠습니까?',
        description: '이 작업은 되돌릴 수 없습니다. 생성된 분석이 영구적으로 삭제됩니다.',
        confirm: '삭제',
      },
    },
    relationshipLab: {
      title: '사회적 역학 연구실',
      description: '학생 관계를 분석하고 개선하는 공간입니다.',
      button: '연구실 열기',
      tagline: '긍정적인 사회적 상호작용을 조율하세요.',
      tabs: {
        multiStudent: '동료 간',
        singleStudent: '개별',
      },
      form: {
        title: '관계 개선 전략 생성기',
        description: '긴장된 관계에 있는 학생들을 선택하여 맞춤형 개입 계획을 받으세요.',
        studentsLabel: '학생 선택 (2-4명)',
        studentsPlaceholder: '학생 선택...',
        focusLabel: '주요 목표 / 강화할 기술',
        focusPlaceholder: '예: 의사소통, 공감, 협력...',
        customPromptLabel: '사용자 지정 프롬프트 (선택 사항)',
        customPromptPlaceholder: '예: 비언어적 활동 만들기, 게임으로 만들기...',
        generateButton: '전략 생성',
      },
      individual: {
          form: {
              title: '개별 전략 생성기',
              description: '학생 한 명을 선택하여 그들이 반에 더 잘 통합되고 관계를 맺을 수 있도록 돕는 계획을 생성하세요.',
              studentsPlaceholder: '학생 선택...',
              generateButton: '통합 전략 생성'
          },
          history: {
              title: '개별 전략 내역',
              description: '이 학생을 위해 이전에 생성된 전략을 검토하세요.',
               prompt: {
                  title: '다리를 놓을 준비가 되셨나요?',
                  description: '학생을 선택하여 내역을 보거나 새로운 사회 통합 전략을 생성하세요.',
              },
          },
          toastSuccess: '통합 전략이 생성되었습니다!',
          toastDeleteSuccess: '전략이 성공적으로 삭제되었습니다.',
          toastDeleteFailed: '전략 삭제에 실패했습니다.',
          deleteDialog: {
              title: '이 전략을 삭제하시겠습니까?',
              description: '이 작업은 되돌릴 수 없으며 전략을 영구적으로 삭제합니다.',
              confirm: '삭제'
          }
      },
      suggestions: {
          button: 'AI로 제안하기',
          toastSuccess: '제안이 양식에 채워졌습니다!'
      },
       studentInfo: {
          title: "선택된 학생 프로필",
          qualities: '자질',
          fears: '두려움',
          none: '목록에 없음',
      },
      history: {
        title: '전략 내역',
        description: '선택한 학생들을 위해 이전에 생성된 전략을 검토하세요.',
        header: '{focus}을(를) 위한 전략',
        statusLabel: '전략 상태',
        statusPlaceholder: '상태 설정...',
        feedbackLabel: '교사 피드백',
        feedbackPlaceholder: '이 전략은 실제 어떻게 작동했나요?',
        saveFeedbackButton: '평가 저장',
        toastUpdateSuccess: '전략이 성공적으로 업데이트되었습니다!',
        toastUpdateFailed: '전략 업데이트에 실패했습니다.',
        prompt: {
            title: '개선할 준비가 되셨나요?',
            description: '양식에서 최소 두 명의 학생을 선택하여 내역을 보거나 새로운 전략을 생성하세요.',
        },
        noResults: {
            title: '아직 전략이 없습니다',
            description: '이 학생 그룹에 대한 첫 번째 전략을 생성하세요.',
        },
         stepDialog: {
            title: '개선 단계 평가',
            description: '이 단계는 어땠나요?',
            status: '상태',
            feedback: '단계 피드백 (선택 사항)',
            feedbackPlaceholder: '이 단계에 대한 메모 추가...',
            saveButton: '평가 저장',
            statuses: {
                pending: '대기 중',
                completed: '완료됨',
                skipped: '건너뜀',
            },
        },
      },
      details: {
          title: "'{focus}'에 대한 전략 세부 정보",
          adjustTitle: "전략 조정",
          adjustPlaceholder: "예: 더 간단하게 만들기, 그리기 구성 요소 추가, 비언어적 단서에 더 집중하기...",
          adjustButton: "조정된 전략 생성",
      },
      status: {
        'not_started': '시작되지 않음',
        'in_progress': '진행 중',
        'successful': '성공적',
        'partially_successful': '부분적으로 성공적',
        'did_not_work': '작동하지 않음',
        'needs_adjustment': '조정 필요',
      },
      toastSuccess: '개선 전략이 생성되었습니다!',
    },
    qualitiesSuggestion: {
      title: '자질 제안',
      description: '학생 성과를 바탕으로 새로운 자질을 발견하세요.',
      button: '자질 발견',
      suggestionText:
        '최근 성과를 바탕으로 AI가 다음과 같은 자질을 제안합니다:',
      noSuggestions: {
        title: '아직 자질 제안이 없습니다',
        description:
          '시작하려면 이 학생에 대한 첫 번째 자질 제안을 생성하세요.',
      },
      dialog: {
        title: '{name}에 대한 새로운 자질 제안',
        description:
          '최근 성과를 바탕으로 추가할 만한 몇 가지 자질입니다:',
        accept: '수락',
        reject: '거부',
        confirmation: '자질을 어떻게 업데이트하시겠습니까?',
        add: '새로 추가',
        replace: '기존 항목 교체',
        confirm: '업데이트 확인',
      },
    },
    concernAnalysis: {
      title: '우려 패턴 분석',
      description:
        'AI가 학생의 전체 기록을 분석하여 반복되는 부정적인 패턴을 찾습니다.',
      button: '우려 사항 분석',
      noAnalyses: {
        title: '우려 패턴이 감지되지 않았습니다',
        description:
          '잠재적인 반복 문제를 확인하기 위해 분석을 생성하세요.',
      },
    },
    fearManagement: {
      title: '두려움 관리 제안',
      description: '학생의 두려움을 돕기 위한 공감적인 전략을 생성하세요.',
      button: '전략 얻기',
      strategyFor: '전략 대상:',
      feedbackTitle: '어땠나요?',
      feedbackPlaceholder: '여러분의 피드백은 AI가 배우고 개선하는 데 도움이 됩니다...',
      toastFearUpdated: '학생 두려움 프로필이 업데이트되었습니다!',
      toastFearUpdateFailed: '학생 두려움 업데이트에 실패했습니다.',
      toastDeleted: '제안이 성공적으로 삭제되었습니다.',
      toastDeleteFailed: '제안 삭제에 실패했습니다.',
      noSuggestions: {
        title: '아직 전략이 없습니다',
        description: '이 학생이 두려움을 관리하는 데 도움이 될 전략을 생성하세요.',
        noFears: '이 학생에게는 등록된 두려움이 없습니다. 제안을 받으려면 프로필에 두려움을 추가하세요.',
      },
      updateDialog: {
        title: '학생 프로필을 업데이트하시겠습니까?',
        confirm: '예, 프로필 업데이트',
      },
      deleteDialog: {
        title: '이 제안을 삭제하시겠습니까?',
        description: '이 작업은 되돌릴 수 없습니다.',
        confirm: '삭제',
      },
      dialog: {
        title: '두려움 관리: {fear}',
        description: '{name}에 대한 기존 전략을 검토하거나 새 전략을 생성하세요.',
        generateButton: '새 제안 생성',
        noSuggestions: {
            title: '아직 전략이 없습니다',
            description: '이 두려움을 해결하기 위한 첫 번째 AI 제안을 생성하세요.'
        }
      }
    }
} as const;
