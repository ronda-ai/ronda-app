
export default {
    title: 'ツール',
    tagline: 'AIツールを使って授業を強化しましょう。',
    activityAdapter: {
      title: '活動アダプター',
      description: '既存の活動を、特定の生徒やグループ全体のニーズに合わせて調整します。',
      placeholder: 'ここに適応させたい活動を貼り付けるか、記述してください...',
      activityLabel: '適応する活動',
      existingActivityLabel: '既存の活動またはテストを選択',
      existingActivityPlaceholder: '要約して適応させる活動/テストを選択...',
      studentLabel: '特定の生徒に適応（任意）',
      studentPlaceholder: '生徒を選択...',
      customPromptLabel: '適応の具体的な目標（任意）',
      customPromptPlaceholder: '例：ゲームにする、ライティングに焦点を当てる...',
      button: '活動を適応させる',
      generatingTitle: '適応案を生成中...',
      activityType: '活動'
    },
     rubricGenerator: {
      title: 'ルーブリックジェネレーター',
      description: 'あらゆる活動に対して公正でバランスの取れた評価ルーブリックを作成します。',
      placeholder: 'ルーブリックを生成する活動を記述してください...',
      button: 'ルーブリックを生成',
      testType: 'テスト'
    },
    history: {
      title: '履歴',
      descriptionAdapter: '以前に適応させた活動を確認します。',
      descriptionRubric: '以前に生成されたルーブリックを確認します。',
      reasoning: '理由',
      criterion: '基準',
      excellent: '優秀',
      satisfactory: '満足',
      needsImprovement: '改善が必要',
      scoringGuide: '採点ガイド',
      toastDeleteSuccess: '正常に削除されました。',
      toastDeleteFailed: '削除に失敗しました。',
      noResults: {
        title: 'まだ結果はありません',
        description: '左側のツールを使用して、最初の結果を生成してください。',
      },
      deleteDialogAdapter: {
          title: 'この適応を削除しますか？',
          description: 'この操作は元に戻せません。これにより、活動の適応が永久に削除されます。',
          confirm: '削除'
      },
      deleteDialogRubric: {
          title: 'このルーブリックを削除しますか？',
          description: 'この操作は元に戻せません。これにより、生成されたルーブリックが永久に削除されます。',
          confirm: '削除'
      }
    }
} as const;
