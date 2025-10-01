export default {
    title: 'Analytik',
    tagline: 'Visualisieren Sie die Anwesenheit und Teilnahme der Schüler.',
    filters: {
      title: 'Filter',
      dateRange: 'Datumsbereich',
      student: 'Schüler',
      allStudents: 'Alle Schüler',
      studentPlaceholder: 'Schüler auswählen...',
      noStudents: 'Keine Schüler gefunden'
    },
    charts: {
      attendance: {
        title: 'Anwesenheitstrends',
        description: 'Anzahl der anwesenden vs. abwesenden Schüler im Zeitverlauf.',
      },
      participation: {
        title: 'Teilnahmeverteilung',
        description:
          'Gesamte Teilnahmeanzahl für jeden Schüler im ausgewählten Bereich.',
        legend: 'Teilnahmen'
      },
    },
} as const;
