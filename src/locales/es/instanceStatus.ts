
export default {
    title: 'Estado de la Instancia',
    tagline: 'Monitoriza el uso de recursos y gestiona los archivos generados.',
    loadError: 'Error al cargar el estado de la instancia. Por favor, inténtelo de nuevo más tarde.',
    storage: {
        title: 'Uso de Almacenamiento',
        description: 'Tamaño total de los archivos de audio almacenados en la base de datos.',
        totalSize: 'Tamaño Total',
        totalFiles: 'Archivos Totales',
    },
    files: {
        title: 'Archivos Almacenados',
        description: 'Lista de todos los archivos de audio generados para narraciones.',
        noFiles: 'No se han encontrado archivos de audio generados.',
        filename: 'Nombre del Archivo',
        size: 'Tamaño',
        uploadDate: 'Fecha de Subida',
        actions: 'Acciones',
        cleanupButton: 'Limpiar Todos los Audios',
    },
    deleteDialog: {
        title: '¿Eliminar Archivo?',
        description: '¿Estás seguro de que quieres eliminar el archivo {filename}? Esta acción es irreversible.',
        confirm: 'Eliminar',
    },
    cleanupDialog: {
        title: '¿Limpiar Todos los Archivos de Audio?',
        description: 'Esta acción eliminará PERMANENTEMENTE todos los archivos de audio generados. Las narraciones de capítulos ya no estarán disponibles. ¿Estás seguro de que quieres continuar?',
        confirm: 'Sí, eliminar todo',
    },
    toastDeleteSuccess: 'Archivo eliminado con éxito.',
    toastDeleteError: 'Error al eliminar el archivo.',
    toastCleanupSuccess: 'Todos los archivos de audio han sido eliminados.',
    toastCleanupError: 'Error durante la limpieza de archivos.',
} as const;
