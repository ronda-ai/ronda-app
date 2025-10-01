export default {
    title: '个人活动',
    tagline: '为特定学生设计个性化活动。',
    step0: {
        title: '选择一名学生',
        description: '选择一名学生以开始生成个性化活动。',
    },
    step1: {
      selectLabel: '学生',
      selectPlaceholder: '选择一名学生...',
    },
    generator: {
        title: '为{name}的活动生成器',
        description: '定义活动的参数，或使用AI建议想法。',
        topicLabel: '学术主题',
        topicPlaceholder: '例如，分数、光合作用',
        skillsLabel: '需要发展的技能',
        skillsPlaceholder: '例如，批判性思维、协作',
        themesLabel: '参与主题',
        themesPlaceholder: '例如，太空、恐龙、神秘事件',
        customPromptLabel: '自定义提示（可选）',
        customPromptPlaceholder: '例如，专注于视觉元素，制作一个动手活动',
        negativePromptLabel: '负面提示（可选）',
        negativePromptPlaceholder: '例如，避免写作任务，不要提及蜘蛛',
        generateButton: '生成活动',
        toastSuccess: '活动已成功生成！',
        noSkills: '暂无可用技能。',
        addSkills: '添加新技能'
    },
    suggestions: {
        button: '使用AI建议',
        toastSuccess: '建议已填充！',
    },
    history: {
        title: "活动计划历史",
        description: "查看和管理以前为{name}生成的活动计划。",
        toastDeleted: '活动计划已删除。',
        toastDeleteFailed: '删除活动计划失败。',
        noResults: {
            title: "尚无活动计划",
            description: "为该学生生成第一个计划以在此处查看其历史。"
        },
        deleteDialog: {
            title: "删除此活动计划？",
            description: "此操作无法撤销。这将永久删除活动计划。",
        },
        stepDialog: {
            title: '评估活动步骤',
            description: '此活动进行得如何？',
            status: '状态',
            feedback: '步骤反馈（可选）',
            feedbackPlaceholder: '添加关于此活动的说明...',
            saveButton: '保存评估',
            statuses: {
                pending: '待定',
                'in-progress': '进行中',
                completed: '已完成',
                skipped: '已跳过'
            },
        },
    },
    democratizer: {
      title: '资源民主化工具',
      descriptionSingle: '调整此活动以使其更易于访问。',
      descriptionAll: '根据不同的需求或资源限制，调整此计划中的所有活动以使其更易于访问。',
      descriptionSelected: '调整此计划中选定的{count}个活动以使其更易于访问。',
      prompt: '选择一个调整选项以应用于活动。',
      selectPlaceholder: '选择一个调整...',
      activitiesToAdapt: "要调整的活动：",
      adaptButton: '调整活动',
      toastSuccess: '活动已成功调整！',
      options: {
        commonMaterials: '适应常见的家居材料',
        lowEnergy: '适应低能量/平静的场景',
        socialInteraction: '增加社交互动部分',
        simpleInstructions: '简化说明',
      },
    }
} as const;
