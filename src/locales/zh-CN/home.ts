export default {
    classRoster: '回合',
    viewOnGitHub: '在GitHub上查看',
    tagline: '一种鼓励课堂参与的有趣方式。',
    yearsOld: '岁',
    aiConfig: {
      title: '挑战配置',
      challengeConfigDescription: '设置由AI生成的下一个挑战的背景。',
      ageOrGrade: '年龄或年级',
      ageOrGradePlaceholder: '例如，8岁，三年级',
      country: '国家',
      countryPlaceholder: '例如，美国、智利',
      customPrompt: '自定义提示',
      customPromptPlaceholder: '例如，专注于协作',
      negativePrompt: '负面提示',
      negativePromptPlaceholder: '例如，避免数学问题',
      subject: '科目',
      subjectPlaceholder: '选择一个科目',
      spotlight: {
        title: '聚光灯',
        atDesk: '舒适角落',
        inFront: '中心舞台',
        doesNotMatter: "没关系",
      },
      model: {
        title: 'AI模型',
        placeholder: '选择一个模型...',
        customPlaceholder: '自定义模型'
      },
      ollamaBaseUrl: {
        title: 'Ollama基础URL',
        placeholder: '例如，http://localhost:11434'
      },
      saveButton: '保存配置',
      toastSaved: 'AI配置已保存！',
      toastError: '保存AI配置失败。',
      plugin: {
        title: '插件',
        placeholder: '选择一个插件...',
      }
    },
  } as const;
