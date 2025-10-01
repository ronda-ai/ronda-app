
export default {
    title: 'Analíticas',
    tagline: 'Visualiza la asistencia y participación de los estudiantes.',
    filters: {
      title: 'Filtros',
      dateRange: 'Rango de Fechas',
      student: 'Estudiante',
      allStudents: 'Todos los Estudiantes',
      studentPlaceholder: 'Seleccionar estudiante(s)...',
      noStudents: 'No se encontraron estudiantes'
    },
    charts: {
      attendance: {
        title: 'Tendencias de Asistencia',
        description:
          'Número de estudiantes presentes vs. ausentes a lo largo del tiempo.',
      },
      participation: {
        title: 'Distribución de Participación',
        description:
          'Conteo total de participación por cada estudiante en el rango seleccionado.',
        legend: 'Participaciones'
      },
    },
} as const;
