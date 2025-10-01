export default {
    title: 'AIコーチ',
    tagline: 'AIによる洞察と提案を得ましょう。',
    noStudentSelected: {
      title: '生徒を選択してください',
      description:
        'リストから生徒を選択して、分析を表示し、提案を受け取ります。',
    },
    tabs: {
        classroom: 'クラス分析',
        individual: '個別分析'
    },
    coachSuggestion: {
      title: 'コーチの提案',
      description:
        '生徒のプロフィールとパフォーマンスに基づいて、この生徒にパーソナライズされた提案を生成します。',
      button: '提案を取得',
      toastDeleted: '提案を正常に削除しました。',
      toastDeleteFailed: '提案の削除に失敗しました。',
      deleteDialog: {
        title: 'この提案を削除しますか？',
        description: 'この操作は元に戻せません。これにより、コーチの提案が永久に削除されます。',
        confirm: '削除',
      },
      noSuggestions: {
        title: 'まだ提案はありません',
        description:
          'この生徒の最初の提案を生成して開始します。',
      },
    },
    supportPlan: {
      title: 'サポートプラン',
      description:
        'この生徒の成長を支援するための多段階で実行可能な計画を生成します。',
      button: '新しいプランを生成',
      generating: 'プランを生成中です、お待ちください...',
      planGenerated: '{date}にプランが生成されました',
      feedbackTitle: "教師のフィードバック",
      feedbackPlaceholder:
        '何がうまくいきましたか？何がうまくいかなかったですか？あなたのフィードバックはAIの学習に役立ちます...',
      toastDeleted: 'サポートプランを正常に削除しました。',
      toastDeleteFailed: 'サポートプランの削除に失敗しました。',
      noPlans: {
        title: 'まだサポートプランはありません',
        description:
          'この生徒の最初のサポートプランを生成して開始します。',
      },
      stepDialog: {
        title: 'サポートステップを評価',
        description: 'このステップはどうでしたか？',
        status: 'ステータス',
        feedback: 'ステップのフィードバック（任意）',
        feedbackPlaceholder: 'このステップに関するメモを追加...',
        saveButton: 'ステップ評価を保存',
        statuses: {
          pending: '保留中',
          achieved: '達成済み',
          'partially-achieved': '部分的に達成',
          'not-achieved': '未達成',
          discarded: '破棄',
        },
      },
      deleteDialog: {
        title: 'このプランを削除してもよろしいですか？',
        description:
          'この操作は元に戻せません。これにより、サポートプランが永久に削除されます。',
        confirm: '削除',
      },
    },
    moodAnalysis: {
      title: '気分傾向分析',
      descriptionStudent:
        'この生徒のさまざまな課題に対する気分を分析し、パターンを見つけます。',
      descriptionClassroom:
        '全体的なダイナミクスを改善するために、クラス全体の気分傾向の分析を取得します。',
      button: '傾向を分析',
      buttonClassroom: '教室の傾向を分析',
      analysisTitle: 'AIによる洞察',
      noAnalyses: {
        title: 'まだ分析はありません',
        descriptionStudent:
          'この生徒の最初の気分分析を生成して開始します。',
        descriptionClassroom:
          '教室の最初の気分分析を生成して開始します。',
      },
       toastDeleted: '分析を正常に削除しました。',
       toastDeleteFailed: '分析の削除に失敗しました。',
       deleteDialog: {
        title: 'この分析を削除しますか？',
        description: 'この操作は元に戻せません。これにより、生成された分析が永久に削除されます。',
        confirm: '削除',
      },
    },
    relationshipLab: {
      title: '社会力学ラボ',
      description: '生徒間の関係を分析し、改善するためのスペース。',
      button: 'ラボを開く',
      tagline: 'ポジティブな社会的相互作用を演出しよう。',
      tabs: {
        multiStudent: 'ピアツーピア',
        singleStudent: '個別',
      },
      form: {
        title: '関係修復戦略ジェネレーター',
        description: '緊張した関係にある生徒を選択して、カスタムの介入計画を受け取ります。',
        studentsLabel: '生徒を選択（2〜4名）',
        studentsPlaceholder: '生徒を選択...',
        focusLabel: '主な目標/強化するスキル',
        focusPlaceholder: '例：コミュニケーション、共感、協力...',
        customPromptLabel: 'カスタムプロンプト（任意）',
        customPromptPlaceholder: '例：非言語活動を作成する、ゲームにする...',
        generateButton: '戦略を生成',
      },
      individual: {
          form: {
              title: '個別戦略ジェネレーター',
              description: '一人の生徒を選択して、クラスにより良く統合し、関係を築くのを助ける計画を生成します。',
              studentsPlaceholder: '生徒を選択...',
              generateButton: '統合戦略を生成'
          },
          history: {
              title: '個別戦略履歴',
              description: 'この生徒のために以前に生成された戦略を確認します。',
               prompt: {
                  title: '橋を架ける準備はできましたか？',
                  description: '生徒を選択して、その履歴を表示するか、新しい社会的統合戦略を生成します。',
              },
          },
          toastSuccess: '統合戦略が生成されました！',
          toastDeleteSuccess: '戦略が正常に削除されました。',
          toastDeleteFailed: '戦略の削除に失敗しました。',
          deleteDialog: {
              title: 'この戦略を削除しますか？',
              description: 'この操作は元に戻すことができず、戦略を永久に削除します。',
              confirm: '削除'
          }
      },
      suggestions: {
          button: 'AIで提案',
          toastSuccess: '提案がフォームに入力されました！'
      },
       studentInfo: {
          title: "選択された生徒のプロフィール",
          qualities: '資質',
          fears: '恐れ',
          none: '記載なし',
      },
      history: {
        title: '戦略履歴',
        description: '選択した生徒のために以前に生成された戦略を確認します。',
        header: '{focus}のための戦略',
        statusLabel: '戦略ステータス',
        statusPlaceholder: 'ステータスを設定...',
        feedbackLabel: '教師のフィードバック',
        feedbackPlaceholder: 'この戦略は実際にどのように機能しましたか？',
        saveFeedbackButton: '評価を保存',
        toastUpdateSuccess: '戦略が正常に更新されました！',
        toastUpdateFailed: '戦略の更新に失敗しました。',
        prompt: {
            title: '修復の準備はできましたか？',
            description: 'フォームで少なくとも2人の生徒を選択して、彼らの履歴を表示するか、新しい戦略を生成します。',
        },
        noResults: {
            title: 'まだ戦略はありません',
            description: 'この生徒グループの最初の戦略を生成します。',
        },
         stepDialog: {
            title: '修復ステップを評価',
            description: 'このステップはどうでしたか？',
            status: 'ステータス',
            feedback: 'ステップのフィードバック（任意）',
            feedbackPlaceholder: 'このステップに関するメモを追加...',
            saveButton: '評価を保存',
            statuses: {
                pending: '保留中',
                completed: '完了',
                skipped: 'スキップ',
            },
        },
      },
      details: {
          title: "'{focus}'の戦略詳細",
          adjustTitle: "戦略を調整",
          adjustPlaceholder: "例：もっと簡単にする、描画コンポーネントを追加する、非言語的合図にもっと焦点を当てる...",
          adjustButton: "調整された戦略を生成",
      },
      status: {
        'not_started': '未開始',
        'in_progress': '進行中',
        'successful': '成功',
        'partially_successful': '部分的に成功',
        'did_not_work': '機能しなかった',
        'needs_adjustment': '調整が必要',
      },
      toastSuccess: '修復戦略が生成されました！',
    },
    qualitiesSuggestion: {
      title: '資質の提案',
      description: '生徒のパフォーマンスに基づいて新たな資質を発見します。',
      button: '資質を発見',
      suggestionText:
        '最近のパフォーマンスに基づき、AIは以下の資質を提案します：',
      noSuggestions: {
        title: 'まだ資質の提案はありません',
        description:
          'この生徒の最初の資質の提案を生成して開始します。',
      },
      dialog: {
        title: '{name}の新しい資質の提案',
        description:
          '最近のパフォーマンスに基づき、追加を検討できる資質は次のとおりです：',
        accept: '承認',
        reject: '拒否',
        confirmation: '資質をどのように更新しますか？',
        add: '新規として追加',
        replace: '既存を置き換える',
        confirm: '更新を確認',
      },
    },
    concernAnalysis: {
      title: '懸念パターンの分析',
      description:
        'AIが、生徒の全履歴を分析して、繰り返される負のパターンを探します。',
      button: '懸念を分析',
      noAnalyses: {
        title: '懸念パターンは検出されませんでした',
        description:
          '潜在的な繰り返し発生する問題をチェックするために分析を生成します。',
      },
    },
    fearManagement: {
      title: '恐怖管理の提案',
      description: '生徒が恐怖を乗り越えるのを助けるための共感的な戦略を生成します。',
      button: '戦略を取得',
      strategyFor: '対象：',
      feedbackTitle: 'どうでしたか？',
      feedbackPlaceholder: 'あなたのフィードバックはAIの学習と改善に役立ちます...',
      toastFearUpdated: '生徒の恐怖プロフィールが更新されました！',
      toastFearUpdateFailed: '生徒の恐怖の更新に失敗しました。',
      toastDeleted: '提案を正常に削除しました。',
      toastDeleteFailed: '提案の削除に失敗しました。',
      noSuggestions: {
        title: 'まだ戦略はありません',
        description: 'この生徒が恐怖を管理するのを助けるための戦略を生成します。',
        noFears: 'この生徒には恐怖がリストされていません。提案を得るには、プロフィールに恐怖を追加してください。',
      },
      updateDialog: {
        title: '生徒のプロフィールを更新しますか？',
        confirm: 'はい、プロフィールを更新します',
      },
      deleteDialog: {
        title: 'この提案を削除しますか？',
        description: 'この操作は元に戻せません。',
        confirm: '削除',
      },
      dialog: {
        title: '{fear}の恐怖を管理する',
        description: '{name}の既存の戦略を確認するか、新しい戦略を生成します。',
        generateButton: '新しい提案を生成',
        noSuggestions: {
            title: 'まだ戦略はありません',
            description: 'この恐怖に対処するための最初のAI提案を生成します。'
        }
      }
    }
} as const;