export default {
    title: 'データのエクスポート',
    tagline: '教室のデータをさまざまな形式でダウンロードします。',
    exportData: 'データのエクスポート',
    exportDescription:
      'エクスポートしたいデータの種類と形式を選択してください。',
    dataType: 'エクスポートするデータ',
    dataTypePlaceholder: 'データタイプを選択...',
    format: 'エクスポート形式',
    formatPlaceholder: '形式を選択...',
    exportButton: '生成してダウンロード',
    toastSuccess: 'エクスポートが正常に開始されました！',
    toastError: 'データのエクスポートに失敗しました。もう一度お試しください。',
    dataTypes: {
      students: '生徒名簿',
      attendance: '出席履歴',
      evaluations: '挑戦の評価',
    },
    filtersTitle: 'フィルター（任意）',
    studentFilter: '生徒でフィルター',
    studentPlaceholder: 'すべての生徒',
    dateFilter: '日付でフィルター',
    noStudents: '生徒が見つかりません'
} as const;
