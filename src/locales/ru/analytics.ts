export default {
    title: 'Аналитика',
    tagline: 'Визуализируйте посещаемость и участие студентов.',
    filters: {
      title: 'Фильтры',
      dateRange: 'Диапазон дат',
      student: 'Студент',
      allStudents: 'Все студенты',
      studentPlaceholder: 'Выберите студента(ов)...',
      noStudents: 'Студенты не найдены'
    },
    charts: {
      attendance: {
        title: 'Тенденции посещаемости',
        description: 'Количество присутствующих и отсутствующих студентов с течением времени.',
      },
      participation: {
        title: 'Распределение участия',
        description:
          'Общее количество участий для каждого студента в выбранном диапазоне.',
        legend: 'Участия'
      },
    },
} as const;
