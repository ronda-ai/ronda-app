
export default {
    title: 'Analyse',
    tagline: 'Visualiseer de aanwezigheid en deelname van studenten.',
    filters: {
      title: 'Filters',
      dateRange: 'Datumbereik',
      student: 'Student',
      allStudents: 'Alle studenten',
      studentPlaceholder: 'Selecteer student(en)...',
      noStudents: 'Geen studenten gevonden'
    },
    charts: {
      attendance: {
        title: 'Aanwezigheidstrends',
        description: 'Aantal aanwezige versus afwezige studenten in de loop van de tijd.',
      },
      participation: {
        title: 'Deelnameverdeling',
        description:
          'Totaal aantal deelnames voor elke student in het geselecteerde bereik.',
        legend: 'Deelnames'
      },
    },
} as const;
