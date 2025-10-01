export default {
    title: 'Esporta Dati',
    tagline: 'Scarica i dati della tua classe in vari formati.',
    exportData: 'Esporta Dati',
    exportDescription:
      'Seleziona il tipo di dati e il formato che desideri esportare.',
    dataType: 'Dati da Esportare',
    dataTypePlaceholder: 'Seleziona tipo di dati...',
    format: 'Formato di Esportazione',
    formatPlaceholder: 'Seleziona formato...',
    exportButton: 'Genera e Scarica',
    toastSuccess: 'Esportazione avviata con successo!',
    toastError: 'Impossibile esportare i dati. Riprova.',
    dataTypes: {
      students: 'Elenco Studenti',
      attendance: 'Storico Frequenze',
      evaluations: 'Valutazioni Sfide',
    },
    filtersTitle: 'Filtri (Opzionale)',
    studentFilter: 'Filtra per Studente(i)',
    studentPlaceholder: 'Tutti gli studenti',
    dateFilter: 'Filtra per Data',
    noStudents: 'Nessuno studente trovato'
} as const;
