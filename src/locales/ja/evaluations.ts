export default {
    title: '評価',
    tagline: '生徒の参加状況を確認し、評価します。',
    evaluateButton: '評価する',
    evaluatedStatus: '評価済み',
    rejectedStatus: '拒否されました',
    noChallenges: 'この生徒にはまだ挑戦が記録されていません。',
    noEvaluations: {
      title: 'まだ評価はありません',
      description:
        '生徒が挑戦を受け入れたら、ここで評価できます。',
    },
    evaluationDialog: {
      title: '挑戦を評価',
      forStudent: '{name}のために',
      challenge: '挑戦',
      rating: '評価',
      feedback: 'フィードバック',
      feedbackPlaceholder: 'ここにフィードバックを入力してください...',
      saveButton: '評価を保存',
      mood: '生徒の気分',
    },
    ratings: {
      needsSupport: 'サポートが必要',
      metExpectations: '期待通り',
      exceededExpectations: '期待以上',
    },
    moods: {
      enthusiastic: '熱狂的',
      focused: '集中している',
      nervous: '緊張している',
      frustrated: '不満',
      happy: '幸せ',
      tired: '疲れている',
    },
    pagination: {
        previous: '前へ',
        next: '次へ',
        page: 'ページ {currentPage}/{totalPages}',
    }
} as const;
