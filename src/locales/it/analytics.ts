export default {
    title: 'Analisi',
    tagline: 'Visualizza la frequenza e la partecipazione degli studenti.',
    filters: {
      title: 'Filtri',
      dateRange: 'Intervallo di Date',
      student: 'Studente',
      allStudents: 'Tutti gli Studenti',
      studentPlaceholder: 'Seleziona studente/i...',
      noStudents: 'Nessuno studente trovato'
    },
    charts: {
      attendance: {
        title: 'Tendenze di Frequenza',
        description: 'Numero di studenti presenti vs. assenti nel tempo.',
      },
      participation: {
        title: 'Distribuzione della Partecipazione',
        description:
          'Conteggio totale della partecipazione per ogni studente nell\'intervallo selezionato.',
        legend: 'Partecipazioni'
      },
    },
} as const;
