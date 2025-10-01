export default {
    title: 'Playground',
    tagline: 'Participe de jogos divertidos e educativos com IA.',
    riddleBattle: {
        title: 'Batalha de Charadas',
        description: 'Gere um par de charadas para duas equipes resolverem. Quem será mais rápido?',
        topicLabel: 'Tópico da Charada (Opcional)',
        topicPlaceholder: 'ex.: Animais, Espaço, História',
        button: 'Iniciar Nova Batalha',
        battleTitle: 'Batalha de Charadas!',
        topic: 'Tópico',
        teamBlue: 'Equipe Azul',
        teamRed: 'Equipe Vermelha',
        showAnswer: 'Mostrar Resposta',
        hideAnswer: 'Ocultar Resposta',
        toastDeleted: 'Batalha excluída.',
        toastDeleteFailed: 'Falha ao excluir batalha.',
        toastEvaluationSaved: 'Avaliação salva.',
        toastEvaluationFailed: 'Falha ao salvar avaliação.',
        noBattles: {
            title: 'Pronto para um Desafio?',
            description: 'Clique no botão acima para iniciar a primeira Batalha de Charadas.',
        },
        deleteDialog: {
            title: 'Excluir esta batalha?',
            description: 'Esta ação é permanente e não pode ser desfeita.',
        },
        evaluation: {
            title: 'Avaliação',
            winner: 'Vencedor',
            winnerLabel: 'Declarar Vencedor',
            winnerPlaceholder: 'Selecionar um vencedor...',
            tie: 'Empate',
            moodLabel: 'Atmosfera da Competição',
            moodPlaceholder: 'Selecionar a atmosfera...',
            feedbackLabel: 'Feedback',
            feedbackPlaceholder: 'Como foi o jogo? Foi justo?',
            moods: {
                competitive: 'Competitivo',
                fun: 'Divertido',
                collaborative: 'Colaborativo',
                tense: 'Tenso',
                relaxed: 'Relaxado',
            },
            confirm: 'Confirmar'
        }
    },
    lightningRound: {
        title: 'Rodada Relâmpago',
        description: 'Um jogo rápido com desafios divertidos para energizar a sala de aula.',
        durationLabel: 'Duração da Rodada (segundos)',
        intervalLabel: 'Intervalo do Desafio (segundos)',
        categoryLabel: 'Categoria do Desafio',
        start: 'Iniciar Rodada Relâmpago!',
        pause: 'Pausar',
        resume: 'Retomar',
        reset: 'Reiniciar',
        noStudentsError: 'Pelo menos 2 alunos presentes são necessários para jogar.',
        toastDeleted: 'Ronda excluída.',
        toastDeleteFailed: 'Falha ao excluir a ronda.',
        categories: {
            sound: 'Sons',
            face: 'Rostos',
            gesture: 'Gestos',
            imitation: 'Imitações',
        },
        gameScreen: {
            yourTurn: 'sua vez!',
        },
        history: {
            title: 'Histórico de Rodadas',
            description: 'Revise as rodadas geradas anteriormente.',
            roundFor: 'Rodada de {date}',
            noRounds: 'Nenhuma rodada jogada ainda.',
        },
        deleteDialog: {
            title: 'Excluir esta rodada?',
            description: 'Esta ação é permanente e não pode ser desfeita.',
        },
    },
    collaborativeStory: {
        title: 'Contação Colaborativa de Histórias',
        setup: {
            title: 'Iniciar uma Nova História',
            description: 'Defina os personagens e o cenário para começar sua aventura.',
            charactersLabel: 'Personagens Principais',
            charactersPlaceholder: 'ex.: Um cavaleiro corajoso, um dragão inteligente',
            settingLabel: 'Cenário Inicial',
            settingPlaceholder: 'ex.: Uma caverna escura e assustadora',
            lengthLabel: 'Comprimento do Capítulo',
            lengths: {
                short: 'Curto',
                medium: 'Médio',
                long: 'Longo',
            },
            startButton: 'Começar História',
            allowDialogues: 'Permitir diálogos na história',
            narratorVoiceLabel: "Voz do Narrador",
            narratorVoicePlaceholder: "Selecione uma voz...",
            customPromptLabel: "Prompt Personalizado (Opcional)",
            customPromptPlaceholder: "ex. A história deve ser uma comédia, não deve conter violência...",
            negativePromptLabel: "Prompt Negativo (Opcional)",
            negativePromptPlaceholder: "ex. Evitar finais tristes, не mencionar aranhas...",
        },
        contribute: {
            title: 'O Que Acontece Depois?',
            description: 'Adicione ideias dos alunos para o próximo capítulo.',
            placeholder: 'Escreva uma ideia de aluno e pressione enter...',
            continueButton: 'Continuar História',
            suggestionButton: 'Sugestão de IA'
        },
        story: {
            titlePlaceholder: 'A História Aparecerá Aqui',
            storyPlaceholder: 'Comece definindo seus personagens e cenário, depois inicie a história!',
        },
        history: {
            title: 'Histórico de Histórias',
            createdAt: 'Criado',
            noStories: 'Nenhuma história ainda.',
        },
        deleteDialog: {
            title: 'Excluir esta história?',
            description: 'Esta ação é permanente e não pode ser desfeita.',
        },
        toastDeleted: 'História excluída.',
        toastDeleteFailed: 'Falha ao excluir história.',
        toastNarrationSuccess: 'A narração completa da história está sendo gerada e aparecerá em breve.',
        newStoryButton: 'Iniciar uma Nova História',
        narrateButton: 'Narrar Capítulo',
        'narrateButton--loading': 'Narrando...',
        narrateFullStoryButton: 'Narrar como Audiolivro',
        suggestions: {
            button: 'Sugerir com IA',
            toastSuccess: 'Ideias sugeridas!'
        },
        finishButton: 'Finalizar História',
        test: {
            createButton: 'Criar Teste da História',
            modalTitle: 'Gerar Teste',
            modalDescription: 'Selecione o tipo de teste que deseja gerar a partir desta história.',
            typeLabel: 'Tipo de Teste',
            types: {
                title: 'Tipo de Teste',
                'multiple-choice': 'Múltipla Escolha',
                'true-false': 'Verdadeiro ou Falso',
                'open-ended': 'Perguntas Abertas',
                'mixed': 'Misto',
            },
            generateButton: 'Gerar Teste',
            generateError: 'Falha ao gerar teste.',
            saveSuccess: 'Teste salvo com sucesso!',
            saveError: 'Falha ao salvar teste.',
            previewTitle: 'Visualização do Teste Gerado',
            previewDescription: 'Revise o teste gerado. Ele já foi salvo e pode ser visualizado na página de Testes.',
            rubricTitle: 'Rúbrica de Avaliação',
            saveButton: 'Salvar Teste',
        },
        illustrateButton: 'Ilustrar',
    },
    debateGenerator: {
        title: 'Gerador de Debates',
        description: 'Gere cenários de debate educativos para incentivar o pensamento crítico.',
        topicLabel: 'Tópico do Debate',
        topicPlaceholder: 'ex.: Os animais devem ser mantidos em zoológicos?',
        complexityLabel: 'Complexidade',
        complexities: {
            beginner: 'Iniciante',
            intermediate: 'Intermediário',
            advanced: 'Avançado'
        },
        button: 'Gerar Novo Debate',
        noDebates: {
            title: 'Pronto para Argumentar?',
            description: 'Insira um tópico e uma complexidade para gerar seu primeiro cenário de debate.',
        },
        affirmativeStance: 'Posição Afirmativa',
        negativeStance: 'Posição Negativa',
        guidingQuestions: 'Perguntas Orientadoras',
        rules: 'Regras do Debate',
        toastDeleted: 'Debate excluído.',
        toastDeleteFailed: 'Falha ao excluir debate.',
        deleteDialog: {
            title: 'Excluir este debate?',
            description: 'Esta ação é permanente e não pode ser desfeita.',
        },
        startSession: "Iniciar Sessão ao Vivo",
        manageSession: "Gerenciar Sessão",
        turnStructureTitle: "Estrutura de Turnos do Debate",
        currentTurn: "Turno Atual",
        notStarted: "O debate ainda não começou",
        paused: "Debate Pausado",
        start: "Iniciar Debate",
        nextTurn: "Próximo Turno",
        pause: "Pausar",
        resume: "Retomar",
        liveSession: {
            title: "Sessão de Debate em Andamento",
            description: "Compartilhe este código QR ou link com seus alunos para iniciar o debate.",
            qrCode: "Código QR",
            link: "Link Direto",
            copy: "Copiar",
            copied: "Copiado!",
            studentsConnected: "Alunos Conectados",
            noStudentsYet: "Nenhum aluno conectado ainda.",
            affirmative: 'Afirmativo',
            negative: 'Negativo',
            unassigned: 'Não Atribuído',
            both: 'Ambos',
            teacher: 'Professor',
            closeSession: "Encerrar Sessão",
            sessionClosed: "A sessão foi encerrada."
        }
    },
    digitalConviviality: {
        title: 'Cidadania Digital',
        description: 'Ferramentas para fomentar um comportamento online positivo e responsável.',
        activities: {
            title: 'Atividades',
            description: 'Gere uma atividade para praticar habilidades de cidadania digital.',
        },
        conflictSimulation: {
            title: 'Simulação de Conflitos',
            description: 'Pratique como lidar com situações online difíceis gerando um cenário de conflito hipotético.',
            topicsLabel: 'Tópicos do Conflito (Opcional)',
            topicsPlaceholder: 'ex. cyberbullying, desinformação, plágio',
            button: 'Gerar Cenário',
            scenarioTitle: 'Cenário Gerado',
            strategiesTitle: 'Estratégias de Intervenção',
            strategyLabel: 'Estratégia',
            outcomeLabel: 'Resultado Simulado',
            noScenario: {
                title: 'Pronto para Praticar?',
                description: 'Gere um cenário para praticar suas habilidades de resolução de conflitos.',
            },
            deleteDialog: {
                title: 'Excluir este cenário?',
                description: 'Isso excluirá permanentemente este cenário de conflito do seu histórico.',
                confirm: 'Excluir',
            },
            history: {
                title: 'Histórico de Cenários'
            }
        },
        pact: {
            title: 'Pacto Digital',
            description: 'Gere colaborativamente um conjunto de regras de sala de aula para uma interação digital saudável.',
            studentCountLabel: 'Número de Alunos',
            mainConcernsLabel: 'Principais Preocupações (Opcional)',
            mainConcernsPlaceholder: 'ex. uso de redes sociais, respeito à privacidade',
            button: 'Gerar Rascunho do Pacto',
            saveDraftButton: 'Salvar Rascunho',
            publishButton: 'Publicar',
            republishButton: 'Republicar',
            publishedAt: 'Publicado em {date} (v{version})',
            noPacts: {
                title: 'Pronto para um Pacto?',
                description: 'Defina os parâmetros da sua turma e gere um rascunho do seu pacto de convivência digital.'
            },
            deleteDialog: {
                title: 'Excluir este Pacto?',
                description: 'Isso excluirá permanentemente o pacto gerado.',
                confirm: 'Excluir'
            },
            history: {
                title: 'Histórico de Pactos',
                principles: 'Princípios Orientadores',
                norms: 'Normas Específicas',
                consequences: 'Consequências Restaurativas',
                level: 'Nível',
                restorativeAction: 'Ação Restauradora'
            }
        },
        typeLabel: 'Tipo de Atividade',
        typePlaceholder: 'Selecione um tipo...',
        types: {
            'netiquette-challenge': 'Desafio de Netiqueta',
            'digital-collaboration': 'Jogo de Colaboração Digital',
            'positive-messaging': 'Reescritor de Mensagens Positivas'
        },
        customPromptLabel: 'Foco Específico (Opcional)',
        customPromptPlaceholder: 'ex. Focar em comentários de redes sociais...',
        button: 'Gerar Atividade',
        history: {
            title: 'Histórico de Atividades',
            studentInstructions: 'Instruções para os Alunos',
            pedagogicalObjectives: 'Objetivos Pedagógicos',
            materials: 'Materiais',
            noMaterials: 'Nenhum material fornecido.',
            steps: 'Passos',
        },
        noActivities: {
            title: 'Pronto para Promover Bons Hábitos Digitais?',
            description: 'Selecione um tipo de atividade acima para gerar seu primeiro exercício de cidadania digital.'
        },
        deleteDialog: {
            title: 'Excluir esta atividade?',
            description: 'Esta ação é permanente e não pode ser desfeita.',
            confirm: 'Excluir'
        }
    },
    suggestions: {
        button: 'Sugerir com IA',
        toastSuccess: 'Tópico sugerido!'
    }
} as const;
