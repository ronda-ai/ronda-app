
export default {
    title: 'Analityka',
    tagline: 'Wizualizuj obecność i uczestnictwo uczniów.',
    filters: {
      title: 'Filtry',
      dateRange: 'Zakres dat',
      student: 'Uczeń',
      allStudents: 'Wszyscy uczniowie',
      studentPlaceholder: 'Wybierz ucznia (uczniów)...',
      noStudents: 'Nie znaleziono uczniów'
    },
    charts: {
      attendance: {
        title: 'Trendy obecności',
        description: 'Liczba obecnych i nieobecnych uczniów w czasie.',
      },
      participation: {
        title: 'Rozkład uczestnictwa',
        description:
          'Całkowita liczba uczestnictw dla każdego ucznia w wybranym zakresie.',
        legend: 'Uczestnictwa'
      },
    },
} as const;
