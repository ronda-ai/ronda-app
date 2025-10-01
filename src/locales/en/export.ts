
export default {
    title: 'Export Data',
    tagline: 'Download your classroom data in various formats.',
    exportData: 'Export Data',
    exportDescription:
      'Select the data type and format you would like to export.',
    dataType: 'Data to Export',
    dataTypePlaceholder: 'Select data type...',
    format: 'Export Format',
    formatPlaceholder: 'Select format...',
    exportButton: 'Generate and Download',
    toastSuccess: 'Export started successfully!',
    toastError: 'Failed to export data. Please try again.',
    dataTypes: {
      students: 'Student Roster',
      attendance: 'Attendance History',
      evaluations: 'Challenge Evaluations',
    },
    filtersTitle: 'Filters (Optional)',
    studentFilter: 'Filter by Student(s)',
    studentPlaceholder: 'All Students',
    dateFilter: 'Filter by Date',
    noStudents: 'No students found',
    formats: {
        csv: 'CSV',
        json: 'JSON',
        excel: 'Excel (XLSX)',
        word: 'Word (DOCX)',
        html: 'HTML'
    }
} as const;
