export default {
    title: 'Análises',
    tagline: 'Visualize a frequência e participação dos alunos.',
    filters: {
      title: 'Filtros',
      dateRange: 'Intervalo de Datas',
      student: 'Aluno',
      allStudents: 'Todos os Alunos',
      studentPlaceholder: 'Selecionar aluno(s)...',
      noStudents: 'Nenhum aluno encontrado'
    },
    charts: {
      attendance: {
        title: 'Tendências de Frequência',
        description: 'Número de alunos presentes vs. ausentes ao longo do tempo.',
      },
      participation: {
        title: 'Distribuição de Participação',
        description:
          'Contagem total de participação para cada aluno no intervalo selecionado.',
        legend: 'Participações'
      },
    },
} as const;
