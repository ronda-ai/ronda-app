
export default {
    title: 'Eksportuj dane',
    tagline: 'Pobierz dane swojej klasy w różnych formatach.',
    exportData: 'Eksportuj dane',
    exportDescription:
      'Wybierz typ danych i format, w jakim chcesz je wyeksportować.',
    dataType: 'Dane do eksportu',
    dataTypePlaceholder: 'Wybierz typ danych...',
    format: 'Format eksportu',
    formatPlaceholder: 'Wybierz format...',
    exportButton: 'Generuj i pobierz',
    toastSuccess: 'Eksport rozpoczęty pomyślnie!',
    toastError: 'Nie udało się wyeksportować danych. Spróbuj ponownie.',
    dataTypes: {
      students: 'Lista uczniów',
      attendance: 'Historia obecności',
      evaluations: 'Oceny wyzwań',
    },
    filtersTitle: 'Filtry (opcjonalnie)',
    studentFilter: 'Filtruj według ucznia (uczniów)',
    studentPlaceholder: 'Wszyscy uczniowie',
    dateFilter: 'Filtruj według daty',
    noStudents: 'Nie znaleziono uczniów'
} as const;
