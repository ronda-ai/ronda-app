export default {
    classRoster: '라운드',
    viewOnGitHub: 'GitHub에서 보기',
    tagline: '수업 참여를 장려하는 재미있는 방법입니다.',
    yearsOld: '세',
    aiConfig: {
      title: '챌린지 구성',
      challengeConfigDescription: 'AI가 생성하는 다음 챌린지의 맥락을 설정하세요.',
      ageOrGrade: '나이 또는 학년',
      ageOrGradePlaceholder: '예: 8세, 3학년',
      country: '국가',
      countryPlaceholder: '예: 미국, 칠레',
      customPrompt: '사용자 지정 프롬프트',
      customPromptPlaceholder: '예: 협업에 중점',
      negativePrompt: '부정적 프롬프트',
      negativePromptPlaceholder: '예: 수학 문제 피하기',
      subject: '과목',
      subjectPlaceholder: '과목 선택',
      spotlight: {
        title: '스포트라이트',
        atDesk: '아늑한 코너',
        inFront: '중앙 무대',
        doesNotMatter: "상관 없음",
      },
      model: {
        title: 'AI 모델',
        placeholder: '모델 선택...',
        customPlaceholder: '사용자 지정 모델'
      },
      ollamaBaseUrl: {
        title: 'Ollama 기본 URL',
        placeholder: '예: http://localhost:11434'
      },
      saveButton: '구성 저장',
      toastSaved: 'AI 구성이 저장되었습니다!',
      toastError: 'AI 구성 저장에 실패했습니다.',
      plugin: {
        title: '플러그인',
        placeholder: '플러그인 선택...',
      }
    },
  } as const;
