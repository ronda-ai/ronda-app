export default {
    selectionMode: 'Mode Pilihan',
    readyToSpin: 'Siap untuk memutar?',
    readyToSelect: 'Siap untuk memilih?',
    spinTheWheel: 'Putar Roda!',
    selectStudent: 'Pilih Siswa',
    selectStudentSingular: 'Pilih Siswa',
    spinning: 'Memutar...',
    modes: {
      random: 'Acak',
      weighted: 'Tertimbang AI',
      lightning: 'Putaran Kilat',
      pair: 'Duet Hebat',
      personalizedIndividual: 'Perorangan Pribadi',
      personalizedMultiple: 'Kelompok Pribadi',
    },
    modeDescriptions: {
      random: 'Memilih satu siswa secara acak.',
      weighted:
        'AI memilih seorang siswa, memberikan kesempatan lebih tinggi kepada mereka yang kurang berpartisipasi.',
      lightning: 'Tantangan cepat dan sederhana untuk siswa yang dipilih secara acak.',
      pair: 'Memilih dua siswa secara acak для berkolaborasi dalam sebuah tantangan.',
      personalizedIndividual:
        'Pilih satu siswa secara manual untuk tantangan yang sangat dipersonalisasi.',
      personalizedMultiple:
        'Pilih hingga tiga siswa secara manual untuk tantangan kolaboratif yang dipersonalisasi.',
    },
} as const;
