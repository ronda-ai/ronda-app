export default {
    title: 'Daten exportieren',
    tagline: 'Laden Sie Ihre Klassendaten in verschiedenen Formaten herunter.',
    exportData: 'Daten exportieren',
    exportDescription:
      'Wählen Sie den Datentyp und das Format aus, das Sie exportieren möchten.',
    dataType: 'Zu exportierende Daten',
    dataTypePlaceholder: 'Datentyp auswählen...',
    format: 'Exportformat',
    formatPlaceholder: 'Format auswählen...',
    exportButton: 'Generieren und Herunterladen',
    toastSuccess: 'Export erfolgreich gestartet!',
    toastError: 'Fehler beim Exportieren der Daten. Bitte versuchen Sie es erneut.',
    dataTypes: {
      students: 'Schülerliste',
      attendance: 'Anwesenheitsverlauf',
      evaluations: 'Herausforderungsbewertungen',
    },
    filtersTitle: 'Filter (Optional)',
    studentFilter: 'Nach Schüler(n) filtern',
    studentPlaceholder: 'Alle Schüler',
    dateFilter: 'Nach Datum filtern',
    noStudents: 'Keine Schüler gefunden'
} as const;
