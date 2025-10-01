
export default {
    title: 'Exportar Datos',
    tagline: 'Descarga los datos de tu clase en varios formatos.',
    exportData: 'Exportar Datos',
    exportDescription:
      'Selecciona el tipo de datos y el formato que deseas exportar.',
    dataType: 'Datos a Exportar',
    dataTypePlaceholder: 'Selecciona el tipo de datos...',
    format: 'Formato de Exportación',
    formatPlaceholder: 'Selecciona el formato...',
    exportButton: 'Generar y Descargar',
    toastSuccess: '¡La exportación comenzó con éxito!',
    toastError: 'Error al exportar los datos. Por favor, inténtalo de nuevo.',
    dataTypes: {
      students: 'Lista de Estudiantes',
      attendance: 'Historial de Asistencia',
      evaluations: 'Evaluaciones de Desafíos',
    },
    filtersTitle: 'Filtros (Opcional)',
    studentFilter: 'Filtrar por Estudiante(s)',
    studentPlaceholder: 'Todos los estudiantes',
    dateFilter: 'Filtrar por Fecha',
    noStudents: 'No se encontraron estudiantes',
    formats: {
        csv: 'CSV',
        json: 'JSON',
        excel: 'Excel (XLSX)',
        word: 'Word (DOCX)',
        html: 'HTML'
    }
} as const;
