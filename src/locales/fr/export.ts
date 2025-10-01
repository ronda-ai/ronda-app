export default {
    title: 'Exporter les données',
    tagline: 'Téléchargez les données de votre classe dans différents formats.',
    exportData: 'Exporter les données',
    exportDescription:
      'Sélectionnez le type de données et le format que vous souhaitez exporter.',
    dataType: 'Données à exporter',
    dataTypePlaceholder: 'Sélectionnez le type de données...',
    format: 'Format d\'exportation',
    formatPlaceholder: 'Sélectionnez le format...',
    exportButton: 'Générer et télécharger',
    toastSuccess: 'L\'exportation a démarré avec succès !',
    toastError: 'Échec de l\'exportation des données. Veuillez réessayer.',
    dataTypes: {
      students: 'Liste des élèves',
      attendance: 'Historique des présences',
      evaluations: 'Évaluations des défis',
    },
    filtersTitle: 'Filtres (facultatif)',
    studentFilter: 'Filtrer par élève(s)',
    studentPlaceholder: 'Tous les élèves',
    dateFilter: 'Filtrer par date',
    noStudents: 'Aucun élève trouvé'
} as const;
