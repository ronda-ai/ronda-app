export default {
    title: 'Analytics',
    tagline: 'Visualize student attendance and participation.',
    filters: {
      title: 'Filters',
      dateRange: 'Date Range',
      student: 'Student',
      allStudents: 'All Students',
      studentPlaceholder: 'Select student(s)...',
      noStudents: 'No students found'
    },
    charts: {
      attendance: {
        title: 'Attendance Trends',
        description: 'Number of students present vs. absent over time.',
      },
      participation: {
        title: 'Participation Distribution',
        description:
          'Total participation count for each student in the selected range.',
        legend: 'Participations'
      },
    },
} as const;
