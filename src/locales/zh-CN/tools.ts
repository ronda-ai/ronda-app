
export default {
    title: '工具',
    tagline: '使用AI工具来增强您的教学。',
    activityAdapter: {
      title: '活动适配器',
      description: '调整任何现有活动以更好地适应您的课堂需求，无论是针对特定学生还是整个小组。',
      placeholder: '在此处粘贴或编写您想要调整的活动...',
      activityLabel: '要调整的活动',
      existingActivityLabel: '选择一个现有的活动或测试',
      existingActivityPlaceholder: '选择一个活动/测试进行总结和调整...',
      studentLabel: '为特定学生调整（可选）',
      studentPlaceholder: '选择学生...',
      customPromptLabel: '调整的具体目标（可选）',
      customPromptPlaceholder: '例如，使其成为一个游戏，专注于写作...',
      button: '调整活动',
      generatingTitle: '正在生成调整方案...',
      activityType: '活动'
    },
     rubricGenerator: {
      title: '评分标准生成器',
      description: '为任何活动创建一个公平、平衡的评估标准。',
      placeholder: '描述要为其生成评分标准的活动...',
      button: '生成评分标准',
      testType: '测试'
    },
    history: {
      title: '历史记录',
      descriptionAdapter: '查看以前调整过的活动。',
      descriptionRubric: '查看以前生成的评分标准。',
      reasoning: '理由',
      criterion: '标准',
      excellent: '优秀',
      satisfactory: '满意',
      needsImprovement: '需要改进',
      scoringGuide: '评分指南',
      toastDeleteSuccess: '删除成功。',
      toastDeleteFailed: '删除失败。',
      noResults: {
        title: '暂无结果',
        description: '使用左侧的工具生成您的第一个结果。',
      },
      deleteDialogAdapter: {
          title: '删除此调整？',
          description: '此操作无法撤销。这将永久删除活动调整。',
          confirm: '删除'
      },
      deleteDialogRubric: {
          title: '删除此评分标准？',
          description: '此操作无法撤销。这将永久删除生成的评分标准。',
          confirm: '删除'
      }
    }
} as const;
