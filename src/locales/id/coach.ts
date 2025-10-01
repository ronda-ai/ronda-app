export default {
    title: 'Pelatih AI',
    tagline: 'Dapatkan wawasan dan saran yang didukung AI.',
    noStudentSelected: {
      title: 'Pilih Siswa',
      description:
        'Pilih siswa dari daftar untuk melihat analisis mereka dan mendapatkan saran.',
    },
    tabs: {
        classroom: 'Analisis Kelas',
        individual: 'Analisis Individual'
    },
    coachSuggestion: {
      title: 'Saran Pelatih',
      description:
        'Hasilkan saran yang dipersonalisasi untuk siswa ini berdasarkan profil dan kinerja mereka.',
      button: 'Dapatkan Saran',
      toastDeleted: 'Saran berhasil dihapus.',
      toastDeleteFailed: 'Gagal menghapus saran.',
      deleteDialog: {
        title: 'Hapus saran ini?',
        description: 'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus saran pelatih secara permanen.',
        confirm: 'Hapus',
      },
      noSuggestions: {
        title: 'Belum Ada Saran',
        description:
          'Hasilkan saran pertama untuk siswa ini untuk memulai.',
      },
    },
    supportPlan: {
      title: 'Rencana Dukungan',
      description:
        'Hasilkan rencana multi-langkah yang dapat ditindaklanjuti untuk mendukung perkembangan siswa ini.',
      button: 'Hasilkan Rencana Baru',
      generating: 'Menghasilkan rencana, harap tunggu...',
      planGenerated: 'Rencana dihasilkan pada {date}',
      feedbackTitle: "Umpan Balik Guru",
      feedbackPlaceholder:
        'Apa yang berhasil? Apa yang tidak? Umpan balik Anda membantu AI belajar...',
      toastDeleted: 'Rencana dukungan berhasil dihapus.',
      toastDeleteFailed: 'Gagal menghapus rencana dukungan.',
      noPlans: {
        title: 'Belum Ada Rencana Dukungan',
        description:
          'Hasilkan rencana dukungan pertama untuk siswa ini untuk memulai.',
      },
      stepDialog: {
        title: 'Evaluasi Langkah Dukungan',
        description: 'Bagaimana langkah ini berjalan?',
        status: 'Status',
        feedback: 'Umpan Balik Langkah (opsional)',
        feedbackPlaceholder: 'Tambahkan catatan tentang langkah ini...',
        saveButton: 'Simpan Evaluasi Langkah',
        statuses: {
          pending: 'Tertunda',
          achieved: 'Tercapai',
          'partially-achieved': 'Tercapai Sebagian',
          'not-achieved': 'Tidak Tercapai',
          discarded: 'Dibuang',
        },
      },
      deleteDialog: {
        title: 'Anda yakin ingin menghapus rencana ini?',
        description:
          'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus rencana dukungan secara permanen.',
        confirm: 'Hapus',
      },
    },
    moodAnalysis: {
      title: 'Analisis Tren Suasana Hati',
      descriptionStudent:
        'Analisis suasana hati siswa ini di berbagai tantangan untuk menemukan pola.',
      descriptionClassroom:
        'Dapatkan analisis tren suasana hati di seluruh kelas untuk meningkatkan dinamika umum.',
      button: 'Analisis Tren',
      buttonClassroom: 'Analisis Tren Kelas',
      analysisTitle: 'Wawasan Bertenaga AI',
      noAnalyses: {
        title: 'Belum Ada Analisis',
        descriptionStudent:
          'Hasilkan analisis suasana hati pertama untuk siswa ini untuk memulai.',
        descriptionClassroom:
          'Hasilkan analisis suasana hati pertama untuk kelas untuk memulai.',
      },
       toastDeleted: 'Analisis berhasil dihapus.',
       toastDeleteFailed: 'Gagal menghapus analisis.',
       deleteDialog: {
        title: 'Hapus analisis ini?',
        description: 'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus analisis yang dihasilkan secara permanen.',
        confirm: 'Hapus',
      },
    },
    relationshipLab: {
      title: 'Lab Dinamika Sosial',
      description: 'Ruang untuk menganalisis dan meningkatkan hubungan siswa.',
      button: 'Buka Lab',
      tagline: 'Atur interaksi sosial yang positif.',
      tabs: {
        multiStudent: 'Antar Teman',
        singleStudent: 'Individual',
      },
      form: {
        title: 'Generator Strategi Perbaikan Hubungan',
        description: 'Pilih siswa dengan hubungan yang tegang untuk menerima rencana intervensi khusus.',
        studentsLabel: 'Pilih Siswa (2-4)',
        studentsPlaceholder: 'Pilih siswa...',
        focusLabel: 'Tujuan Utama / Keterampilan yang Akan Diperkuat',
        focusPlaceholder: 'misalnya, Komunikasi, Empati, Kolaborasi...',
        customPromptLabel: 'Prompt Kustom (Opsional)',
        customPromptPlaceholder: 'misalnya, Buat aktivitas non-verbal, jadikan permainan...',
        generateButton: 'Hasilkan Strategi',
      },
      individual: {
          form: {
              title: 'Generator Strategi Individual',
              description: 'Pilih satu siswa untuk menghasilkan rencana yang membantunya berintegrasi dan berhubungan lebih baik dengan kelas.',
              studentsPlaceholder: 'Pilih siswa...',
              generateButton: 'Hasilkan Strategi Integrasi'
          },
          history: {
              title: 'Riwayat Strategi Individual',
              description: 'Tinjau strategi yang dibuat sebelumnya untuk siswa ini.',
               prompt: {
                  title: 'Siap Membangun Jembatan?',
                  description: 'Pilih seorang siswa untuk melihat riwayatnya atau menghasilkan strategi integrasi sosial baru.',
              },
          },
          toastSuccess: 'Strategi integrasi berhasil dibuat!',
          toastDeleteSuccess: 'Strategi berhasil dihapus.',
          toastDeleteFailed: 'Gagal menghapus strategi.',
          deleteDialog: {
              title: 'Hapus strategi ini?',
              description: 'Tindakan ini tidak dapat dibatalkan dan akan menghapus strategi secara permanen.',
              confirm: 'Hapus'
          }
      },
      suggestions: {
          button: 'Sarankan dengan AI',
          toastSuccess: 'Saran telah diisi ke dalam formulir!'
      },
       studentInfo: {
          title: "Profil Siswa yang Dipilih",
          qualities: 'Kualitas',
          fears: 'Ketakutan',
          none: 'Tidak ada yang terdaftar',
      },
      history: {
        title: 'Riwayat Strategi',
        description: 'Tinjau strategi yang dibuat sebelumnya untuk siswa yang dipilih.',
        header: 'Strategi untuk {focus}',
        statusLabel: 'Status Strategi',
        statusPlaceholder: 'Atur status...',
        feedbackLabel: 'Umpan Balik Guru',
        feedbackPlaceholder: 'Bagaimana strategi ini bekerja dalam praktek?',
        saveFeedbackButton: 'Simpan Evaluasi',
        toastUpdateSuccess: 'Strategi berhasil diperbarui!',
        toastUpdateFailed: 'Gagal memperbarui strategi.',
        prompt: {
            title: 'Siap untuk Memperbaiki?',
            description: 'Pilih setidaknya dua siswa dalam formulir untuk melihat riwayat mereka atau menghasilkan strategi baru.',
        },
        noResults: {
            title: 'Belum Ada Strategi',
            description: 'Hasilkan strategi pertama untuk kelompok siswa ini.',
        },
         stepDialog: {
            title: 'Evaluasi Langkah Perbaikan',
            description: 'Bagaimana langkah ini berjalan?',
            status: 'Status',
            feedback: 'Umpan Balik Langkah (opsional)',
            feedbackPlaceholder: 'Tambahkan catatan tentang langkah ini...',
            saveButton: 'Simpan Evaluasi',
            statuses: {
                pending: 'Tertunda',
                completed: 'Selesai',
                skipped: 'Dilewati',
            },
        },
      },
      details: {
          title: "Detail Strategi untuk '{focus}'",
          adjustTitle: "Sesuaikan Strategi",
          adjustPlaceholder: "misalnya, Buat lebih sederhana, tambahkan komponen menggambar, lebih fokus pada isyarat non-verbal...",
          adjustButton: "Hasilkan Strategi yang Disesuaikan",
      },
      status: {
        'not_started': 'Belum Dimulai',
        'in_progress': 'Sedang Berlangsung',
        'successful': 'Berhasil',
        'partially_successful': 'Berhasil Sebagian',
        'did_not_work': 'Tidak Berhasil',
        'needs_adjustment': 'Perlu Penyesuaian',
      },
      toastSuccess: 'Strategi perbaikan berhasil dibuat!',
    },
    qualitiesSuggestion: {
      title: 'Saran Kualitas',
      description: 'Temukan kualitas yang muncul berdasarkan kinerja siswa.',
      button: 'Temukan Kualitas',
      suggestionText:
        'Berdasarkan kinerja terkini, AI menyarankan kualitas berikut:',
      noSuggestions: {
        title: 'Belum Ada Saran Kualitas',
        description:
          'Hasilkan saran kualitas pertama untuk siswa ini untuk memulai.',
      },
      dialog: {
        title: 'Saran Kualitas Baru untuk {name}',
        description:
          'Berdasarkan kinerja terkini, berikut beberapa kualitas yang mungkin ingin Anda tambahkan:',
        accept: 'Terima',
        reject: 'Tolak',
        confirmation: 'Bagaimana Anda ingin memperbarui kualitas?',
        add: 'Tambahkan sebagai Baru',
        replace: 'Ganti yang Sudah Ada',
        confirm: 'Konfirmasi Pembaruan',
      },
    },
    concernAnalysis: {
      title: 'Analisis Pola Kekhawatiran',
      description:
        'AI akan menganalisis riwayat lengkap siswa untuk pola negatif yang berulang.',
      button: 'Analisis Kekhawatiran',
      noAnalyses: {
        title: 'Tidak Ada Pola Kekhawatiran yang Terdeteksi',
        description:
          'Hasilkan analisis untuk memeriksa potensi masalah yang berulang.',
      },
    },
    fearManagement: {
      title: 'Saran Manajemen Ketakutan',
      description: 'Hasilkan strategi empatik untuk membantu siswa mengatasi ketakutan mereka.',
      button: 'Dapatkan Strategi',
      strategyFor: 'Strategi untuk:',
      feedbackTitle: 'Bagaimana hasilnya?',
      feedbackPlaceholder: 'Umpan balik Anda membantu AI belajar dan berkembang...',
      toastFearUpdated: 'Profil ketakutan siswa diperbarui!',
      toastFearUpdateFailed: 'Gagal memperbarui ketakutan siswa.',
      toastDeleted: 'Saran berhasil dihapus.',
      toastDeleteFailed: 'Gagal menghapus saran.',
      noSuggestions: {
        title: 'Belum Ada Strategi',
        description: 'Hasilkan strategi untuk membantu siswa ini mengelola ketakutan mereka.',
        noFears: 'Siswa ini tidak memiliki daftar ketakutan. Tambahkan ketakutan di profil mereka untuk mendapatkan saran.',
      },
      updateDialog: {
        title: 'Perbarui Profil Siswa?',
        confirm: 'Ya, perbarui profil',
      },
      deleteDialog: {
        title: 'Hapus saran ini?',
        description: 'Tindakan ini tidak dapat dibatalkan.',
        confirm: 'Hapus',
      },
      dialog: {
        title: 'Mengelola Ketakutan terhadap {fear}',
        description: 'Tinjau strategi yang ada atau hasilkan yang baru untuk {name}.',
        generateButton: 'Hasilkan Saran Baru',
        noSuggestions: {
            title: 'Belum ada strategi',
            description: 'Hasilkan saran AI pertama untuk mengatasi ketakutan ini.'
        }
      }
    }
} as const;