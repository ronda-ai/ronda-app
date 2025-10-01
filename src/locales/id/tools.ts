
export default {
    title: 'Alat',
    tagline: 'Gunakan alat AI untuk meningkatkan pengajaran Anda.',
    activityAdapter: {
      title: 'Adaptor Aktivitas',
      description: 'Sesuaikan aktivitas yang ada agar lebih sesuai dengan kebutuhan kelas Anda, baik untuk siswa tertentu maupun seluruh kelompok.',
      placeholder: 'Tempel или tulis aktivitas yang ingin Anda sesuaikan di sini...',
      activityLabel: 'Aktivitas untuk Disesuaikan',
      existingActivityLabel: 'Pilih aktivitas atau tes yang ada',
      existingActivityPlaceholder: 'Pilih aktivitas/tes untuk diringkas dan disesuaikan...',
      studentLabel: 'Sesuaikan untuk Siswa Tertentu (Opsional)',
      studentPlaceholder: 'Pilih siswa...',
      customPromptLabel: 'Tujuan Spesifik untuk Adaptasi (Opsional)',
      customPromptPlaceholder: 'misalnya, Jadikan permainan, fokus pada penulisan...',
      button: 'Sesuaikan Aktivitas',
      generatingTitle: 'Menghasilkan Adaptasi...',
      activityType: 'Aktivitas'
    },
     rubricGenerator: {
      title: 'Generator Rubrik',
      description: 'Buat rubrik evaluasi yang adil dan seimbang untuk aktivitas apa pun.',
      placeholder: 'Jelaskan aktivitas untuk menghasilkan rubrik...',
      button: 'Hasilkan Rubrik',
      testType: 'Tes'
    },
    history: {
      title: 'Riwayat',
      descriptionAdapter: 'Tinjau aktivitas yang telah disesuaikan sebelumnya.',
      descriptionRubric: 'Tinjau rubrik yang telah dibuat sebelumnya.',
      reasoning: 'Alasan',
      criterion: 'Kriteria',
      excellent: 'Sangat Baik',
      satisfactory: 'Cukup',
      needsImprovement: 'Perlu Perbaikan',
      scoringGuide: 'Panduan Penilaian',
      toastDeleteSuccess: 'Berhasil dihapus.',
      toastDeleteFailed: 'Gagal menghapus.',
      noResults: {
        title: 'Belum Ada Hasil',
        description: 'Gunakan alat di sebelah kiri untuk menghasilkan hasil pertama Anda.',
      },
      deleteDialogAdapter: {
          title: 'Hapus adaptasi ini?',
          description: 'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus adaptasi aktivitas secara permanen.',
          confirm: 'Hapus'
      },
      deleteDialogRubric: {
          title: 'Hapus rubrik ini?',
          description: 'Tindakan ini не dapat dibatalkan. Ini akan menghapus rubrik yang dihasilkan secara permanen.',
          confirm: 'Hapus'
      }
    }
} as const;
