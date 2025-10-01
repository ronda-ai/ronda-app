export default {
    title: '分析',
    tagline: '可视化学生的出勤和参与情况。',
    filters: {
      title: '筛选器',
      dateRange: '日期范围',
      student: '学生',
      allStudents: '所有学生',
      studentPlaceholder: '选择学生...',
      noStudents: '未找到学生'
    },
    charts: {
      attendance: {
        title: '出勤趋势',
        description: '随时间变化的学生出勤与缺勤人数。',
      },
      participation: {
        title: '参与分布',
        description:
          '选定范围内每个学生的总参与次数。',
        legend: '参与次数'
      },
    },
} as const;
