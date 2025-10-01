export default {
    title: 'Evaluasi',
    tagline: 'Tinjau dan evaluasi partisipasi siswa.',
    evaluateButton: 'Evaluasi',
    evaluatedStatus: 'Dievaluasi',
    rejectedStatus: 'Ditolak',
    noChallenges: 'Belum ada tantangan yang tercatat untuk siswa ini.',
    noEvaluations: {
      title: 'Belum Ada Evaluasi',
      description:
        'Setelah siswa menerima tantangan, Anda dapat mengevaluasinya di sini.',
    },
    evaluationDialog: {
      title: 'Evaluasi Tantangan',
      forStudent: 'untuk {name}',
      challenge: 'Tantangan',
      rating: 'Peringkat',
      feedback: 'Umpan Balik',
      feedbackPlaceholder: 'Masukkan umpan balik Anda di sini...',
      saveButton: 'Simpan Evaluasi',
      mood: 'Suasana Hati Siswa',
    },
    ratings: {
      needsSupport: 'Butuh Dukungan',
      metExpectations: 'Memenuhi Harapan',
      exceededExpectations: 'Melebihi Harapan',
    },
    moods: {
      enthusiastic: 'Antusias',
      focused: 'Fokus',
      nervous: 'Gugup',
      frustrated: 'Frustrasi',
      happy: 'Senang',
      tired: 'Lelah',
    },
    pagination: {
        previous: 'Sebelumnya',
        next: 'Berikutnya',
        page: 'Halaman {currentPage} dari {totalPages}',
    }
} as const;
