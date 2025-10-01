

export default {
    title: 'Arena Bermain',
    tagline: 'Ikuti permainan yang menyenangkan dan mendidik dengan AI.',
    riddleBattle: {
        title: 'Pertarungan Teka-Teki',
        description: 'Hasilkan sepasang teka-teki untuk dipecahkan oleh dua tim. Siapa yang akan lebih cepat?',
        topicLabel: 'Topik Teka-Teki (Opsional)',
        topicPlaceholder: 'misalnya, Hewan, Luar Angkasa, Sejarah',
        button: 'Mulai Pertarungan Baru',
        battleTitle: 'Pertarungan Teka-Teki!',
        topic: 'Topik',
        teamBlue: 'Tim Biru',
        teamRed: 'Tim Merah',
        showAnswer: 'Tampilkan Jawaban',
        hideAnswer: 'Sembunyikan Jawaban',
        toastDeleted: 'Pertarungan dihapus.',
        toastDeleteFailed: 'Gagal menghapus pertarungan.',
        toastEvaluationSaved: 'Evaluasi disimpan.',
        toastEvaluationFailed: 'Gagal menyimpan evaluasi.',
        noBattles: {
            title: 'Siap untuk Tantangan?',
            description: 'Klik tombol di atas untuk memulai Pertarungan Teka-Teki pertama.',
        },
        deleteDialog: {
            title: 'Hapus pertarungan ini?',
            description: 'Tindakan ini bersifat permanen dan tidak dapat dibatalkan.',
        },
        evaluation: {
            title: 'Evaluasi',
            winner: 'Pemenang',
            winnerLabel: 'Umumkan Pemenang',
            winnerPlaceholder: 'Pilih pemenang...',
            tie: 'Seri',
            moodLabel: 'Suasana Kompetisi',
            moodPlaceholder: 'Pilih suasana...',
            feedbackLabel: 'Umpan Balik',
            feedbackPlaceholder: 'Bagaimana permainannya? Apakah adil?',
            moods: {
                competitive: 'Kompetitif',
                fun: 'Menyenangkan',
                collaborative: 'Kolaboratif',
                tense: 'Tegang',
                relaxed: 'Santai',
            },
            confirm: 'Konfirmasi'
        }
    },
    lightningRound: {
        title: 'Ronde Kilat',
        description: 'Permainan cepat dengan tantangan seru untuk menyemangati kelas.',
        durationLabel: 'Durasi Ronde (detik)',
        intervalLabel: 'Interval Tantangan (detik)',
        categoryLabel: 'Kategori Tantangan',
        start: 'Mulai Ronde Kilat!',
        pause: 'Jeda',
        resume: 'Lanjutkan',
        reset: 'Atur Ulang',
        noStudentsError: 'Minimal 2 siswa yang hadir diperlukan untuk bermain.',
        toastDeleted: 'Ronde dihapus.',
        toastDeleteFailed: 'Gagal menghapus ronde.',
        categories: {
            sound: 'Suara',
            face: 'Wajah',
            gesture: 'Gerakan',
            imitation: 'Tiruan',
        },
        gameScreen: {
            yourTurn: 'giliranmu!',
        },
        history: {
            title: 'Riwayat Ronde',
            description: 'Tinjau ronde yang dibuat sebelumnya.',
            roundFor: 'Ronde dari {date}',
            noRounds: 'Belum ada ronde yang dimainkan.',
        },
        deleteDialog: {
            title: 'Hapus ronde ini?',
            description: 'Tindakan ini bersifat permanen dan tidak dapat dibatalkan.',
        },
    },
    collaborativeStory: {
        title: 'Mendongeng Kolaboratif',
        setup: {
            title: 'Mulai Cerita Baru',
            description: 'Tentukan karakter dan latar untuk memulai petualangan Anda.',
            charactersLabel: 'Karakter Utama',
            charactersPlaceholder: 'misalnya, Seorang ksatria pemberani, seekor naga pintar',
            settingLabel: 'Latar Awal',
            settingPlaceholder: 'misalnya, Sebuah gua yang gelap dan menakutkan',
            lengthLabel: 'Panjang Bab',
            lengths: {
                short: 'Pendek',
                medium: 'Sedang',
                long: 'Panjang',
            },
            startButton: 'Mulai Cerita',
            allowDialogues: 'Izinkan dialog dalam cerita',
            narratorVoiceLabel: "Suara Narator",
            narratorVoicePlaceholder: "Pilih suara...",
            customPromptLabel: "Prompt Kustom (Opsional)",
            customPromptPlaceholder: "misalnya, Ceritanya harus komedi, tidak boleh mengandung kekerasan...",
            negativePromptLabel: "Prompt Negatif (Opsional)",
            negativePromptPlaceholder: "misalnya, Hindari akhir yang menyedihkan, jangan sebutkan laba-laba...",
        },
        contribute: {
            title: 'Apa yang Terjadi Selanjutnya?',
            description: 'Tambahkan ide siswa untuk bab berikutnya.',
            placeholder: 'Tulis ide siswa dan tekan enter...',
            continueButton: 'Lanjutkan Cerita',
            suggestionButton: 'Saran AI'
        },
        story: {
            titlePlaceholder: 'Cerita Akan Muncul di Sini',
            storyPlaceholder: 'Mulailah dengan mendefinisikan karakter dan latar Anda, lalu mulai ceritanya!',
        },
        history: {
            title: 'Riwayat Cerita',
            createdAt: 'Dibuat',
            noStories: 'Belum ada cerita.',
        },
        deleteDialog: {
            title: 'Hapus cerita ini?',
            description: 'Tindakan ini bersifat permanen dan tidak dapat dibatalkan.',
        },
        toastDeleted: 'Cerita dihapus.',
        toastDeleteFailed: 'Gagal menghapus cerita.',
        toastNarrationSuccess: 'Narasi cerita lengkap sedang dibuat dan akan segera muncul.',
        newStoryButton: 'Mulai Cerita Baru',
        narrateButton: 'Narasikan Bab',
        'narrateButton--loading': 'Menceritakan...',
        narrateFullStoryButton: 'Narasikan sebagai Buku Audio',
        suggestions: {
            button: 'Sarankan dengan AI',
            toastSuccess: 'Ide disarankan!'
        },
        finishButton: 'Selesaikan Cerita',
        test: {
            createButton: 'Buat Tes dari Cerita',
            modalTitle: 'Hasilkan Tes',
            modalDescription: 'Pilih jenis tes yang ingin Anda hasilkan dari cerita ini.',
            typeLabel: 'Jenis Tes',
            types: {
                title: 'Jenis Tes',
                'multiple-choice': 'Pilihan Ganda',
                'true-false': 'Benar atau Salah',
                'open-ended': 'Pertanyaan Terbuka',
                'mixed': 'Campuran',
            },
            generateButton: 'Hasilkan Tes',
            generateError: 'Gagal menghasilkan tes.',
            saveSuccess: 'Tes berhasil disimpan!',
            saveError: 'Gagal menyimpan tes.',
            previewTitle: 'Pratinjau Tes yang Dihasilkan',
            previewDescription: 'Tinjau tes yang dihasilkan. Tes tersebut sudah disimpan dan dapat dilihat di halaman Tes.',
            rubricTitle: 'Rubrik Penilaian',
            saveButton: 'Simpan Tes',
        },
        illustrateButton: 'Ilustrasi',
    },
    debateGenerator: {
        title: 'Generator Debat',
        description: 'Hasilkan skenario debat pendidikan untuk mendorong pemikiran kritis.',
        topicLabel: 'Topik Debat',
        topicPlaceholder: 'misalnya, Haruskah hewan dipelihara di kebun binatang?',
        complexityLabel: 'Kompleksitas',
        complexities: {
            beginner: 'Pemula',
            intermediate: 'Menengah',
            advanced: 'Lanjutan'
        },
        button: 'Hasilkan Debat Baru',
        noDebates: {
            title: 'Siap Berdebat?',
            description: 'Masukkan topik dan kompleksitas untuk menghasilkan skenario debat pertama Anda.',
        },
        affirmativeStance: 'Sikap Afirmatif',
        negativeStance: 'Sikap Negatif',
        guidingQuestions: 'Pertanyaan Panduan',
        rules: 'Aturan Debat',
        toastDeleted: 'Debat dihapus.',
        toastDeleteFailed: 'Gagal menghapus debat.',
        deleteDialog: {
            title: 'Hapus debat ini?',
            description: 'Tindakan ini bersifat permanen dan tidak dapat dibatalkan.',
        },
        startSession: "Mulai Sesi Langsung",
        manageSession: "Kelola Sesi",
        turnStructureTitle: "Struktur Giliran Debat",
        currentTurn: "Giliran Saat Ini",
        notStarted: "Debat belum dimulai",
        paused: "Debat Dijeda",
        start: "Mulai Debat",
        nextTurn: "Giliran Berikutnya",
        pause: "Jeda",
        resume: "Lanjutkan",
        liveSession: {
            title: "Sesi Debat Sedang Berlangsung",
            description: "Bagikan kode QR atau tautan ini dengan siswa Anda untuk memulai debat.",
            qrCode: "Kode QR",
            link: "Tautan Langsung",
            copy: "Salin",
            copied: "Disalin!",
            studentsConnected: "Siswa Terhubung",
            noStudentsYet: "Belum ada siswa yang terhubung.",
            affirmative: 'Afirmatif',
            negative: 'Negatif',
            unassigned: 'Belum Ditugaskan',
            both: 'Keduanya',
            teacher: 'Guru',
            closeSession: "Tutup Sesi",
            sessionClosed: "Sesi telah ditutup."
        }
    },
    digitalConviviality: {
        title: 'Kewarganegaraan Digital',
        description: 'Alat untuk mendorong perilaku online yang positif dan bertanggung jawab.',
        activities: {
            title: 'Aktivitas',
            description: 'Hasilkan aktivitas untuk melatih keterampilan kewarganegaraan digital.',
        },
        conflictSimulation: {
            title: 'Simulasi Konflik',
            description: 'Berlatihlah menangani situasi online yang sulit dengan menghasilkan skenario konflik hipotetis.',
            topicsLabel: 'Topik Konflik (Opsional)',
            topicsPlaceholder: 'misalnya, perundungan siber, misinformasi, plagiarisme',
            button: 'Hasilkan Skenario',
            scenarioTitle: 'Skenario yang Dihasilkan',
            strategiesTitle: 'Strategi Intervensi',
            strategyLabel: 'Strategi',
            outcomeLabel: 'Hasil Simulasi',
            noScenario: {
                title: 'Siap Berlatih?',
                description: 'Hasilkan skenario untuk melatih keterampilan resolusi konflik Anda.',
            },
            deleteDialog: {
                title: 'Hapus skenario ini?',
                description: 'Ini akan menghapus skenario konflik ini secara permanen dari riwayat Anda.',
                confirm: 'Hapus',
            },
            history: {
                title: 'Riwayat Skenario'
            }
        },
        pact: {
            title: 'Pakat Digital',
            description: 'Secara kolaboratif menghasilkan seperangkat aturan kelas untuk interaksi digital yang sehat.',
            studentCountLabel: 'Jumlah Siswa',
            mainConcernsLabel: 'Kekhawatiran Utama (Opsional)',
            mainConcernsPlaceholder: 'misalnya, penggunaan media sosial, penghormatan terhadap privasi',
            button: 'Hasilkan Draf Pakta',
            saveDraftButton: 'Simpan Draf',
            publishButton: 'Publikasikan',
            republishButton: 'Publikasikan Ulang',
            publishedAt: 'Diterbitkan pada {date} (v{version})',
            noPacts: {
                title: 'Siap Membuat Pakta?',
                description: 'Tetapkan parameter kelas Anda dan hasilkan draf pakta convivencia digital Anda.'
            },
            deleteDialog: {
                title: 'Hapus Pakta ini?',
                description: 'Ini akan menghapus pakta yang dihasilkan secara permanen.',
                confirm: 'Hapus'
            },
            history: {
                title: 'Riwayat Pakta',
                principles: 'Prinsip Panduan',
                norms: 'Norma Spesifik',
                consequences: 'Konsekuensi Restoratif',
                level: 'Tingkat',
                restorativeAction: 'Tindakan Restoratif'
            }
        },
        typeLabel: 'Jenis Aktivitas',
        typePlaceholder: 'Pilih jenis...',
        types: {
            'netiquette-challenge': 'Tantangan Netiket',
            'digital-collaboration': 'Game Kolaborasi Digital',
            'positive-messaging': 'Penulis Ulang Pesan Positif'
        },
        customPromptLabel: 'Fokus Spesifik (Opsional)',
        customPromptPlaceholder: 'misalnya, Fokus pada komentar media sosial...',
        button: 'Hasilkan Aktivitas',
        history: {
            title: 'Riwayat Aktivitas',
            studentInstructions: 'Instruksi untuk Siswa',
            pedagogicalObjectives: 'Tujuan Pedagogis',
            materials: 'Bahan',
            noMaterials: 'Tidak ada bahan yang disediakan.',
            steps: 'Langkah',
        },
        noActivities: {
            title: 'Siap Mempromosikan Kebiasaan Digital yang Baik?',
            description: 'Pilih jenis aktivitas di atas untuk menghasilkan latihan kewarganegaraan digital pertama Anda.'
        },
        deleteDialog: {
            title: 'Hapus aktivitas ini?',
            description: 'Tindakan ini bersifat permanen dan tidak dapat dibatalkan.',
            confirm: 'Hapus'
        }
    },
    suggestions: {
        button: 'Sarankan dengan AI',
        toastSuccess: 'Topik disarankan!'
    }
} as const;
