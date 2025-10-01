
export default {
    title: 'Atividades em Grupo',
    tagline: 'Forme grupos inteligentemente e gere atividades colaborativas.',
    generator: {
      title: 'Gerador de Sugestões de Grupo',
      description: 'A IA analisará sua classe para sugerir grupos balanceados e uma dica de facilitação.',
      button: 'Gerar Novas Sugestões',
    },
    manualMode: {
        title: 'Construtor de Grupo Manual',
        description: 'Crie seus próprios grupos e obtenha assistência com IA.',
        selectLabel: 'Selecionar alunos para um novo grupo',
        selectPlaceholder: 'Escolher alunos...',
        createGroupButton: 'Criar Grupo',
        groupTitle: 'Novo Grupo',
        analyzeButton: 'Analisar Dinâmicas',
        generateActivityButton: 'Gerar Atividade',
        warningTitle: 'Alerta de Relacionamento',
        conflictWarning: '{nameA} e {nameB} têm um conflito registrado. Prossiga com cautela.',
        skillsLabel: 'Habilidades Colaborativas a Desenvolver',
        skillsPlaceholder: 'ex.: Comunicação, Liderança',
        themesLabel: 'Tema da Atividade (Opcional)',
        themesPlaceholder: 'ex.: Missão Espacial, Resolução de Mistério',
        activityGeneratedToast: 'Atividade gerada com sucesso!',
    },
    aiSuggestions: {
        title: 'Sugestões Geradas por IA',
    },
    history: {
      title: 'Histórico de Sugestões',
      description: 'Revise as sugestões de grupos geradas anteriormente.',
      suggestionFor: 'Sugestão de {date}',
      teacherTipTitle: 'Dica do Facilitador',
      suggestedGroups: 'Grupos Sugeridos',
      group: 'Grupo',
      suggestedSkills: 'Habilidades Colaborativas Sugeridas',
      suggestedThemes: 'Temas de Atividade Sugeridos',
      useSuggestionButton: 'Usar esta Sugestão',
      suggestionUsedToast: 'Sugestão aplicada ao construtor de grupo manual!',
      noResults: {
        title: 'Pronto para Colaborar?',
        description: 'Clique no botão acima para gerar o primeiro conjunto de sugestões de grupo para sua classe.',
      },
      toastDeleted: 'Sugestão excluída.',
      toastDeleteFailed: 'Falha ao excluir sugestão.',
      deleteDialog: {
        title: 'Excluir esta sugestão?',
        description: 'Esta ação é permanente e não pode ser desfeita.',
      },
    },
    viewActivitiesButton: 'Ver Atividades Geradas',
    details: {
        title: 'Atividades Geradas para o Grupo',
        description: 'As seguintes atividades foram geradas para {members}.',
        deleteButton: 'Excluir Plano de Atividades',
    }
} as const;
