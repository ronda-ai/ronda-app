export default {
    title: '個別活動',
    tagline: '特定の生徒のためにパーソナライズされた活動をデザインします。',
    step0: {
        title: '生徒を選択',
        description: 'パーソナライズされた活動の生成を開始する生徒を選択してください。',
    },
    step1: {
      selectLabel: '生徒',
      selectPlaceholder: '生徒を選択...',
    },
    generator: {
        title: '{name}のための活動ジェネレーター',
        description: '活動のパラメータを定義するか、AIを使ってアイデアを提案させます。',
        topicLabel: '学術トピック',
        topicPlaceholder: '例：分数、光合成',
        skillsLabel: '開発するスキル',
        skillsPlaceholder: '例：批判的思考、協同作業',
        themesLabel: 'エンゲージメントテーマ',
        themesPlaceholder: '例：宇宙、恐竜、ミステリー',
        customPromptLabel: 'カスタムプロンプト（任意）',
        customPromptPlaceholder: '例：視覚要素に焦点を当てる、実践的な活動にする',
        negativePromptLabel: 'ネガティブプロンプト（任意）',
        negativePromptPlaceholder: '例：筆記作業を避ける、クモに言及しない',
        generateButton: 'アクティビティを生成',
        toastSuccess: 'アクティビティが正常に生成されました！',
        noSkills: 'まだ利用可能なスキルはありません。',
        addSkills: '新しいスキルを追加'
    },
    suggestions: {
        button: 'AIで提案',
        toastSuccess: '提案が入力されました！',
    },
    history: {
        title: "活動計画履歴",
        description: "{name}のために以前に生成された活動計画を確認および管理します。",
        toastDeleted: '活動計画を削除しました。',
        toastDeleteFailed: '活動計画の削除に失敗しました。',
        noResults: {
            title: "まだ活動計画はありません",
            description: "この生徒の最初の計画を生成して、ここに履歴を表示します。"
        },
        deleteDialog: {
            title: "この活動計画を削除しますか？",
            description: "この操作は元に戻せません。これにより、活動計画が永久に削除されます。",
        },
        stepDialog: {
            title: '活動ステップを評価',
            description: 'この活動はどうでしたか？',
            status: 'ステータス',
            feedback: 'ステップのフィードバック（任意）',
            feedbackPlaceholder: 'この活動に関するメモを追加...',
            saveButton: '評価を保存',
            statuses: {
                pending: '保留中',
                'in-progress': '進行中',
                completed: '完了',
                skipped: 'スキップ'
            },
        },
    },
    democratizer: {
      title: 'リソース民主化ツール',
      descriptionSingle: 'この活動をよりアクセスしやすくするために適応させます。',
      descriptionAll: 'この計画内のすべての活動を、さまざまなニーズやリソースの制約に応じてよりアクセスしやすくするために適応させます。',
      descriptionSelected: 'この計画で選択された{count}個の活動を、よりアクセスしやすくするために適応させます。',
      prompt: '活動に適用する適応オプションを選択してください。',
      selectPlaceholder: '適応を選択...',
      activitiesToAdapt: "適応する活動：",
      adaptButton: '活動を適応させる',
      toastSuccess: '活動が正常に適応されました！',
      options: {
        commonMaterials: '一般的な家庭用品に適応',
        lowEnergy: '低エネルギー/静かなシナリオに適応',
        socialInteraction: '社会的相互作用の要素を増やす',
        simpleInstructions: '指示を簡素化する',
      },
    }
} as const;
