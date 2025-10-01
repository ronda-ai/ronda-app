
export default {
    title: 'PBL实验室',
    tagline: '从一个想法策划复杂的项目。',
    tabs: {
        phase1: '阶段1：规划',
        phase2: '阶段2：团队',
        phase3: '阶段3：开发',
        phase4: '阶段4：评估',
    },
    phase1: {
        form: {
            title: '阶段1：项目规划器',
            description: '定义一个中心主题，让AI构建一个结构化的项目计划。',
            topicLabel: '中心项目主题',
            topicPlaceholder: '例如，我们城市的气候变化，视频游戏的历史...',
            skillsLabel: '需要发展的关键技能',
            noSkills: '尚未定义任何技能。请前往活动生成器添加。',
            durationLabel: '预计持续时间',
            durations: {
                'oneWeek': '1周',
                'twoWeeks': '2周',
                'oneMonth': '1个月',
            },
            generateButton: '生成项目计划'
        },
        generating: {
            title: '正在生成项目计划...'
        },
    },
    phase2: {
        title: '阶段2：团队组建',
        description: '利用AI根据您学生的个人资料和关系组建战略性小组。',
        selectProject: '选择项目',
        selectProjectPlaceholder: '选择一个项目以组建团队...',
        teamSize: '团队规模',
        groupingCriteria: '分组标准',
        criteria: {
            balanced: '平衡团队',
            'social-remediation': '社交修复',
            synergy: '兴趣协同',
        },
        generateButton: '生成团队',
        noProjectSelected: '请先选择一个项目。',
        results: {
            title: '建议的团队',
            teamName: '团队 {name}',
            rationale: '团队理由',
            formation: '编队',
            deleteDialog: {
                title: '删除此团队编队？',
                description: '此操作无法撤销。这将永久删除该团队编队。',
            },
        },
        table: {
            student: '学生',
            suggestedRole: '建议的角色',
            justification: '理由',
        }
    },
    phase3: {
        title: '阶段3：即时脚手架',
        description: '为在项目开发过程中遇到挑战的团队生成快速干预计划。',
        selectTeam: '需要干预的团队',
        selectTeamPlaceholder: '选择学生...',
        problemLabel: '描述问题',
        problemPlaceholder: '例如，团队陷入困境，存在冲突，学生没有动力...',
        generateButton: '生成干预',
        suggestionTitle: '建议的干预',
        microActivity: '用于解锁的微活动',
        guidingQuestions: '教师的指导性问题',
        noSuggestion: '生成的干预计划将显示在此处。',
    },
    phase4: {
        title: '阶段4：评分标准生成器',
        description: '为项目的最终产品生成详细的评估评分标准。',
        generateButton: '生成评分标准',
        rubricTitle: '建议的评估评分标准',
        noRubric: '生成的评分标准将显示在此处。',
    },
    history: {
        title: '项目历史',
        description: '回顾和管理以前生成的项目。',
        noResults: {
            title: '暂无项目',
            description: '使用表单生成您的第一个基于项目的学习计划。'
        },
        phases: '项目阶段',
        milestones: '关键里程碑',
        finalProduct: '最终产品建议',
        deleteDialog: {
            title: '删除此项目计划？',
            description: '此操作无法撤销。这将永久删除该项目计划。',
        },
    },
} as const;
