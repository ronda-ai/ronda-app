export default {
    title: 'Оценки',
    tagline: 'Просматривайте и оценивайте участие студентов.',
    evaluateButton: 'Оценить',
    evaluatedStatus: 'Оценено',
    rejectedStatus: 'Отклонено',
    noChallenges: 'Для этого студента еще нет зарегистрированных заданий.',
    noEvaluations: {
      title: 'Оценок пока нет',
      description:
        'Как только студент примет задание, вы сможете оценить его здесь.',
    },
    evaluationDialog: {
      title: 'Оценить задание',
      forStudent: 'для {name}',
      challenge: 'Задание',
      rating: 'Оценка',
      feedback: 'Отзыв',
      feedbackPlaceholder: 'Введите свой отзыв здесь...',
      saveButton: 'Сохранить оценку',
      mood: 'Настроение студента',
    },
    ratings: {
      needsSupport: 'Требуется поддержка',
      metExpectations: 'Соответствует ожиданиям',
      exceededExpectations: 'Превосходит ожидания',
    },
    moods: {
      enthusiastic: 'Восторженное',
      focused: 'Сосредоточенное',
      nervous: 'Нервное',
      frustrated: 'Расстроенное',
      happy: 'Счастливое',
      tired: 'Усталое',
    },
    pagination: {
        previous: 'Назад',
        next: 'Вперед',
        page: 'Страница {currentPage} из {totalPages}',
    }
} as const;
