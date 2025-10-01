
export default {
    title: '游乐场',
    tagline: '与AI一起参与有趣且有教育意义的游戏。',
    riddleBattle: {
        title: '谜语对战',
        description: '生成一对谜语供两个团队解答。谁会更快？',
        topicLabel: '谜语主题（可选）',
        topicPlaceholder: '例如，动物、太空、历史',
        button: '开始新对战',
        battleTitle: '谜语对战！',
        topic: '主题',
        teamBlue: '蓝队',
        teamRed: '红队',
        showAnswer: '显示答案',
        hideAnswer: '隐藏答案',
        toastDeleted: '对战已删除。',
        toastDeleteFailed: '删除对战失败。',
        toastEvaluationSaved: '评估已保存。',
        toastEvaluationFailed: '保存评估失败。',
        noBattles: {
            title: '准备好挑战了吗？',
            description: '点击上面的按钮开始第一场谜语对战。',
        },
        deleteDialog: {
            title: '删除这场对战？',
            description: '此操作是永久性的，无法撤销。',
        },
        evaluation: {
            title: '评估',
            winner: '获胜者',
            winnerLabel: '宣布获胜者',
            winnerPlaceholder: '选择一个获胜者...',
            tie: '平局',
            moodLabel: '比赛氛围',
            moodPlaceholder: '选择氛围...',
            feedbackLabel: '反馈',
            feedbackPlaceholder: '游戏怎么样？公平吗？',
            moods: {
                competitive: '竞争性',
                fun: '有趣',
                collaborative: '协作性',
                tense: '紧张',
                relaxed: '轻松',
            },
            confirm: '确认'
        }
    },
    lightningRound: {
        title: '闪电回合',
        description: '一个快节奏的游戏，用有趣的挑战来活跃课堂气氛。',
        durationLabel: '回合时长（秒）',
        intervalLabel: '挑战间隔（秒）',
        categoryLabel: '挑战类别',
        start: '开始闪电回合！',
        pause: '暂停',
        resume: '继续',
        reset: '重置',
        noStudentsError: '至少需要2名在场学生才能玩。',
        toastDeleted: '回合已删除。',
        toastDeleteFailed: '删除回合失败。',
        categories: {
            sound: '声音',
            face: '表情',
            gesture: '手势',
            imitation: '模仿',
        },
        gameScreen: {
            yourTurn: '轮到你了！',
        },
        history: {
            title: '回合历史',
            description: '查看以前生成的回合。',
            roundFor: '{date} 的回合',
            noRounds: '还没有进行过回合。',
        },
        deleteDialog: {
            title: '删除此回合？',
            description: '此操作是永久性的，无法撤销。',
        },
    },
    collaborativeStory: {
        title: '协作讲故事',
        setup: {
            title: '开始一个新故事',
            description: '定义角色和场景来开始你的冒险。',
            charactersLabel: '主要角色',
            charactersPlaceholder: '例如，一个勇敢的骑士，一条聪明的龙',
            settingLabel: '初始场景',
            settingPlaceholder: '例如，一个黑暗而恐怖的洞穴',
            lengthLabel: '章节长度',
            lengths: {
                short: '短',
                medium: '中',
                long: '长',
            },
            startButton: '开始故事',
            allowDialogues: '允许在故事中使用对话',
            narratorVoiceLabel: "旁白的声音",
            narratorVoicePlaceholder: "选择一个声音...",
            customPromptLabel: "自定义提示（可选）",
            customPromptPlaceholder: "例如，故事必须是喜剧，不能包含暴力...",
            negativePromptLabel: "负面提示（可选）",
            negativePromptPlaceholder: "例如，避免悲伤的结局，不要提及蜘蛛...",
        },
        contribute: {
            title: '接下来会发生什么？',
            description: '为下一章添加学生们的想法。',
            placeholder: '写下学生的想法并按回车...',
            continueButton: '继续故事',
            suggestionButton: 'AI建议'
        },
        story: {
            titlePlaceholder: '故事将在这里出现',
            storyPlaceholder: '首先定义你的角色和场景，然后开始故事！',
        },
        history: {
            title: '故事历史',

            createdAt: '创建于',
            noStories: '暂无故事。',
        },
        deleteDialog: {
            title: '删除这个故事？',
            description: '此操作是永久性的，无法撤销。',
        },
        toastDeleted: '故事已删除。',
        toastDeleteFailed: '删除故事失败。',
        toastNarrationSuccess: '完整的故事叙述正在生成中，稍后将出现。',
        newStoryButton: '开始一个新故事',
        narrateButton: '讲述章节',
        'narrateButton--loading': '讲述中...',
        narrateFullStoryButton: '作为有声书讲述',
        suggestions: {
            button: '使用AI建议',
            toastSuccess: '已建议想法！'
        },
        finishButton: '完成故事',
        test: {
            createButton: '从故事创建测试',
            modalTitle: '生成测试',
            modalDescription: '选择您想从此故事生成的测试类型。',
            typeLabel: '测试类型',
            types: {
                title: '测试类型',
                'multiple-choice': '多项选择',
                'true-false': '判断题',
                'open-ended': '开放式问题',
                'mixed': '混合型',
            },
            generateButton: '生成测试',
            generateError: '生成测试失败。',
            saveSuccess: '测试已成功保存！',
            saveError: '保存测试失败。',
            previewTitle: '生成的测试预览',
            previewDescription: '查看生成的测试。它已经保存，可以在“测试”页面上查看。',
            rubricTitle: '评估标准',
            saveButton: '保存测试',
        },
        illustrateButton: '插图',
    },
    debateGenerator: {
        title: '辩论生成器',
        description: '生成教育性辩论场景以鼓励批判性思维。',
        topicLabel: '辩论主题',
        topicPlaceholder: '例如，动物应该被关在动物园里吗？',
        complexityLabel: '复杂性',
        complexities: {
            beginner: '初级',
            intermediate: '中级',
            advanced: '高级'
        },
        button: '生成新辩论',
        noDebates: {
            title: '准备好辩论了吗？',
            description: '输入一个主题和复杂性以生成您的第一个辩论场景。',
        },
        affirmativeStance: '正方观点',
        negativeStance: '反方观点',
        guidingQuestions: '引导性问题',
        rules: '辩论规则',
        toastDeleted: '辩论已删除。',
        toastDeleteFailed: '删除辩论失败。',
        deleteDialog: {
            title: '删除此辩论？',
            description: '此操作是永久性的，无法撤销。',
        },
        startSession: "开始直播",
        manageSession: "管理会话",
        turnStructureTitle: "辩论回合结构",
        currentTurn: "当前回合",
        notStarted: "辩论尚未开始",
        paused: "辩论已暂停",
        start: "开始辩论",
        nextTurn: "下一回合",
        pause: "暂停",
        resume: "继续",
        liveSession: {
            title: "辩论会话进行中",
            description: "与您的学生分享此二维码或链接以开始辩论。",
            qrCode: "二维码",
            link: "直接链接",
            copy: "复制",
            copied: "已复制！",
            studentsConnected: "已连接的学生",
            noStudentsYet: "还没有学生连接。",
            affirmative: '正方',
            negative: '反方',
            unassigned: '未分配',
            both: '双方',
            teacher: '老师',
            closeSession: "关闭会话",
            sessionClosed: "会话已关闭。"
        }
    },
    digitalConviviality: {
        title: '数字公民',
        description: '促进积极负责的在线行为的工具。',
        activities: {
            title: '活动',
            description: '生成一个活动以练习数字公民技能。',
        },
        conflictSimulation: {
            title: '冲突模拟',
            description: '通过生成一个假设的冲突情景来练习处理困难的在线情况。',
            topicsLabel: '冲突主题（可选）',
            topicsPlaceholder: '例如，网络欺凌、虚假信息、抄袭',
            button: '生成情景',
            scenarioTitle: '生成的情景',
            strategiesTitle: '干预策略',
            strategyLabel: '策略',
            outcomeLabel: '模拟结果',
            noScenario: {
                title: '准备好练习了吗？',
                description: '生成一个情景以练习您的冲突解决技巧。',
            },
            deleteDialog: {
                title: '删除此情景？',
                description: '这将从您的历史记录中永久删除此冲突情景。',
                confirm: '删除',
            },
            history: {
                title: '情景历史'
            }
        },
        pact: {
            title: '数字公约',
            description: '协作生成一套课堂规则，以实现健康的数字互动。',
            studentCountLabel: '学生人数',
            mainConcernsLabel: '主要关注点（可选）',
            mainConcernsPlaceholder: '例如，社交媒体的使用、尊重隐私',
            button: '生成公约草案',
            saveDraftButton: '保存草稿',
            publishButton: '发布',
            republishButton: '重新发布',
            publishedAt: '发布于 {date} (v{version})',
            noPacts: {
                title: '准备好制定公约了吗？',
                description: '设置您的课堂参数并生成您的数字 convivencia 公约草案。'
            },
            deleteDialog: {
                title: '删除此公约？',
                description: '这将永久删除生成的公约。',
                confirm: '删除'
            },
            history: {
                title: '公约历史',
                principles: '指导原则',
                norms: '具体规范',
                consequences: '修复性后果',
                level: '级别',
                restorativeAction: '修复性行动'
            }
        },
        typeLabel: '活动类型',
        typePlaceholder: '选择一个类型...',
        types: {
            'netiquette-challenge': '网络礼仪挑战',
            'digital-collaboration': '数字协作游戏',
            'positive-messaging': '积极信息改写器'
        },
        customPromptLabel: '具体重点（可选）',
        customPromptPlaceholder: '例如，关注社交媒体评论...',
        button: '生成活动',
        history: {
            title: '活动历史',
            studentInstructions: '给学生的说明',
            pedagogicalObjectives: '教学目标',
            materials: '材料',
            noMaterials: '未提供材料。',
            steps: '步骤',
        },
        noActivities: {
            title: '准备好推广良好的数字习惯了吗？',
            description: '选择上面的活动类型以生成您的第一个数字公民练习。'
        },
        deleteDialog: {
            title: '删除此活动？',
            description: '此操作是永久性的，无法撤销。',
            confirm: '删除'
        }
    },
    suggestions: {
        button: '使用AI建议',
        toastSuccess: '主题已建议！'
    }
} as const;
