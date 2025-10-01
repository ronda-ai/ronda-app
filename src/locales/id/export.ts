export default {
    title: 'Ekspor Data',
    tagline: 'Unduh data kelas Anda dalam berbagai format.',
    exportData: 'Ekspor Data',
    exportDescription:
      'Pilih jenis data dan format yang ingin Anda ekspor.',
    dataType: 'Data untuk Diekspor',
    dataTypePlaceholder: 'Pilih jenis data...',
    format: 'Format Ekspor',
    formatPlaceholder: 'Pilih format...',
    exportButton: 'Hasilkan dan Unduh',
    toastSuccess: 'Ekspor berhasil dimulai!',
    toastError: 'Gagal mengekspor data. Silakan coba lagi.',
    dataTypes: {
      students: 'Daftar Siswa',
      attendance: 'Riwayat Kehadiran',
      evaluations: 'Evaluasi Tantangan',
    },
    filtersTitle: 'Filter (Opsional)',
    studentFilter: 'Filter berdasarkan Siswa',
    studentPlaceholder: 'Semua Siswa',
    dateFilter: 'Filter berdasarkan Tanggal',
    noStudents: 'Tidak ada siswa yang ditemukan'
} as const;
