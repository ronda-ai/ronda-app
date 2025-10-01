export default {
    title: 'Aktivitas Individu',
    tagline: 'Rancang aktivitas yang dipersonalisasi untuk siswa tertentu.',
    step0: {
        title: 'Pilih Siswa',
        description: 'Pilih siswa untuk mulai membuat aktivitas yang dipersonalisasi.',
    },
    step1: {
      selectLabel: 'Siswa',
      selectPlaceholder: 'Pilih siswa...',
    },
    generator: {
        title: 'Generator Aktivitas untuk {name}',
        description: 'Tentukan parameter untuk aktivitas, atau gunakan AI untuk menyarankan ide.',
        topicLabel: 'Topik Akademik',
        topicPlaceholder: 'misalnya, Pecahan, Fotosintesis',
        skillsLabel: 'Keterampilan untuk Dikembangkan',
        skillsPlaceholder: 'misalnya, Berpikir Kritis, Kolaborasi',
        themesLabel: 'Tema Keterlibatan',
        themesPlaceholder: 'misalnya, Luar Angkasa, Dinosaurus, Misteri',
        customPromptLabel: 'Prompt Kustom (Opsional)',
        customPromptPlaceholder: 'misalnya, Fokus pada elemen visual, jadikan aktivitas langsung',
        negativePromptLabel: 'Prompt Negatif (Opsional)',
        negativePromptPlaceholder: 'misalnya, Hindari tugas menulis, jangan sebutkan laba-laba',
        generateButton: 'Hasilkan Aktivitas',
        toastSuccess: 'Aktivitas berhasil dibuat!',
    },
    suggestions: {
        button: 'Sarankan dengan AI',
        toastSuccess: 'Saran telah diisi!',
    },
    history: {
        title: "Riwayat Rencana Aktivitas",
        description: "Tinjau dan kelola rencana aktivitas yang dibuat sebelumnya untuk {name}.",
        toastDeleted: 'Rencana aktivitas dihapus.',
        toastDeleteFailed: 'Gagal menghapus rencana aktivitas.',
        noResults: {
            title: "Belum Ada Rencana Aktivitas",
            description: "Hasilkan rencana pertama untuk siswa ini untuk melihat riwayatnya di sini."
        },
        deleteDialog: {
            title: "Hapus rencana aktivitas ini?",
            description: "Tindakan ini tidak dapat dibatalkan. Ini akan menghapus rencana aktivitas secara permanen.",
        },
        stepDialog: {
            title: 'Evaluasi Langkah Aktivitas',
            description: 'Bagaimana aktivitas ini berjalan?',
            status: 'Status',
            feedback: 'Umpan Balik Langkah (opsional)',
            feedbackPlaceholder: 'Tambahkan catatan tentang aktivitas ini...',
            saveButton: 'Simpan Evaluasi',
            statuses: {
                pending: 'Tertunda',
                'in-progress': 'Sedang Berlangsung',
                completed: 'Selesai',
                skipped: 'Dilewati'
            },
        },
    },
    democratizer: {
      title: 'Demokratisasi Sumber Daya',
      descriptionSingle: 'Sesuaikan aktivitas ini agar lebih mudah diakses.',
      descriptionAll: 'Sesuaikan semua aktivitas dalam rencana ini agar lebih mudah diakses sesuai dengan kebutuhan atau keterbatasan sumber daya yang berbeda.',
      descriptionSelected: 'Sesuaikan {count} aktivitas yang dipilih dalam rencana ini agar lebih mudah diakses.',
      prompt: 'Pilih opsi penyesuaian untuk diterapkan pada aktivitas.',
      selectPlaceholder: 'Pilih penyesuaian...',
      activitiesToAdapt: "Aktivitas untuk Disesuaikan:",
      adaptButton: 'Sesuaikan Aktivitas',
      toastSuccess: 'Aktivitas berhasil disesuaikan!',
      options: {
        commonMaterials: 'Sesuaikan untuk bahan rumah tangga umum',
        lowEnergy: 'Sesuaikan untuk skenario energi rendah/tenang',
        socialInteraction: 'Tingkatkan komponen interaksi sosial',
        simpleInstructions: 'Sederhanakan instruksi',
      },
    }
} as const;
