
export default {
    title: 'プレイグラウンド',
    tagline: 'AIと一緒に楽しくて教育的なゲームに参加しよう。',
    riddleBattle: {
        title: 'なぞなぞバトル',
        description: '2つのチームが解くなぞなぞのペアを生成します。どちらが速いかな？',
        topicLabel: 'なぞなぞのトピック（任意）',
        topicPlaceholder: '例：動物、宇宙、歴史',
        button: '新しいバトルを開始',
        battleTitle: 'なぞなぞバトル！',
        topic: 'トピック',
        teamBlue: '青チーム',
        teamRed: '赤チーム',
        showAnswer: '答えを表示',
        hideAnswer: '答えを隠す',
        toastDeleted: 'バトルを削除しました。',
        toastDeleteFailed: 'バトルの削除に失敗しました。',
        toastEvaluationSaved: '評価を保存しました。',
        toastEvaluationFailed: '評価の保存に失敗しました。',
        noBattles: {
            title: '挑戦の準備はいいですか？',
            description: '上のボタンをクリックして、最初のなぞなぞバトルを開始します。',
        },
        deleteDialog: {
            title: 'このバトルを削除しますか？',
            description: 'この操作は永続的で、元に戻すことはできません。',
        },
        evaluation: {
            title: '評価',
            winner: '勝者',
            winnerLabel: '勝者を宣言',
            winnerPlaceholder: '勝者を選択...',
            tie: '引き分け',
            moodLabel: '競争の雰囲気',
            moodPlaceholder: '雰囲気を選択...',
            feedbackLabel: 'フィードバック',
            feedbackPlaceholder: 'ゲームはどうでしたか？公平でしたか？',
            moods: {
                competitive: '競争的',
                fun: '楽しい',
                collaborative: '協力的',
                tense: '緊張した',
                relaxed: 'リラックスした',
            },
            confirm: '確認'
        }
    },
    lightningRound: {
        title: 'ライトニングラウンド',
        description: '教室を活気づける楽しいチャレンジのある、ペースの速いゲーム。',
        durationLabel: 'ラウンド時間（秒）',
        intervalLabel: 'チャレンジ間隔（秒）',
        categoryLabel: 'チャレンジカテゴリ',
        start: 'ライトニングラウンドを開始！',
        pause: '一時停止',
        resume: '再開',
        reset: 'リセット',
        noStudentsError: 'プレイするには少なくとも2人の出席生徒が必要です。',
        toastDeleted: 'ラウンドを削除しました。',
        toastDeleteFailed: 'ラウンドの削除に失敗しました。',
        categories: {
            sound: '音',
            face: '顔',
            gesture: 'ジェスチャー',
            imitation: '模倣',
        },
        gameScreen: {
            yourTurn: 'あなたの番です！',
        },
        history: {
            title: 'ラウンド履歴',
            description: '以前に生成されたラウンドを確認します。',
            roundFor: '{date}からのラウンド',
            noRounds: 'まだラウンドはプレイされていません。',
        },
        deleteDialog: {
            title: 'このラウンドを削除しますか？',
            description: 'この操作は永続的で、元に戻すことはできません。',
        },
    },
    collaborativeStory: {
        title: '共同物語作り',
        setup: {
            title: '新しい物語を始める',
            description: '冒険を始めるためにキャラクターと設定を定義します。',
            charactersLabel: '主な登場人物',
            charactersPlaceholder: '例：勇敢な騎士、賢いドラゴン',
            settingLabel: '初期設定',
            settingPlaceholder: '例：暗くて不気味な洞窟',
            lengthLabel: '章の長さ',
            lengths: {
                short: '短い',
                medium: '普通',
                long: '長い',
            },
            startButton: '物語を開始',
            allowDialogues: '物語に会話を許可する',
            narratorVoiceLabel: "ナレーターの声",
            narratorVoicePlaceholder: "声を選択...",
            customPromptLabel: "カスタムプロンプト（任意）",
            customPromptPlaceholder: "例：物語はコメディでなければならず、暴力を含んではいけません...",
            negativePromptLabel: "ネガティブプロンプト（任意）",
            negativePromptPlaceholder: "例：悲しい結末を避ける、クモに言及しない...",
        },
        contribute: {
            title: '次に何が起こる？',
            description: '次の章のために生徒のアイデアを追加します。',
            placeholder: '生徒のアイデアを書いてエンターキーを押してください...',
            continueButton: '物語を続ける',
            suggestionButton: 'AIの提案'
        },
        story: {
            titlePlaceholder: '物語はここに表示されます',
            storyPlaceholder: 'まずキャラクターと設定を定義して、物語を始めましょう！',
        },
        history: {
            title: '物語の履歴',
            createdAt: '作成日',
            noStories: 'まだ物語はありません。',
        },
        deleteDialog: {
            title: 'この物語を削除しますか？',
            description: 'この操作は永続的で、元に戻すことはできません。',
        },
        toastDeleted: '物語を削除しました。',
        toastDeleteFailed: '物語の削除に失敗しました。',
        toastNarrationSuccess: '物語全体のナレーションが生成されており、間もなく表示されます。',
        newStoryButton: '新しい物語を始める',
        narrateButton: '章をナレーション',
        'narrateButton--loading': 'ナレーション中...',
        narrateFullStoryButton: 'オーディオブックとしてナレーション',
        suggestions: {
            button: 'AIで提案',
            toastSuccess: 'アイデアが提案されました！'
        },
        finishButton: '物語を終える',
        test: {
            createButton: '物語からテストを作成',
            modalTitle: 'テストを生成',
            modalDescription: 'この物語から生成したいテストの種類を選択してください。',
            typeLabel: 'テストの種類',
            types: {
                title: 'テストの種類',
                'multiple-choice': '多肢選択',
                'true-false': '正誤問題',
                'open-ended': '自由回答問題',
                'mixed': '混合',
            },
            generateButton: 'テストを生成',
            generateError: 'テストの生成に失敗しました。',
            saveSuccess: 'テストが正常に保存されました！',
            saveError: 'テストの保存に失敗しました。',
            previewTitle: '生成されたテストのプレビュー',
            previewDescription: '生成されたテストを確認してください。すでに保存されており、テストページで表示できます。',
            rubricTitle: '評価ルーブリック',
            saveButton: 'テストを保存',
        },
        illustrateButton: 'イラストを描く',
    },
    debateGenerator: {
        title: 'ディベートジェネレーター',
        description: '批判的思考を促すための教育的なディベートシナリオを生成します。',
        topicLabel: 'ディベートのトピック',
        topicPlaceholder: '例：動物は動物園で飼うべきか？',
        complexityLabel: '複雑さ',
        complexities: {
            beginner: '初心者',
            intermediate: '中級者',
            advanced: '上級者'
        },
        button: '新しいディベートを生成',
        noDebates: {
            title: '議論の準備はできましたか？',
            description: 'トピックと複雑さを入力して、最初のディベートシナリオを生成します。',
        },
        affirmativeStance: '肯定的な立場',
        negativeStance: '否定的な立場',
        guidingQuestions: 'ガイドとなる質問',
        rules: 'ディベートのルール',
        toastDeleted: 'ディベートを削除しました。',
        toastDeleteFailed: 'ディベートの削除に失敗しました。',
        deleteDialog: {
            title: 'このディベートを削除しますか？',
            description: 'この操作は永続的で、元に戻すことはできません。',
        },
        startSession: "ライブセッションを開始",
        manageSession: "セッションを管理",
        turnStructureTitle: "ディベートのターン構造",
        currentTurn: "現在のターン",
        notStarted: "ディベートはまだ始まっていません",
        paused: "ディベート一時停止中",
        start: "ディベートを開始",
        nextTurn: "次のターン",
        pause: "一時停止",
        resume: "再開",
        liveSession: {
            title: "ディベートセッション進行中",
            description: "このQRコードまたはリンクを生徒と共有してディベートを開始します。",
            qrCode: "QRコード",
            link: "直接リンク",
            copy: "コピー",
            copied: "コピーしました！",
            studentsConnected: "接続中の生徒",
            noStudentsYet: "まだ接続している生徒はいません。",
            affirmative: '賛成',
            negative: '反対',
            unassigned: '未割り当て',
            both: '両方',
            teacher: '先生',
            closeSession: "セッションを閉じる",
            sessionClosed: "セッションが閉じられました。"
        }
    },
    digitalConviviality: {
        title: 'デジタル市民性',
        description: 'ポジティブで責任感のあるオンライン行動を促すためのツール。',
        activities: {
            title: '活動',
            description: 'デジタル市民性のスキルを練習するための活動を生成します。',
        },
        conflictSimulation: {
            title: '紛争シミュレーション',
            description: '仮説的な紛争シナリオを生成して、困難なオンライン状況への対応を練習します。',
            topicsLabel: '紛争のトピック（任意）',
            topicsPlaceholder: '例：サイバーブリング、誤報、盗作',
            button: 'シナリオを生成',
            scenarioTitle: '生成されたシナリオ',
            strategiesTitle: '介入戦略',
            strategyLabel: '戦略',
            outcomeLabel: 'シミュレーション結果',
            noScenario: {
                title: '練習の準備はできましたか？',
                description: '紛争解決スキルを練習するためのシナリオを生成します。',
            },
            deleteDialog: {
                title: 'このシナリオを削除しますか？',
                description: 'これにより、この紛争シナリオが履歴から永久に削除されます。',
                confirm: '削除',
            },
            history: {
                title: 'シナリオ履歴'
            }
        },
        pact: {
            title: 'デジタル協定',
            description: '健全なデジタルインタラクションのための一連のクラスルールを共同で生成します。',
            studentCountLabel: '生徒数',
            mainConcernsLabel: '主な懸念事項（任意）',
            mainConcernsPlaceholder: '例：ソーシャルメディアの使用、プライバシーの尊重',
            button: '協定草案を生成',
            saveDraftButton: '下書きを保存',
            publishButton: '公開',
            republishButton: '再公開',
            publishedAt: '{date}に公開（v{version}）',
            noPacts: {
                title: '協定を結ぶ準備はできましたか？',
                description: 'クラスのパラメータを設定し、デジタル共存協定の草案を生成します。'
            },
            deleteDialog: {
                title: 'この協定を削除しますか？',
                description: 'これにより、生成された協定が永久に削除されます。',
                confirm: '削除'
            },
            history: {
                title: '協定履歴',
                principles: '指導原則',
                norms: '特定の規範',
                consequences: '修復的結果',
                level: 'レベル',
                restorativeAction: '修復的行動'
            }
        },
        typeLabel: '活動の種類',
        typePlaceholder: '種類を選択...',
        types: {
            'netiquette-challenge': 'ネチケットチャレンジ',
            'digital-collaboration': 'デジタルコラボレーションゲーム',
            'positive-messaging': 'ポジティブメッセージングリライター'
        },
        customPromptLabel: '特定の焦点（任意）',
        customPromptPlaceholder: '例：ソーシャルメディアのコメントに焦点を当てる...',
        button: '活動を生成',
        history: {
            title: '活動履歴',
            studentInstructions: '生徒への指示',
            pedagogicalObjectives: '教育目標',
            materials: '教材',
            noMaterials: '教材は提供されていません。',
            steps: '手順',
        },
        noActivities: {
            title: '良いデジタル習慣を促進する準備はできましたか？',
            description: '最初のデジタル市民性演習を生成するために、上の活動の種類を選択してください。'
        },
        deleteDialog: {
            title: 'この活動を削除しますか？',
            description: 'この操作は永続的で、元に戻すことはできません。',
            confirm: '削除'
        }
    },
    suggestions: {
        button: 'AIで提案',
        toastSuccess: 'トピックが提案されました！'
    }
} as const;
    
