export default {
    title: '导出数据',
    tagline: '以各种格式下载您的课堂数据。',
    exportData: '导出数据',
    exportDescription:
      '选择您想导出的数据类型和格式。',
    dataType: '要导出的数据',
    dataTypePlaceholder: '选择数据类型...',
    format: '导出格式',
    formatPlaceholder: '选择格式...',
    exportButton: '生成并下载',
    toastSuccess: '导出已成功开始！',
    toastError: '导出数据失败。请重试。',
    dataTypes: {
      students: '学生名单',
      attendance: '出勤历史',
      evaluations: '挑战评估',
    },
    filtersTitle: '筛选器（可选）',
    studentFilter: '按学生筛选',
    studentPlaceholder: '所有学生',
    dateFilter: '按日期筛选',
    noStudents: '未找到学生'
} as const;
