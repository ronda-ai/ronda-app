
export default {
    title: 'Gegevens Exporteren',
    tagline: 'Download uw klasgegevens in verschillende formaten.',
    exportData: 'Gegevens Exporteren',
    exportDescription:
      'Selecteer het gegevenstype en formaat dat u wilt exporteren.',
    dataType: 'Gegevens om te Exporteren',
    dataTypePlaceholder: 'Selecteer gegevenstype...',
    format: 'Exportformaat',
    formatPlaceholder: 'Selecteer formaat...',
    exportButton: 'Genereer en Download',
    toastSuccess: 'Export succesvol gestart!',
    toastError: 'Kon gegevens niet exporteren. Probeer het opnieuw.',
    dataTypes: {
      students: 'Studentenlijst',
      attendance: 'Aanwezigheidsgeschiedenis',
      evaluations: 'Uitdagingsevaluaties',
    },
    filtersTitle: 'Filters (Optioneel)',
    studentFilter: 'Filter op Student(en)',
    studentPlaceholder: 'Alle studenten',
    dateFilter: 'Filter op Datum',
    noStudents: 'Geen studenten gevonden'
} as const;
