
export default {
      title: '语言支持',
      tagline: '生成双语材料以支持语言包容性。',
      form: {
          title: '语言包容性助手',
          description: '选择一名学生并指定他们的语言以生成个性化的支持材料。',
          studentLabel: '学生',
          studentPlaceholder: '选择一名学生...',
          languageLabel: "学生的母语",
          languagePlaceholder: '例如，西班牙语、法语、普通话',
          focusAreasLabel: '重点领域',
          generateButton: '生成支持材料',
      },
      focusAreas: {
          reading: '阅读理解',
          writing: '写作技巧',
          speaking: '口语表达',
          listening: '听力理解',
          'social-emotional': '社交情感融合',
      },
      addFocusAreaDialog: {
        title: '添加新的重点领域',
        description: '从AI建议中选择或将您自己的重点领域添加到列表中。',
        customPromptLabel: '指导AI（可选）',
        customPromptPlaceholder: '例如，专注于听力领域...',
        manualAreaLabel: '或手动添加领域',
        manualAreaPlaceholder: '输入一个新领域...',
        noSuggestions: '没有可用的建议。请尝试刷新或更改您的提示。',
        add: '添加：',
        addSelected: '添加所选',
        toastSuccess: '重点领域已成功添加！',
        toastError: '添加重点领域失败。',
      },
      editFocusAreaDialog: {
        title: '编辑重点领域：{name}',
        areaNameLabel: '重点领域名称',
        deleteButton: '删除领域',
        toastUpdateSuccess: '重点领域已成功更新！',
        toastUpdateError: '更新重点领域失败。',
        toastDeleteSuccess: '重点领域已成功删除！',
        toastDeleteError: '删除重点领域失败。',
        deleteDialog: {
            title: '您确定吗？',
            description: '这将从列表中永久删除重点领域“{name}”。',
            cancel: '取消',
            confirm: '删除'
        }
      },
      generatingTitle: '正在生成支持材料...',
      history: {
          title: '生成的材料历史',
          description: '查看以前为所选学生生成的材料。',
          selectStudentPrompt: {
            title: '选择一名学生',
            description: '从表单中选择一名学生以查看他们的历史并生成新材料。',
          },
          noResults: {
              title: '暂无材料',
              description: '使用表单为该学生生成第一个支持材料。',
          },
          header: '针对{language}的材料',
          teacherGuide: '教师指南',
          studentMaterial: '学生材料',
          feedbackTitle: "教师反馈",
          feedbackPlaceholder: '这份材料有用吗？您的反馈有助于改进未来的建议。',
          toastDeleted: '支持材料已删除。',
          toastDeleteFailed: '删除支持材料失败。',
          deleteDialog: {
            title: '删除这份材料？',
            description: '此操作无法撤销。这将永久删除生成的支持材料。',
          },
          translationTitle: "{language}的翻译",
          showTranslation: "显示翻译",
          hideTranslation: "隐藏翻译",
      }
} as const;
