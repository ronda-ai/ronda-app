
export default {
      title: '언어 지원',
      tagline: '언어 포용을 지원하기 위해 이중 언어 자료를 생성합니다.',
      form: {
          title: '언어 포용 도우미',
          description: '학생을 선택하고 그들의 언어를 지정하여 맞춤형 지원 자료를 생성합니다.',
          studentLabel: '학생',
          studentPlaceholder: '학생 선택...',
          languageLabel: "학생의 모국어",
          languagePlaceholder: '예: 스페인어, 프랑스어, 중국어',
          focusAreasLabel: '중점 분야',
          generateButton: '지원 자료 생성',
      },
      focusAreas: {
          reading: '독해력',
          writing: '작문 능력',
          speaking: '구술 표현',
          listening: '청해력',
          'social-emotional': '사회-정서적 통합',
      },
      addFocusAreaDialog: {
        title: '새 중점 분야 추가',
        description: 'AI 제안에서 선택하거나 목록에 자신의 중점 분야를 추가하세요.',
        customPromptLabel: 'AI 가이드 (선택 사항)',
        customPromptPlaceholder: '예: 듣기 분야에 집중...',
        manualAreaLabel: '또는 수동으로 분야 추가',
        manualAreaPlaceholder: '새 분야 입력...',
        noSuggestions: '사용 가능한 제안이 없습니다. 프롬프트를 새로 고치거나 변경해 보세요.',
        add: '추가:',
        addSelected: '선택 항목 추가',
        toastSuccess: '중점 분야가 성공적으로 추가되었습니다!',
        toastError: '중점 분야 추가에 실패했습니다.',
      },
      editFocusAreaDialog: {
        title: '중점 분야 편집: {name}',
        areaNameLabel: '중점 분야 이름',
        deleteButton: '분야 삭제',
        toastUpdateSuccess: '중점 분야가 성공적으로 업데이트되었습니다!',
        toastUpdateError: '중점 분야 업데이트에 실패했습니다.',
        toastDeleteSuccess: '중점 분야가 성공적으로 삭제되었습니다!',
        toastDeleteError: '중점 분야 삭제에 실패했습니다.',
        deleteDialog: {
            title: '확실합니까?',
            description: '이 작업은 목록에서 중점 분야 "{name}"을(를) 영구적으로 삭제합니다.',
            cancel: '취소',
            confirm: '삭제'
        }
      },
      generatingTitle: '지원 자료 생성 중...',
      history: {
          title: '생성된 자료 내역',
          description: '선택한 학생을 위해 이전에 생성된 자료를 검토합니다.',
          selectStudentPrompt: {
            title: '학생 선택',
            description: '양식에서 학생을 선택하여 내역을 보고 새 자료를 생성하세요.',
          },
          noResults: {
              title: '아직 자료 없음',
              description: '양식을 사용하여 이 학생을 위한 첫 번째 지원 자료를 생성하세요.',
          },
          header: '{language}용 자료',
          teacherGuide: '교사 안내서',
          studentMaterial: '학생 자료',
          feedbackTitle: "교사 피드백",
          feedbackPlaceholder: '이 자료가 유용했나요? 여러분의 피드백은 향후 제안을 개선하는 데 도움이 됩니다.',
          toastDeleted: '지원 자료가 삭제되었습니다.',
          toastDeleteFailed: '지원 자료 삭제에 실패했습니다.',
          deleteDialog: {
            title: '이 자료를 삭제하시겠습니까?',
            description: '이 작업은 되돌릴 수 없습니다. 생성된 지원 자료가 영구적으로 삭제됩니다.',
          },
          translationTitle: "{language} 번역",
          showTranslation: "번역 보기",
          hideTranslation: "번역 숨기기",
      }
} as const;
