
export default {
    title: 'Instance Status',
    tagline: 'Monitor resource usage and manage generated files.',
    loadError: 'Error loading instance status. Please try again later.',
    storage: {
        title: 'Storage Usage',
        description: 'Total size of audio files stored in the database.',
        totalSize: 'Total Size',
        totalFiles: 'Total Files',
    },
    files: {
        title: 'Stored Files',
        description: 'List of all generated audio files for narrations.',
        noFiles: 'No generated audio files found.',
        filename: 'Filename',
        size: 'Size',
        uploadDate: 'Upload Date',
        actions: 'Actions',
        cleanupButton: 'Clean Up All Audios',
    },
    deleteDialog: {
        title: 'Delete File?',
        description: 'Are you sure you want to delete the file {filename}? This action is irreversible.',
        confirm: 'Delete',
    },
    cleanupDialog: {
        title: 'Clean Up All Audio Files?',
        description: 'This will PERMANENTLY delete all generated audio files. Chapter narrations will no longer be available. Are you sure you want to proceed?',
        confirm: 'Yes, delete all',
    },
    toastDeleteSuccess: 'File deleted successfully.',
    toastDeleteError: 'Failed to delete file.',
    toastCleanupSuccess: 'All audio files have been deleted.',
    toastCleanupError: 'Error during file cleanup.',
} as const;
