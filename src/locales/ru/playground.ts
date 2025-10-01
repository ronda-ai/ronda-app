

export default {
    title: 'Игровая площадка',
    tagline: 'Участвуйте в веселых и образовательных играх с ИИ.',
    riddleBattle: {
        title: 'Битва загадок',
        description: 'Сгенерируйте пару загадок для двух команд. Кто будет быстрее?',
        topicLabel: 'Тема загадки (необязательно)',
        topicPlaceholder: 'например, Животные, Космос, История',
        button: 'Начать новую битву',
        battleTitle: 'Битва загадок!',
        topic: 'Тема',
        teamBlue: 'Синяя команда',
        teamRed: 'Красная команда',
        showAnswer: 'Показать ответ',
        hideAnswer: 'Скрыть ответ',
        toastDeleted: 'Битва удалена.',
        toastDeleteFailed: 'Не удалось удалить битву.',
        toastEvaluationSaved: 'Оценка сохранена.',
        toastEvaluationFailed: 'Не удалось сохранить оценку.',
        noBattles: {
            title: 'Готовы к вызову?',
            description: 'Нажмите кнопку выше, чтобы начать первую битву загадок.',
        },
        deleteDialog: {
            title: 'Удалить эту битву?',
            description: 'Это действие необратимо и не может быть отменено.',
        },
        evaluation: {
            title: 'Оценка',
            winner: 'Победитель',
            winnerLabel: 'Объявить победителя',
            winnerPlaceholder: 'Выберите победителя...',
            tie: 'Ничья',
            moodLabel: 'Атмосфера соревнования',
            moodPlaceholder: 'Выберите атмосферу...',
            feedbackLabel: 'Отзыв',
            feedbackPlaceholder: 'Как прошла игра? Была ли она честной?',
            moods: {
                competitive: 'Соревновательная',
                fun: 'Веселая',
                collaborative: 'Сотрудническая',
                tense: 'Напряженная',
                relaxed: 'Расслабленная',
            },
            confirm: 'Подтвердить'
        }
    },
    lightningRound: {
        title: 'Молниеносный раунд',
        description: 'Быстрая игра с забавными заданиями для оживления класса.',
        durationLabel: 'Длительность раунда (секунды)',
        intervalLabel: 'Интервал заданий (секунды)',
        categoryLabel: 'Категория заданий',
        start: 'Начать молниеносный раунд!',
        pause: 'Пауза',
        resume: 'Продолжить',
        reset: 'Сбросить',
        noStudentsError: 'Для игры необходимо как минимум 2 присутствующих студента.',
        toastDeleted: 'Раунд удален.',
        toastDeleteFailed: 'Не удалось удалить раунд.',
        categories: {
            sound: 'Звуки',
            face: 'Лица',
            gesture: 'Жесты',
            imitation: 'Имитации',
        },
        gameScreen: {
            yourTurn: 'твой ход!',
        },
        history: {
            title: 'История раундов',
            description: 'Просмотрите ранее сгенерированные раунды.',
            roundFor: 'Раунд от {date}',
            noRounds: 'Раундов еще не было.',
        },
        deleteDialog: {
            title: 'Удалить этот раунд?',
            description: 'Это действие необратимо и не может быть отменено.',
        },
    },
    collaborativeStory: {
        title: 'Совместное повествование',
        setup: {
            title: 'Начать новую историю',
            description: 'Определите персонажей и место действия, чтобы начать ваше приключение.',
            charactersLabel: 'Главные герои',
            charactersPlaceholder: 'например, Храбрый рыцарь, умный дракон',
            settingLabel: 'Начальная обстановка',
            settingPlaceholder: 'например, Темная и жуткая пещера',
            lengthLabel: 'Длина главы',
            lengths: {
                short: 'Короткая',
                medium: 'Средняя',
                long: 'Длинная',
            },
            startButton: 'Начать историю',
            allowDialogues: 'Разрешить диалоги в истории',
            narratorVoiceLabel: "Голос рассказчика",
            narratorVoicePlaceholder: "Выберите голос...",
            customPromptLabel: "Пользовательский запрос (необязательно)",
            customPromptPlaceholder: "например, История должна быть комедией, не должна содержать насилия...",
            negativePromptLabel: "Отрицательный запрос (необязательно)",
            negativePromptPlaceholder: "например, Избегать грустных концовок, не упоминать пауков...",
        },
        contribute: {
            title: 'Что будет дальше?',
            description: 'Добавьте идеи студентов для следующей главы.',
            placeholder: 'Напишите идею студента и нажмите enter...',
            continueButton: 'Продолжить историю',
            suggestionButton: 'Предложение ИИ'
        },
        story: {
            titlePlaceholder: 'История появится здесь',
            storyPlaceholder: 'Начните с определения ваших персонажей и обстановки, затем начните историю!',
        },
        history: {
            title: 'История рассказов',
            createdAt: 'Создано',
            noStories: 'Рассказов пока нет.',
        },
        deleteDialog: {
            title: 'Удалить эту историю?',
            description: 'Это действие необратимо и не может быть отменено.',
        },
        toastDeleted: 'История удалена.',
        toastDeleteFailed: 'Не удалось удалить историю.',
        toastNarrationSuccess: 'Полное повествование истории генерируется и скоро появится.',
        newStoryButton: 'Начать новую историю',
        narrateButton: 'Озвучить главу',
        'narrateButton--loading': 'Озвучивание...',
        narrateFullStoryButton: 'Озвучить как аудиокнига',
        suggestions: {
            button: 'Предложить с помощью ИИ',
            toastSuccess: 'Идеи предложены!'
        },
        finishButton: 'Завершить историю',
        test: {
            createButton: 'Создать тест по истории',
            modalTitle: 'Создать тест',
            modalDescription: 'Выберите тип теста, который вы хотите создать по этой истории.',
            typeLabel: 'Тип теста',
            types: {
                title: 'Тип теста',
                'multiple-choice': 'Множественный выбор',
                'true-false': 'Верно/Неверно',
                'open-ended': 'Открытые вопросы',
                'mixed': 'Смешанный',
            },
            generateButton: 'Создать тест',
            generateError: 'Не удалось создать тест.',
            saveSuccess: 'Тест успешно сохранен!',
            saveError: 'Не удалось сохранить тест.',
            previewTitle: 'Предварительный просмотр созданного теста',
            previewDescription: 'Просмотрите созданный тест. Он уже сохранен и может быть просмотрен на странице «Тесты».',
            rubricTitle: 'Критерии оценки',
            saveButton: 'Сохранить тест',
        },
        illustrateButton: 'Иллюстрировать',
    },
    debateGenerator: {
        title: 'Генератор дебатов',
        description: 'Создавайте образовательные сценарии дебатов для поощрения критического мышления.',
        topicLabel: 'Тема дебатов',
        topicPlaceholder: 'например, Следует ли держать животных в зоопарках?',
        complexityLabel: 'Сложность',
        complexities: {
            beginner: 'Начинающий',
            intermediate: 'Средний',
            advanced: 'Продвинутый'
        },
        button: 'Создать новые дебаты',
        noDebates: {
            title: 'Готовы спорить?',
            description: 'Введите тему и сложность, чтобы сгенерировать свой первый сценарий дебатов.',
        },
        affirmativeStance: 'Утвердительная позиция',
        negativeStance: 'Отрицательная позиция',
        guidingQuestions: 'Направляющие вопросы',
        rules: 'Правила дебатов',
        toastDeleted: 'Дебаты удалены.',
        toastDeleteFailed: 'Не удалось удалить дебаты.',
        deleteDialog: {
            title: 'Удалить эти дебаты?',
            description: 'Это действие необратимо и не может быть отменено.',
        },
        startSession: "Начать прямую трансляцию",
        manageSession: "Управлять сессией",
        turnStructureTitle: "Структура раундов дебатов",
        currentTurn: "Текущий раунд",
        notStarted: "Дебаты еще не начались",
        paused: "Дебаты приостановлены",
        start: "Начать дебаты",
        nextTurn: "Следующий раунд",
        pause: "Пауза",
        resume: "Продолжить",
        liveSession: {
            title: "Сессия дебатов в прямом эфире",
            description: "Поделитесь этим QR-кодом или ссылкой со своими студентами, чтобы начать дебаты.",
            qrCode: "QR-код",
            link: "Прямая ссылка",
            copy: "Копировать",
            copied: "Скопировано!",
            studentsConnected: "Подключенные студенты",
            noStudentsYet: "Еще ни один студент не подключился.",
            affirmative: 'За',
            negative: 'Против',
            unassigned: 'Не назначен',
            both: 'Оба',
            teacher: 'Учитель',
            closeSession: "Закрыть сессию",
            sessionClosed: "Сессия была закрыта."
        }
    },
    digitalConviviality: {
        title: 'Цифровое гражданство',
        description: 'Инструменты для поощрения позитивного и ответственного поведения в Интернете.',
        activities: {
            title: 'Деятельность',
            description: 'Создайте задание для тренировки навыков цифрового гражданства.',
        },
        conflictSimulation: {
            title: 'Симуляция конфликта',
            description: 'Практикуйтесь в разрешении сложных онлайн-ситуаций, создавая гипотетический сценарий конфликта.',
            topicsLabel: 'Темы конфликта (необязательно)',
            topicsPlaceholder: 'например, кибербуллинг, дезинформация, плагиат',
            button: 'Создать сценарий',
            scenarioTitle: 'Созданный сценарий',
            strategiesTitle: 'Стратегии вмешательства',
            strategyLabel: 'Стратегия',
            outcomeLabel: 'Симулированный результат',
            noScenario: {
                title: 'Готовы к практике?',
                description: 'Создайте сценарий, чтобы попрактиковаться в навыках разрешения конфликтов.',
            },
            deleteDialog: {
                title: 'Удалить этот сценарий?',
                description: 'Это навсегда удалит этот сценарий конфликта из вашей истории.',
                confirm: 'Удалить',
            },
            history: {
                title: 'История сценариев'
            }
        },
        pact: {
            title: 'Цифровой пакт',
            description: 'Совместно разработайте набор правил для здорового цифрового взаимодействия в классе.',
            studentCountLabel: 'Количество студентов',
            mainConcernsLabel: 'Основные опасения (необязательно)',
            mainConcernsPlaceholder: 'например, использование социальных сетей, уважение частной жизни',
            button: 'Создать черновик пакта',
            saveDraftButton: 'Сохранить черновик',
            publishButton: 'Опубликовать',
            republishButton: 'Переопубликовать',
            publishedAt: 'Опубликовано {date} (версия {version})',
            noPacts: {
                title: 'Готовы заключить пакт?',
                description: 'Установите параметры вашего класса и создайте черновик вашего цифрового convivencia пакта.'
            },
            deleteDialog: {
                title: 'Удалить этот пакт?',
                description: 'Это навсегда удалит сгенерированный пакт.',
                confirm: 'Удалить'
            },
            history: {
                title: 'История пактов',
                principles: 'Руководящие принципы',
                norms: 'Конкретные нормы',
                consequences: 'Восстановительные последствия',
                level: 'Уровень',
                restorativeAction: 'Восстановительное действие'
            }
        },
        typeLabel: 'Тип деятельности',
        typePlaceholder: 'Выберите тип...',
        types: {
            'netiquette-challenge': 'Вызов по сетевому этикету',
            'digital-collaboration': 'Игра на цифровое сотрудничество',
            'positive-messaging': 'Переписчик позитивных сообщений'
        },
        customPromptLabel: 'Конкретный фокус (необязательно)',
        customPromptPlaceholder: 'например, Сосредоточиться на комментариях в социальных сетях...',
        button: 'Создать деятельность',
        history: {
            title: 'История деятельности',
            studentInstructions: 'Инструкции для студентов',
            pedagogicalObjectives: 'Педагогические цели',
            materials: 'Материалы',
            noMaterials: 'Материалы не предоставлены.',
            steps: 'Шаги',
        },
        noActivities: {
            title: 'Готовы продвигать хорошие цифровые привычки?',
            description: 'Выберите тип деятельности выше, чтобы создать свое первое упражнение по цифровому гражданству.'
        },
        deleteDialog: {
            title: 'Удалить эту деятельность?',
            description: 'Это действие необратимо и не может быть отменено.',
            confirm: 'Удалить'
        }
    },
    suggestions: {
        button: 'Предложить с помощью ИИ',
        toastSuccess: 'Тема предложена!'
    }
} as const;
    
