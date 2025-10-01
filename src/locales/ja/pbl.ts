
export default {
    title: 'PBLラボ',
    tagline: '単一のアイデアから複雑なプロジェクトを編成します。',
    tabs: {
        phase1: 'フェーズ1：計画',
        phase2: 'フェーズ2：チーム',
        phase3: 'フェーズ3：開発',
        phase4: 'フェーズ4：評価',
    },
    phase1: {
        form: {
            title: 'フェーズ1：プロジェクトプランナー',
            description: '中心的なトピックを定義し、AIに構造化されたプロジェクト計画を構築させます。',
            topicLabel: '中心的なプロジェクトトピック',
            topicPlaceholder: '例：私たちの都市の気候変動、ビデオゲームの歴史...',
            skillsLabel: '開発する主要なスキル',
            noSkills: 'まだスキルが定義されていません。アクティビティジェネレーターに移動して追加してください。',
            durationLabel: '推定期間',
            durations: {
                'oneWeek': '1週間',
                'twoWeeks': '2週間',
                'oneMonth': '1ヶ月',
            },
            generateButton: 'プロジェクト計画を生成'
        },
        generating: {
            title: 'プロジェクト計画を生成中...'
        },
    },
    phase2: {
        title: 'フェーズ2：チーム編成',
        description: 'AIを使用して、生徒のプロフィールと関係に基づいて戦略的なグループを編成します。',
        selectProject: 'プロジェクトを選択',
        selectProjectPlaceholder: 'チームを編成するプロジェクトを選択...',
        teamSize: 'チームのサイズ',
        groupingCriteria: 'グループ化の基準',
        criteria: {
            balanced: 'バランスの取れたチーム',
            'social-remediation': '社会的修復',
            synergy: '興味の相乗効果',
        },
        generateButton: 'チームを生成',
        noProjectSelected: 'まずプロジェクトを選択してください。',
        results: {
            title: '提案されたチーム',
            teamName: 'チーム{name}',
            rationale: 'チームの理論的根拠',
            formation: '編成',
            deleteDialog: {
                title: 'このチーム編成を削除しますか？',
                description: 'この操作は元に戻せません。これにより、チーム編成が永久に削除されます。',
            },
        },
        table: {
            student: '生徒',
            suggestedRole: '提案された役割',
            justification: '理由',
        }
    },
    phase3: {
        title: 'フェーズ3：オンザフライのスキャフォールディング',
        description: 'プロジェクト開発中に課題に直面しているチームのための迅速な介入計画を生成します。',
        selectTeam: '介入するチーム',
        selectTeamPlaceholder: '生徒を選択...',
        problemLabel: '問題を説明',
        problemPlaceholder: '例：チームが行き詰まっている、対立がある、生徒がやる気がない...',
        generateButton: '介入を生成',
        suggestionTitle: '提案された介入',
        microActivity: 'ブロックを解除するためのマイクロアクティビティ',
        guidingQuestions: '教師のためのガイダンス質問',
        noSuggestion: '生成された介入計画はここに表示されます。',
    },
    phase4: {
        title: 'フェーズ4：ルーブリックジェネレーター',
        description: 'プロジェクトの最終成果物のための詳細な評価ルーブリックを生成します。',
        generateButton: 'ルーブリックを生成',
        rubricTitle: '提案された評価ルーブリック',
        noRubric: '生成されたルーブリックはここに表示されます。',
    },
    history: {
        title: 'プロジェクト履歴',
        description: '以前に生成されたプロジェクトを確認および管理します。',
        noResults: {
            title: 'まだプロジェクトはありません',
            description: 'フォームを使用して、最初のプロジェクトベースの学習計画を生成します。'
        },
        phases: 'プロジェクトのフェーズ',
        milestones: '主要なマイルストーン',
        finalProduct: '最終成果物の提案',
        deleteDialog: {
            title: 'このプロジェクト計画を削除しますか？',
            description: 'この操作は元に戻せません。これにより、プロジェクト計画が永久に削除されます。',
        },
    },
} as const;
