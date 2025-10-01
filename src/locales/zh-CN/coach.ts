export default {
    title: 'AI教练',
    tagline: '获取由AI驱动的见解和建议。',
    noStudentSelected: {
      title: '选择一名学生',
      description:
        '从列表中选择一名学生以查看其分析并获取建议。',
    },
    tabs: {
        classroom: '班级分析',
        individual: '个人分析'
    },
    coachSuggestion: {
      title: '教练建议',
      description:
        '根据学生的个人资料和表现为他们生成个性化建议。',
      button: '获取建议',
      toastDeleted: '建议已成功删除。',
      toastDeleteFailed: '删除建议失败。',
      deleteDialog: {
        title: '删除此建议？',
        description: '此操作无法撤销。这将永久删除教练建议。',
        confirm: '删除',
      },
      noSuggestions: {
        title: '暂无建议',
        description:
          '为该学生生成第一条建议以开始。',
      },
    },
    supportPlan: {
      title: '支持计划',
      description:
        '生成一个多步骤、可操作的计划以支持该学生的发展。',
      button: '生成新计划',
      generating: '正在生成计划，请稍候...',
      planGenerated: '计划生成于 {date}',
      feedbackTitle: "教师反馈",
      feedbackPlaceholder:
        '哪些有效？哪些无效？您的反馈有助于AI学习...',
      toastDeleted: '支持计划已成功删除。',
      toastDeleteFailed: '删除支持计划失败。',
      noPlans: {
        title: '暂无支持计划',
        description:
          '为该学生生成第一个支持计划以开始。',
      },
      stepDialog: {
        title: '评估支持步骤',
        description: '这一步进行得怎么样？',
        status: '状态',
        feedback: '步骤反馈（可选）',
        feedbackPlaceholder: '添加关于此步骤的说明...',
        saveButton: '保存步骤评估',
        statuses: {
          pending: '待定',
          achieved: '已实现',
          'partially-achieved': '部分实现',
          'not-achieved': '未实现',
          discarded: '已放弃',
        },
      },
      deleteDialog: {
        title: '您确定要删除此计划吗？',
        description:
          '此操作无法撤销。这将永久删除支持计划。',
        confirm: '删除',
      },
    },
    moodAnalysis: {
      title: '情绪趋势分析',
      descriptionStudent:
        '分析该学生在不同挑战中的情绪以发现规律。',
      descriptionClassroom:
        '获取全班范围的情绪趋势分析，以改善整体动态。',
      button: '分析趋势',
      buttonClassroom: '分析课堂趋势',
      analysisTitle: 'AI驱动的见解',
      noAnalyses: {
        title: '暂无分析',
        descriptionStudent:
          '为该学生生成第一次情绪分析以开始。',
        descriptionClassroom:
          '为课堂生成第一次情绪分析以开始。',
      },
       toastDeleted: '分析已成功删除。',
       toastDeleteFailed: '删除分析失败。',
       deleteDialog: {
        title: '删除此分析？',
        description: '此操作无法撤销。这将永久删除生成的分析。',
        confirm: '删除',
      },
    },
    relationshipLab: {
      title: '社交动态实验室',
      description: '一个分析和改善学生关系的空间。',
      button: '打开实验室',
      tagline: '策划积极的社交互动。',
      tabs: {
        multiStudent: '同伴之间',
        singleStudent: '个人',
      },
      form: {
        title: '关系修复策略生成器',
        description: '选择关系紧张的学生以接收定制的干预计划。',
        studentsLabel: '选择学生（2-4名）',
        studentsPlaceholder: '选择学生...',
        focusLabel: '主要目标/需加强的技能',
        focusPlaceholder: '例如，沟通、同理心、协作...',
        customPromptLabel: '自定义提示（可选）',
        customPromptPlaceholder: '例如，创建一个非语言活动，使其成为一个游戏...',
        generateButton: '生成策略',
      },
      individual: {
          form: {
              title: '个人策略生成器',
              description: '选择一名学生以生成一个计划，帮助他们更好地融入班级并与他人建立关系。',
              studentsPlaceholder: '选择一名学生...',
              generateButton: '生成融合策略'
          },
          history: {
              title: '个人策略历史',
              description: '查看以前为该学生生成的策略。',
               prompt: {
                  title: '准备好搭建桥梁了吗？',
                  description: '选择一名学生以查看其历史或生成新的社交融合策略。',
              },
          },
          toastSuccess: '融合策略已生成！',
          toastDeleteSuccess: '策略已成功删除。',
          toastDeleteFailed: '删除策略失败。',
          deleteDialog: {
              title: '删除此策略？',
              description: '此操作无法撤销，将永久删除该策略。',
              confirm: '删除'
          }
      },
      suggestions: {
          button: '使用AI建议',
          toastSuccess: '建议已填充到表单中！'
      },
       studentInfo: {
          title: "已选学生的个人资料",
          qualities: '品质',
          fears: '恐惧',
          none: '未列出',
      },
      history: {
        title: '策略历史',
        description: '查看以前为所选学生生成的策略。',
        header: '针对{focus}的策略',
        statusLabel: '策略状态',
        statusPlaceholder: '设置状态...',
        feedbackLabel: '教师反馈',
        feedbackPlaceholder: '这个策略在实践中效果如何？',
        saveFeedbackButton: '保存评估',
        toastUpdateSuccess: '策略更新成功！',
        toastUpdateFailed: '策略更新失败。',
        prompt: {
            title: '准备好修复关系了吗？',
            description: '在表单中选择至少两名学生以查看他们的历史或生成新策略。',
        },
        noResults: {
            title: '暂无策略',
            description: '为这组学生生成第一个策略。',
        },
         stepDialog: {
            title: '评估修复步骤',
            description: '这一步进行得怎么样？',
            status: '状态',
            feedback: '步骤反馈（可选）',
            feedbackPlaceholder: '添加关于此步骤的说明...',
            saveButton: '保存评估',
            statuses: {
                pending: '待定',
                completed: '已完成',
                skipped: '已跳过',
            },
        },
      },
      details: {
          title: "针对'{focus}'的策略详情",
          adjustTitle: "调整策略",
          adjustPlaceholder: "例如，使其更简单，添加绘画部分，更关注非语言线索...",
          adjustButton: "生成调整后的策略",
      },
      status: {
        'not_started': '未开始',
        'in_progress': '进行中',
        'successful': '成功',
        'partially_successful': '部分成功',
        'did_not_work': '无效',
        'needs_adjustment': '需要调整',
      },
      toastSuccess: '关系修复策略已生成！',
    },
    qualitiesSuggestion: {
      title: '品质建议',
      description: '根据学生表现发现新兴品质。',
      button: '发现品质',
      suggestionText:
        '根据最近的表现，AI建议以下品质：',
      noSuggestions: {
        title: '暂无品质建议',
        description:
          '为该学生生成第一条品质建议以开始。',
      },
      dialog: {
        title: '{name}的新品质建议',
        description:
          '根据最近的表现，这里有一些您可能考虑添加的品质：',
        accept: '接受',
        reject: '拒绝',
        confirmation: '您想如何更新这些品质？',
        add: '添加为新的',
        replace: '替换现有的',
        confirm: '确认更新',
      },
    },
    concernAnalysis: {
      title: '关注模式分析',
      description:
        'AI将分析学生的完整历史，以查找重复出现的负面模式。',
      button: '分析关注点',
      noAnalyses: {
        title: '未检测到关注模式',
        description:
          '生成分析以检查潜在的重复问题。',
      },
    },
    fearManagement: {
      title: '恐惧管理建议',
      description: '生成富有同理心的策略，以帮助学生克服恐惧。',
      button: '获取策略',
      strategyFor: '针对以下情况的策略：',
      feedbackTitle: '效果如何？',
      feedbackPlaceholder: '您的反馈有助于AI学习和改进...',
      toastFearUpdated: '学生恐惧档案已更新！',
      toastFearUpdateFailed: '更新学生恐惧失败。',
      toastDeleted: '建议已成功删除。',
      toastDeleteFailed: '删除建议失败。',
      noSuggestions: {
        title: '暂无策略',
        description: '生成一个策略来帮助该学生管理恐惧。',
        noFears: '该学生没有列出任何恐惧。请在其个人资料中添加恐惧以获取建议。',
      },
      updateDialog: {
        title: '更新学生个人资料？',
        confirm: '是的，更新个人资料',
      },
      deleteDialog: {
        title: '要删除此建议吗？',
        description: '此操作无法撤销。',
        confirm: '删除',
      },
      dialog: {
        title: '管理对{fear}的恐惧',
        description: '查看现有策略或为{name}生成新策略。',
        generateButton: '生成新建议',
        noSuggestions: {
            title: '暂无策略',
            description: '生成第一个AI建议以解决此恐惧。'
        }
      }
    }
} as const;
