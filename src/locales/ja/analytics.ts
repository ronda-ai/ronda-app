export default {
    title: '分析',
    tagline: '生徒の出席状況と参加状況を可視化します。',
    filters: {
      title: 'フィルター',
      dateRange: '日付範囲',
      student: '生徒',
      allStudents: 'すべての生徒',
      studentPlaceholder: '生徒を選択...',
      noStudents: '生徒が見つかりません'
    },
    charts: {
      attendance: {
        title: '出席傾向',
        description: '時間経過に伴う出席生徒と欠席生徒の数。',
      },
      participation: {
        title: '参加分布',
        description:
          '選択した範囲内の各生徒の総参加回数。',
        legend: '参加回数'
      },
    },
} as const;
