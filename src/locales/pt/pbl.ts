
export default {
    title: 'Laboratório PBL',
    tagline: 'Orquestre projetos complexos a partir de uma única ideia.',
    tabs: {
        phase1: 'Fase 1: Planejamento',
        phase2: 'Fase 2: Equipes',
        phase3: 'Fase 3: Desenvolvimento',
        phase4: 'Fase 4: Avaliação',
    },
    phase1: {
        form: {
            title: 'Fase 1: Planejador de Projetos',
            description: 'Defina um tópico central e deixe a IA construir um plano de projeto estruturado.',
            topicLabel: 'Tópico Central do Projeto',
            topicPlaceholder: 'ex. Mudanças climáticas em nossa cidade, História dos videogames...',
            skillsLabel: 'Habilidades Chave a Desenvolver',
            noSkills: 'Nenhuma habilidade definida ainda. Vá para o Gerador de Atividades para adicionar algumas.',
            durationLabel: 'Duração Estimada',
            durations: {
                'oneWeek': '1 Semana',
                'twoWeeks': '2 Semanas',
                'oneMonth': '1 Mês',
            },
            generateButton: 'Gerar Plano de Projeto'
        },
        generating: {
            title: 'Gerando Plano de Projeto...'
        },
    },
    phase2: {
        title: 'Fase 2: Formação de Equipes',
        description: 'Use a IA para formar grupos estratégicos com base nos perfis e relacionamentos de seus alunos.',
        selectProject: 'Selecionar Projeto',
        selectProjectPlaceholder: 'Escolha um projeto para formar equipes...',
        teamSize: 'Tamanho da Equipe',
        groupingCriteria: 'Critérios de Agrupamento',
        criteria: {
            balanced: 'Equipes Balanceadas',
            'social-remediation': 'Remediação Social',
            synergy: 'Sinergia de Interesses',
        },
        generateButton: 'Gerar Equipes',
        noProjectSelected: 'Por favor, selecione um projeto primeiro.',
        results: {
            title: 'Equipes Sugeridas',
            teamName: 'Equipe {name}',
            rationale: 'Justificativa da Equipe',
            formation: 'Formação',
            deleteDialog: {
                title: 'Excluir esta formação de equipe?',
                description: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente a formação da equipe.',
            },
        },
        table: {
            student: 'Aluno',
            suggestedRole: 'Função Sugerida',
            justification: 'Justificativa',
        }
    },
    phase3: {
        title: 'Fase 3: Andaime Dinâmico',
        description: 'Gere planos de intervenção rápidos para equipes que enfrentam desafios durante o desenvolvimento do projeto.',
        selectTeam: 'Equipe para Intervir',
        selectTeamPlaceholder: 'Selecionar alunos...',
        problemLabel: 'Descreva o Problema',
        problemPlaceholder: 'ex. A equipe está travada, há um conflito, um aluno está desmotivado...',
        generateButton: 'Gerar Intervenção',
        suggestionTitle: 'Intervenção Sugerida',
        microActivity: 'Micro-Atividade para Desbloquear',
        guidingQuestions: 'Perguntas Orientadoras para o Professor',
        noSuggestion: 'O plano de intervenção gerado aparecerá aqui.',
    },
    phase4: {
        title: 'Fase 4: Gerador de Rúbricas',
        description: 'Gere uma rubrica de avaliação detalhada para o produto final de um projeto.',
        generateButton: 'Gerar Rúbrica',
        rubricTitle: 'Rúbrica de Avaliação Sugerida',
        noRubric: 'A rubrica gerada aparecerá aqui.',
    },
    history: {
        title: 'Histórico de Projetos',
        description: 'Revise e gerencie projetos gerados anteriormente.',
        noResults: {
            title: 'Nenhum Projeto Ainda',
            description: 'Use o formulário para gerar seu primeiro plano de Aprendizagem Baseada em Projetos.'
        },
        phases: 'Fases do Projeto',
        milestones: 'Marcos Importantes',
        finalProduct: 'Sugestão de Produto Final',
        deleteDialog: {
            title: 'Excluir este plano de projeto?',
            description: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente o plano de projeto.',
        },
    },
} as const;
