export default {
    title: 'Analitik',
    tagline: 'Visualisasikan kehadiran dan partisipasi siswa.',
    filters: {
      title: 'Filter',
      dateRange: 'Rentang Tanggal',
      student: 'Siswa',
      allStudents: 'Semua Siswa',
      studentPlaceholder: 'Pilih siswa...',
      noStudents: 'Tidak ada siswa yang ditemukan'
    },
    charts: {
      attendance: {
        title: 'Tren Kehadiran',
        description: 'Jumlah siswa yang hadir vs. absen dari waktu ke waktu.',
      },
      participation: {
        title: 'Distribusi Partisipasi',
        description:
          'Jumlah total partisipasi untuk setiap siswa dalam rentang yang dipilih.',
        legend: 'Partisipasi'
      },
    },
} as const;
