export default {
    classRoster: 'ラウンド',
    viewOnGitHub: 'GitHubで見る',
    tagline: '教室での参加を促す楽しい方法。',
    yearsOld: '歳',
    aiConfig: {
      title: '挑戦の設定',
      challengeConfigDescription: 'AIによって生成される次の挑戦のコンテキストを設定します。',
      ageOrGrade: '年齢または学年',
      ageOrGradePlaceholder: '例：8歳、3年生',
      country: '国',
      countryPlaceholder: '例：日本、アメリカ',
      customPrompt: 'カスタムプロンプト',
      customPromptPlaceholder: '例：協力を重視する',
      negativePrompt: 'ネガティブプロンプト',
      negativePromptPlaceholder: '例：数学の問題を避ける',
      subject: '科目',
      subjectPlaceholder: '科目を選択',
      spotlight: {
        title: 'スポットライト',
        atDesk: '居心地の良いコーナー',
        inFront: 'センターステージ',
        doesNotMatter: "どちらでもよい",
      },
      model: {
        title: 'AIモデル',
        placeholder: 'モデルを選択...',
        customPlaceholder: 'カスタムモデル'
      },
      ollamaBaseUrl: {
        title: 'OllamaベースURL',
        placeholder: '例：http://localhost:11434'
      },
      saveButton: '設定を保存',
      toastSaved: 'AI設定が保存されました！',
      toastError: 'AI設定の保存に失敗しました。',
      plugin: {
        title: 'プラグイン',
        placeholder: 'プラグインを選択...',
      }
    },
  } as const;
