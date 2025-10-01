export default {
    title: 'Atividades Individuais',
    tagline: 'Projete atividades personalizadas para um aluno específico.',
    step0: {
        title: 'Selecionar um Aluno',
        description: 'Escolha um aluno para começar a gerar atividades personalizadas.',
    },
    step1: {
      selectLabel: 'Aluno',
      selectPlaceholder: 'Selecionar um aluno...',
    },
    generator: {
        title: 'Gerador de Atividades para {name}',
        description: 'Defina os parâmetros para a atividade ou use a IA para sugerir ideias.',
        topicLabel: 'Tópico Acadêmico',
        topicPlaceholder: 'ex.: Frações, Fotossíntese',
        skillsLabel: 'Habilidades a Desenvolver',
        skillsPlaceholder: 'ex.: Pensamento Crítico, Colaboração',
        themesLabel: 'Temas de Engajamento',
        themesPlaceholder: 'ex.: Espaço, Dinossauros, Mistérios',
        customPromptLabel: 'Prompt Personalizado (Opcional)',
        customPromptPlaceholder: 'ex.: Focar em elementos visuais, tornar uma atividade prática',
        negativePromptLabel: 'Prompt Negativo (Opcional)',
        negativePromptPlaceholder: 'ex.: Evitar tarefas de escrita, não mencionar aranhas',
        generateButton: 'Gerar Atividades',
        toastSuccess: 'Atividades geradas com sucesso!',
        noSkills: 'Nenhuma habilidade disponível ainda.',
        addSkills: 'Adicionar novas habilidades'
    },
    suggestions: {
        button: 'Sugerir com IA',
        toastSuccess: 'Sugestões preenchidas!',
    },
    history: {
        title: "Histórico de Planos de Atividade",
        description: "Revise e gerencie planos de atividade gerados anteriormente para {name}.",
        toastDeleted: 'Plano de atividade excluído.',
        toastDeleteFailed: 'Falha ao excluir plano de atividade.',
        noResults: {
            title: "Nenhum Plano de Atividade Ainda",
            description: "Gere o primeiro plano para este aluno para ver seu histórico aqui."
        },
        deleteDialog: {
            title: "Excluir este plano de atividade?",
            description: "Esta ação não pode ser desfeita. Isso excluirá permanentemente o plano de atividade.",
        },
        stepDialog: {
            title: 'Avaliar Etapa de Atividade',
            description: 'Como foi esta atividade?',
            status: 'Status',
            feedback: 'Feedback da Etapa (opcional)',
            feedbackPlaceholder: 'Adicione uma nota sobre esta atividade...',
            saveButton: 'Salvar Avaliação',
            statuses: {
                pending: 'Pendente',
                'in-progress': 'Em Andamento',
                completed: 'Concluída',
                skipped: 'Ignorado'
            },
        },
    },
    democratizer: {
      title: 'Democratizador de Recursos',
      descriptionSingle: 'Adapte esta atividade para torná-la mais acessível.',
      descriptionAll: 'Adapte todas as atividades deste plano para torná-las mais acessíveis de acordo com diferentes necessidades ou limitações de recursos.',
      descriptionSelected: 'Adapte as {count} atividades selecionadas neste plano para torná-las mais acessíveis.',
      prompt: 'Selecione uma opção de adaptação para aplicar às atividades.',
      selectPlaceholder: 'Escolha uma adaptação...',
      activitiesToAdapt: "Atividades a Adaptar:",
      adaptButton: 'Adaptar Atividades',
      toastSuccess: 'Atividades adaptadas com sucesso!',
      options: {
        commonMaterials: 'Adaptar para materiais domésticos comuns',
        lowEnergy: 'Adaptar para cenários de baixa energia/calmos',
        socialInteraction: 'Aumentar componente de interação social',
        simpleInstructions: 'Simplificar instruções',
      },
    }
} as const;
