
export default {
      title: 'Dukungan Bahasa',
      tagline: 'Hasilkan materi bilingual untuk mendukung inklusi bahasa.',
      form: {
          title: 'Asisten Inklusi Bahasa',
          description: 'Pilih siswa dan tentukan bahasanya untuk menghasilkan materi dukungan yang dipersonalisasi.',
          studentLabel: 'Siswa',
          studentPlaceholder: 'Pilih siswa...',
          languageLabel: "Bahasa Ibu Siswa",
          languagePlaceholder: 'misalnya, Spanyol, Prancis, Mandarin',
          focusAreasLabel: 'Area Fokus',
          generateButton: 'Hasilkan Materi Dukungan',
      },
      focusAreas: {
          reading: 'Pemahaman Membaca',
          writing: 'Keterampilan Menulis',
          speaking: 'Ekspresi Lisan',
          listening: 'Pemahaman Mendengarkan',
          'social-emotional': 'Integrasi Sosio-Emosional',
      },
      addFocusAreaDialog: {
        title: 'Tambah Area Fokus Baru',
        description: 'Pilih dari saran AI atau tambahkan area fokus Anda sendiri ke daftar.',
        customPromptLabel: 'Bimbing AI (Opsional)',
        customPromptPlaceholder: 'misalnya, Fokus pada area mendengarkan...',
        manualAreaLabel: 'Atau Tambah Area Secara Manual',
        manualAreaPlaceholder: 'Ketik area baru...',
        noSuggestions: 'Tidak ada saran yang tersedia. Coba segarkan atau ubah prompt Anda.',
        add: 'Tambah:',
        addSelected: 'Tambah yang Dipilih',
        toastSuccess: 'Area fokus berhasil ditambahkan!',
        toastError: 'Gagal menambahkan area fokus.',
      },
      editFocusAreaDialog: {
        title: 'Edit Area Fokus: {name}',
        areaNameLabel: 'Nama Area Fokus',
        deleteButton: 'Hapus Area',
        toastUpdateSuccess: 'Area fokus berhasil diperbarui!',
        toastUpdateError: 'Gagal memperbarui area fokus.',
        toastDeleteSuccess: 'Area fokus berhasil dihapus!',
        toastDeleteError: 'Gagal menghapus area fokus.',
        deleteDialog: {
            title: 'Anda yakin?',
            description: 'Ini akan menghapus area fokus "{name}" secara permanen dari daftar.',
            cancel: 'Batal',
            confirm: 'Hapus'
        }
      },
      generatingTitle: 'Menghasilkan Materi Dukungan...',
      history: {
          title: 'Riwayat Materi yang Dihasilkan',
          description: 'Tinjau materi yang dibuat sebelumnya untuk siswa yang dipilih.',
          selectStudentPrompt: {
            title: 'Pilih Siswa',
            description: 'Pilih siswa dari formulir untuk melihat riwayat mereka dan menghasilkan materi baru.',
          },
          noResults: {
              title: 'Belum Ada Materi',
              description: 'Gunakan formulir untuk menghasilkan materi dukungan pertama untuk siswa ini.',
          },
          header: 'Materi untuk {language}',
          teacherGuide: 'Panduan Guru',
          studentMaterial: 'Materi Siswa',
          feedbackTitle: "Umpan Balik Guru",
          feedbackPlaceholder: 'Apakah materi ini bermanfaat? Umpan balik Anda membantu meningkatkan saran di masa mendatang.',
          toastDeleted: 'Materi dukungan dihapus.',
          toastDeleteFailed: 'Gagal menghapus materi dukungan.',
          deleteDialog: {
            title: 'Hapus materi ini?',
            description: 'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus materi dukungan yang dihasilkan secara permanen.',
          },
          translationTitle: "Terjemahan untuk {language}",
          showTranslation: "Tampilkan Terjemahan",
          hideTranslation: "Sembunyikan Terjemahan",
      }
} as const;
