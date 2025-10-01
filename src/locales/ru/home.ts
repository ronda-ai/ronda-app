export default {
    classRoster: 'Раунд',
    viewOnGitHub: 'Посмотреть на GitHub',
    tagline: 'Веселый способ поощрить участие в классе.',
    yearsOld: 'лет',
    aiConfig: {
      title: 'Конфигурация задания',
      challengeConfigDescription: 'Задайте контекст для следующего задания, сгенерированного ИИ.',
      ageOrGrade: 'Возраст или класс',
      ageOrGradePlaceholder: 'например, 8 лет, 3 класс',
      country: 'Страна',
      countryPlaceholder: 'например, США, Чили',
      customPrompt: 'Пользовательский запрос',
      customPromptPlaceholder: 'например, Сфокусироваться на сотрудничестве',
      negativePrompt: 'Отрицательный запрос',
      negativePromptPlaceholder: 'например, Избегать математических задач',
      subject: 'Предмет',
      subjectPlaceholder: 'Выберите предмет',
      spotlight: {
        title: 'Место выполнения',
        atDesk: 'Уютный уголок',
        inFront: 'В центре внимания',
        doesNotMatter: "Не имеет значения",
      },
      model: {
        title: 'Модель ИИ',
        placeholder: 'Выберите модель...',
        customPlaceholder: 'Пользовательская модель'
      },
      ollamaBaseUrl: {
        title: 'Базовый URL Ollama',
        placeholder: 'например, http://localhost:11434'
      },
      saveButton: 'Сохранить конфигурацию',
      toastSaved: 'Конфигурация ИИ сохранена!',
      toastError: 'Не удалось сохранить конфигурацию ИI.',
      plugin: {
        title: 'Плагин',
        placeholder: 'Выберите плагин...',
      }
    },
  } as const;
