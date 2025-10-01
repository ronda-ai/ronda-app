export default {
    selectionMode: '선택 모드',
    readyToSpin: '돌릴 준비가 되셨나요?',
    readyToSelect: '선택할 준비가 되셨나요?',
    spinTheWheel: '룰렛 돌리기!',
    selectStudent: '학생 선택',
    selectStudentSingular: '학생 선택',
    spinning: '돌리는 중...',
    modes: {
      random: '무작위',
      weighted: '가중치 AI',
      lightning: '라이트닝 라운드',
      pair: '파워 듀오',
      personalizedIndividual: '개인 맞춤',
      personalizedMultiple: '다수 맞춤',
    },
    modeDescriptions: {
      random: '완전히 무작위로 한 명의 학생을 선택합니다.',
      weighted:
        '참여가 적었던 학생에게 더 높은 기회를 주어 AI가 학생을 선택합니다.',
      lightning: '무작위로 선택된 학생을 위한 빠르고 간단한 도전 과제입니다.',
      pair: '두 명의 학생을 무작위로 선택하여 도전 과제에 협력하도록 합니다.',
      personalizedIndividual:
        '고도로 개인화된 도전 과제를 위해 수동으로 한 명의 학생을 선택합니다.',
      personalizedMultiple:
        '협력적인 개인화 도전 과제를 위해 수동으로 최대 세 명의 학생을 선택합니다.',
    },
} as const;
