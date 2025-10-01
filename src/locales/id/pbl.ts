
export default {
    title: 'Lab PBL',
    tagline: 'Atur proyek kompleks dari satu ide.',
    tabs: {
        phase1: 'Fase 1: Perencanaan',
        phase2: 'Fase 2: Tim',
        phase3: 'Fase 3: Pengembangan',
        phase4: 'Fase 4: Evaluasi',
    },
    phase1: {
        form: {
            title: 'Fase 1: Perencana Proyek',
            description: 'Tentukan topik utama dan biarkan AI menyusun rencana proyek yang terstruktur.',
            topicLabel: 'Topik Proyek Utama',
            topicPlaceholder: 'misalnya, Perubahan iklim di kota kita, Sejarah video game...',
            skillsLabel: 'Keterampilan Kunci untuk Dikembangkan',
            noSkills: 'Belum ada keterampilan yang ditentukan. Buka Generator Aktivitas untuk menambahkan beberapa.',
            durationLabel: 'Durasi Perkiraan',
            durations: {
                'oneWeek': '1 Minggu',
                'twoWeeks': '2 Minggu',
                'oneMonth': '1 Bulan',
            },
            generateButton: 'Buat Rencana Proyek'
        },
        generating: {
            title: 'Membuat Rencana Proyek...'
        },
    },
    phase2: {
        title: 'Fase 2: Pembentukan Tim',
        description: 'Gunakan AI untuk membentuk kelompok strategis berdasarkan profil dan hubungan siswa Anda.',
        selectProject: 'Pilih Proyek',
        selectProjectPlaceholder: 'Pilih proyek untuk membentuk tim...',
        teamSize: 'Ukuran Tim',
        groupingCriteria: 'Kriteria Pengelompokan',
        criteria: {
            balanced: 'Tim Seimbang',
            'social-remediation': 'Perbaikan Sosial',
            synergy: 'Sinergi Minat',
        },
        generateButton: 'Buat Tim',
        noProjectSelected: 'Silakan pilih proyek terlebih dahulu.',
        results: {
            title: 'Tim yang Disarankan',
            teamName: 'Tim {name}',
            rationale: 'Rasional Tim',
            formation: 'Formasi',
            deleteDialog: {
                title: 'Hapus formasi tim ini?',
                description: 'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus formasi tim secara permanen.',
            },
        },
        table: {
            student: 'Siswa',
            suggestedRole: 'Peran yang Disarankan',
            justification: 'Justifikasi',
        }
    },
    phase3: {
        title: 'Fase 3: Perancah Sambil Jalan',
        description: 'Buat rencana intervensi cepat для tim yang menghadapi tantangan selama pengembangan proyek.',
        selectTeam: 'Tim yang Akan Diintervensi',
        selectTeamPlaceholder: 'Pilih siswa...',
        problemLabel: 'Jelaskan Masalahnya',
        problemPlaceholder: 'misalnya, Tim macet, ada konflik, seorang siswa tidak termotivasi...',
        generateButton: 'Buat Intervensi',
        suggestionTitle: 'Intervensi yang Disarankan',
        microActivity: 'Aktivitas Mikro untuk Membuka Blokir',
        guidingQuestions: 'Pertanyaan Panduan untuk Guru',
        noSuggestion: 'Rencana intervensi yang dihasilkan akan muncul di sini.',
    },
    phase4: {
        title: 'Fase 4: Generator Rubrik',
        description: 'Buat rubrik evaluasi terperinci untuk produk akhir proyek.',
        generateButton: 'Buat Rubrik',
        rubricTitle: 'Rubrik Evaluasi yang Disarankan',
        noRubric: 'Rubrik yang dihasilkan akan muncul di sini.',
    },
    history: {
        title: 'Riwayat Proyek',
        description: 'Tinjau dan kelola proyek yang dibuat sebelumnya.',
        noResults: {
            title: 'Belum Ada Proyek',
            description: 'Gunakan formulir untuk membuat rencana Pembelajaran Berbasis Proyek pertama Anda.'
        },
        phases: 'Fase Proyek',
        milestones: 'Tonggak Penting',
        finalProduct: 'Saran Produk Akhir',
        deleteDialog: {
            title: 'Hapus rencana proyek ini?',
            description: 'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus rencana proyek secara permanen.',
        },
    },
} as const;
