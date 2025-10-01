export default {
    title: 'Экспорт данных',
    tagline: 'Скачивайте данные вашего класса в различных форматах.',
    exportData: 'Экспорт данных',
    exportDescription:
      'Выберите тип данных и формат, который вы хотите экспортировать.',
    dataType: 'Данные для экспорта',
    dataTypePlaceholder: 'Выберите тип данных...',
    format: 'Формат экспорта',
    formatPlaceholder: 'Выберите формат...',
    exportButton: 'Сгенерировать и скачать',
    toastSuccess: 'Экспорт успешно начат!',
    toastError: 'Не удалось экспортировать данные. Пожалуйста, попробуйте снова.',
    dataTypes: {
      students: 'Список студентов',
      attendance: 'История посещаемости',
      evaluations: 'Оценки заданий',
    },
    filtersTitle: 'Фильтры (необязательно)',
    studentFilter: 'Фильтр по студенту(ам)',
    studentPlaceholder: 'Все студенты',
    dateFilter: 'Фильтр по дате',
    noStudents: 'Студенты не найдены'
} as const;
