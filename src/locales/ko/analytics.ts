export default {
    title: '분석',
    tagline: '학생 출석 및 참여도를 시각화합니다.',
    filters: {
      title: '필터',
      dateRange: '날짜 범위',
      student: '학생',
      allStudents: '모든 학생',
      studentPlaceholder: '학생 선택...',
      noStudents: '학생을 찾을 수 없습니다'
    },
    charts: {
      attendance: {
        title: '출석 동향',
        description: '시간에 따른 출석 학생 대 결석 학생 수.',
      },
      participation: {
        title: '참여 분포',
        description:
          '선택한 범위 내 각 학생의 총 참여 횟수.',
        legend: '참여 횟수'
      },
    },
} as const;
