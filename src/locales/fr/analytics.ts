export default {
    title: 'Analyses',
    tagline: 'Visualisez la présence et la participation des élèves.',
    filters: {
      title: 'Filtres',
      dateRange: 'Plage de dates',
      student: 'Élève',
      allStudents: 'Tous les élèves',
      studentPlaceholder: 'Sélectionner un ou plusieurs élèves...',
      noStudents: 'Aucun élève trouvé'
    },
    charts: {
      attendance: {
        title: 'Tendances de présence',
        description: 'Nombre d\'élèves présents par rapport aux absents au fil du temps.',
      },
      participation: {
        title: 'Répartition de la participation',
        description:
          'Nombre total de participations pour chaque élève dans la plage sélectionnée.',
        legend: 'Participations'
      },
    },
} as const;
