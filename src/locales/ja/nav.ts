
export default {
    groups: {
        classroomManagement: '教室管理',
        pedagogicalTools: '教育ツール',
        generators: 'ジェネレーター',
        dataManagement: 'データと設定',
    },
    main: {
        dashboard: 'ダッシュボード',
    },
    classroomManagement: {
        evaluations: '評価',
        observations: '観察',
        attendance: '出席',
        classroom: '教室',
    },
    pedagogicalTools: {
        coach: 'AIコーチ',
        relationshipLab: 'ソーシャルラボ',
        pbl: 'PBLラボ',
        safetyLab: '安全ラボ',
        teacherLab: '教師ラボ',
        languageSupport: '言語サポート',
        digitalConviviality: 'デジタル市民性',
    },
    generators: {
        activityGenerator: 'アクティビティジェネレーター',
        individualActivities: '個人活動',
        groupActivities: 'グループ活動',
        tests: 'テスト',
        tools: 'ツール',
        playground: 'プレイグラウンド',
    },
    dataManagement: {
        analytics: '分析',
        export: 'データのエクスポート',
        instanceStatus: 'インスタンスの状態',
    },
    accessibility: {
        title: "アクセシビリティ",
        fontSize: "フォントサイズ",
        reduceMotion: "動きを減らす",
        reset: "デフォルトにリセット",
    }
} as const;

