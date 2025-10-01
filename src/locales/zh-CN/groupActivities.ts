
export default {
    title: '小组活动',
    tagline: '智能分组并生成协作活动。',
    generator: {
      title: '小组建议生成器',
      description: 'AI将分析您的班级以建议平衡的小组和主持技巧。',
      button: '生成新建议',
    },
    manualMode: {
        title: '手动小组构建器',
        description: '创建您自己的小组并获得AI辅助。',
        selectLabel: '为新小组选择学生',
        selectPlaceholder: '选择学生...',
        createGroupButton: '创建小组',
        groupTitle: '新小组',
        analyzeButton: '分析动态',
        generateActivityButton: '生成活动',
        warningTitle: '关系警报',
        conflictWarning: '{nameA} 和 {nameB} 之间有记录在案的冲突。请谨慎操作。',
        skillsLabel: '需要发展的协作技能',
        skillsPlaceholder: '例如，沟通、领导力',
        themesLabel: '活动主题（可选）',
        themesPlaceholder: '例如，太空任务、解谜',
        activityGeneratedToast: '活动已成功生成！',
    },
    aiSuggestions: {
        title: 'AI生成的建议',
    },
    history: {
      title: '建议历史',
      description: '查看以前生成的小组建议。',
      suggestionFor: '{date} 的建议',
      teacherTipTitle: '主持人提示',
      suggestedGroups: '建议的小组',
      group: '小组',
      suggestedSkills: '建议的协作技能',
      suggestedThemes: '建议的活动主题',
      useSuggestionButton: '使用此建议',
      suggestionUsedToast: '建议已应用于手动小组构建器！',
      noResults: {
        title: '准备好协作了吗？',
        description: '点击上面的按钮，为您的班级生成第一组小组建议。',
      },
      toastDeleted: '建议已删除。',
      toastDeleteFailed: '删除建议失败。',
      deleteDialog: {
        title: '要删除此建议吗？',
        description: '此操作是永久性的，无法撤销。',
      },
    },
    viewActivitiesButton: '查看生成的活动',
    details: {
        title: '为小组生成的活动',
        description: '为 {members} 生成了以下活动。',
        deleteButton: '删除活动计划',
    }
} as const;
