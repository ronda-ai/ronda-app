export default {
    title: '데이터 내보내기',
    tagline: '다양한 형식으로 교실 데이터를 다운로드하세요.',
    exportData: '데이터 내보내기',
    exportDescription:
      '내보낼 데이터 유형과 형식을 선택하세요.',
    dataType: '내보낼 데이터',
    dataTypePlaceholder: '데이터 유형 선택...',
    format: '내보내기 형식',
    formatPlaceholder: '형식 선택...',
    exportButton: '생성 및 다운로드',
    toastSuccess: '내보내기가 성공적으로 시작되었습니다!',
    toastError: '데이터 내보내기에 실패했습니다. 다시 시도해 주세요.',
    dataTypes: {
      students: '학생 명단',
      attendance: '출석 기록',
      evaluations: '과제 평가',
    },
    filtersTitle: '필터(선택 사항)',
    studentFilter: '학생으로 필터링',
    studentPlaceholder: '모든 학생',
    dateFilter: '날짜로 필터링',
    noStudents: '학생을 찾을 수 없습니다'
} as const;
