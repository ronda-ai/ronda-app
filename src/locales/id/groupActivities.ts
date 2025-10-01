
export default {
    title: 'Aktivitas Kelompok',
    tagline: 'Bentuk kelompok secara cerdas dan hasilkan aktivitas kolaboratif.',
    generator: {
      title: 'Generator Saran Kelompok',
      description: 'AI akan menganalisis kelas Anda untuk menyarankan kelompok yang seimbang dan tips fasilitasi.',
      button: 'Hasilkan Saran Baru',
    },
    manualMode: {
        title: 'Pembangun Kelompok Manual',
        description: 'Buat grup Anda sendiri dan dapatkan bantuan AI.',
        selectLabel: 'Pilih siswa untuk grup baru',
        selectPlaceholder: 'Pilih siswa...',
        createGroupButton: 'Buat Grup',
        groupTitle: 'Grup Baru',
        analyzeButton: 'Analisis Dinamika',
        generateActivityButton: 'Hasilkan Aktivitas',
        warningTitle: 'Peringatan Hubungan',
        conflictWarning: '{nameA} dan {nameB} memiliki konflik yang tercatat. Lanjutkan dengan hati-hati.',
        skillsLabel: 'Keterampilan Kolaboratif untuk Dikembangkan',
        skillsPlaceholder: 'misalnya, Komunikasi, Kepemimpinan',
        themesLabel: 'Tema Aktivitas (Opsional)',
        themesPlaceholder: 'misalnya, Misi Luar Angkasa, Pemecahan Misteri',
        activityGeneratedToast: 'Aktivitas berhasil dibuat!',
    },
    aiSuggestions: {
        title: 'Saran yang Dihasilkan AI',
    },
    history: {
      title: 'Riwayat Saran',
      description: 'Tinjau saran grup yang dibuat sebelumnya.',
      suggestionFor: 'Saran dari {date}',
      teacherTipTitle: 'Tips Fasilitator',
      suggestedGroups: 'Grup yang Disarankan',
      group: 'Grup',
      suggestedSkills: 'Keterampilan Kolaboratif yang Disarankan',
      suggestedThemes: 'Tema Aktivitas yang Disarankan',
      useSuggestionButton: 'Gunakan Saran Ini',
      suggestionUsedToast: 'Saran diterapkan ke pembangun grup manual!',
      noResults: {
        title: 'Siap Berkolaborasi?',
        description: 'Klik tombol di atas untuk menghasilkan set saran grup pertama untuk kelas Anda.',
      },
      toastDeleted: 'Saran dihapus.',
      toastDeleteFailed: 'Gagal menghapus saran.',
      deleteDialog: {
        title: 'Hapus saran ini?',
        description: 'Tindakan ini bersifat permanen dan tidak dapat dibatalkan.',
      },
    },
    viewActivitiesButton: 'Lihat Aktivitas yang Dihasilkan',
    details: {
        title: 'Aktivitas yang Dihasilkan untuk Grup',
        description: 'Aktivitas berikut dihasilkan untuk {members}.',
        deleteButton: 'Hapus Rencana Aktivitas',
    }
} as const;
