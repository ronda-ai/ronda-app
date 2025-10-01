export default {
    selectionMode: '选择模式',
    readyToSpin: '准备好旋转了吗？',
    readyToSelect: '准备好选择了吗？',
    spinTheWheel: '旋转轮盘！',
    selectStudent: '选择学生',
    selectStudentSingular: '选择学生',
    spinning: '旋转中...',
    modes: {
      random: '随机',
      weighted: '加权AI',
      lightning: '闪电回合',
      pair: '实力组合',
      personalizedIndividual: '个性化个人',
      personalizedMultiple: '个性化多人',
    },
    modeDescriptions: {
      random: '完全随机选择一名学生。',
      weighted:
        'AI选择一名学生，给予参与较少的学生更高的机会。',
      lightning: '为随机选择的一名学生提供一个快速、简单的挑战。',
      pair: '随机选择两名学生合作完成一个挑战。',
      personalizedIndividual:
        '手动选择一名学生进行高度个性化的挑战。',
      personalizedMultiple:
        '手动选择最多三名学生进行协作式个性化挑战。',
    },
} as const;
