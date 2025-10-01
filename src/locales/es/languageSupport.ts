
export default {
      title: 'Apoyo Lingüístico',
      tagline: 'Genera materiales bilingües para apoyar la inclusión lingüística.',
      form: {
          title: 'Asistente de Inclusión Lingüística',
          description: 'Selecciona un estudiante y especifica su idioma para generar materiales de apoyo personalizados.',
          studentLabel: 'Estudiante',
          studentPlaceholder: 'Selecciona un estudiante...',
          languageLabel: "Idioma Nativo del Estudiante",
          languagePlaceholder: 'ej. Español, Francés, Mandarín',
          focusAreasLabel: 'Áreas de Enfoque',
          generateButton: 'Generar Material de Apoyo',
      },
      focusAreas: {
          reading: 'Comprensión Lectora',
          writing: 'Habilidades de Escritura',
          speaking: 'Expresión Oral',
          listening: 'Comprensión Auditiva',
          'social-emotional': 'Integración Socioemocional',
      },
      addFocusAreaDialog: {
        title: 'Añadir Nuevas Áreas de Enfoque',
        description: 'Selecciona de las sugerencias de la IA o añade tus propias áreas de enfoque a la lista.',
        customPromptLabel: 'Guía a la IA (Opcional)',
        customPromptPlaceholder: 'ej. Enfócate en áreas de lectoescritura...',
        manualAreaLabel: 'O Añade un Área Manualmente',
        manualAreaPlaceholder: 'Escribe una nueva área...',
        noSuggestions: 'No hay sugerencias disponibles. Intenta refrescar o cambiar tu instrucción.',
        add: 'Añadir:',
        addSelected: 'Añadir Seleccionadas',
        toastSuccess: '¡Áreas de enfoque añadidas con éxito!',
        toastError: 'Error al añadir las áreas de enfoque.',
      },
      editFocusAreaDialog: {
        title: 'Editar Área de Enfoque: {name}',
        areaNameLabel: 'Nombre del Área de Enfoque',
        deleteButton: 'Eliminar Área',
        toastUpdateSuccess: '¡Área de enfoque actualizada con éxito!',
        toastUpdateError: 'Error al actualizar el área de enfoque.',
        toastDeleteSuccess: '¡Área de enfoque eliminada con éxito!',
        toastDeleteError: 'Error al eliminar el área de enfoque.',
        deleteDialog: {
            title: '¿Estás seguro?',
            description: 'Esto eliminará permanentemente el área de enfoque "{name}" de la lista.',
            cancel: 'Cancelar',
            confirm: 'Eliminar'
        }
      },
      generatingTitle: 'Generando Material de Apoyo...',
      history: {
          title: 'Historial de Materiales Generados',
          description: 'Revisa los materiales generados previamente para el estudiante seleccionado.',
          selectStudentPrompt: {
            title: 'Selecciona un Estudiante',
            description: 'Elige un estudiante del formulario para ver su historial y generar nuevos materiales.',
          },
          noResults: {
              title: 'Aún no hay Materiales',
              description: 'Usa el formulario para generar el primer material de apoyo para este estudiante.',
          },
          header: 'Material para {language}',
          teacherGuide: 'Guía para el Profesor',
          studentMaterial: 'Material para el Alumno',
          feedbackTitle: "Feedback del Profesor",
          feedbackPlaceholder: '¿Fue útil este material? Tu feedback ayuda a mejorar futuras sugerencias.',
          toastDeleted: 'Material de apoyo eliminado.',
          toastDeleteFailed: 'Error al eliminar el material de apoyo.',
          deleteDialog: {
            title: '¿Eliminar este material?',
            description: 'Esta acción no se puede deshacer. Esto eliminará permanentemente el material de apoyo generado.',
          },
          translationTitle: "Traducción para {language}",
          showTranslation: "Mostrar Traducción",
          hideTranslation: "Ocultar Tradución",
      }
} as const;
