

export default {
    title: '놀이터',
    tagline: 'AI와 함께 재미있고 교육적인 게임에 참여하세요.',
    riddleBattle: {
        title: '수수께끼 대결',
        description: '두 팀이 풀 수 있는 수수께끼 한 쌍을 생성합니다. 누가 더 빠를까요?',
        topicLabel: '수수께끼 주제 (선택 사항)',
        topicPlaceholder: '예: 동물, 우주, 역사',
        button: '새 대결 시작',
        battleTitle: '수수께끼 대결!',
        topic: '주제',
        teamBlue: '파란팀',
        teamRed: '빨간팀',
        showAnswer: '정답 보기',
        hideAnswer: '정답 숨기기',
        toastDeleted: '대결이 삭제되었습니다.',
        toastDeleteFailed: '대결 삭제에 실패했습니다.',
        toastEvaluationSaved: '평가가 저장되었습니다.',
        toastEvaluationFailed: '평가 저장에 실패했습니다.',
        noBattles: {
            title: '도전할 준비가 되셨나요?',
            description: '위 버튼을 클릭하여 첫 번째 수수께끼 대결을 시작하세요.',
        },
        deleteDialog: {
            title: '이 대결을 삭제하시겠습니까?',
            description: '이 작업은 영구적이며 되돌릴 수 없습니다.',
        },
        evaluation: {
            title: '평가',
            winner: '승자',
            winnerLabel: '승자 선언',
            winnerPlaceholder: '승자 선택...',
            tie: '무승부',
            moodLabel: '경쟁 분위기',
            moodPlaceholder: '분위기 선택...',
            feedbackLabel: '피드백',
            feedbackPlaceholder: '게임은 어땠나요? 공정했나요?',
            moods: {
                competitive: '경쟁적',
                fun: '재미있음',
                collaborative: '협력적',
                tense: '긴장됨',
                relaxed: '편안함',
            },
            confirm: '확인'
        }
    },
    lightningRound: {
        title: '라이트닝 라운드',
        description: '교실에 활기를 불어넣는 재미있는 도전 과제가 있는 빠른 속도의 게임입니다.',
        durationLabel: '라운드 시간 (초)',
        intervalLabel: '도전 과제 간격 (초)',
        categoryLabel: '도전 과제 카테고리',
        start: '라이트닝 라운드 시작!',
        pause: '일시정지',
        resume: '계속',
        reset: '리셋',
        noStudentsError: '플레이하려면 최소 2명의 학생이 참석해야 합니다.',
        toastDeleted: '라운드가 삭제되었습니다.',
        toastDeleteFailed: '라운드 삭제에 실패했습니다.',
        categories: {
            sound: '소리',
            face: '표정',
            gesture: '제스처',
            imitation: '모방',
        },
        gameScreen: {
            yourTurn: '당신 차례입니다!',
        },
        history: {
            title: '라운드 내역',
            description: '이전에 생성된 라운드를 검토합니다.',
            roundFor: '{date}의 라운드',
            noRounds: '아직 플레이한 라운드가 없습니다.',
        },
        deleteDialog: {
            title: '이 라운드를 삭제하시겠습니까?',
            description: '이 작업은 영구적이며 되돌릴 수 없습니다.',
        },
    },
    collaborativeStory: {
        title: '협동 이야기 만들기',
        setup: {
            title: '새 이야기 시작',
            description: '모험을 시작하기 위해 캐릭터와 배경을 정의하세요.',
            charactersLabel: '주요 캐릭터',
            charactersPlaceholder: '예: 용감한 기사, 똑똑한 용',
            settingLabel: '초기 배경',
            settingPlaceholder: '예: 어둡고 으스스한 동굴',
            lengthLabel: '챕터 길이',
            lengths: {
                short: '짧게',
                medium: '중간',
                long: '길게',
            },
            startButton: '이야기 시작',
            allowDialogues: '이야기에서 대화 허용',
            narratorVoiceLabel: "내레이터의 목소리",
            narratorVoicePlaceholder: "목소리 선택...",
            customPromptLabel: "사용자 지정 프롬프트 (선택 사항)",
            customPromptPlaceholder: "예: 이야기는 코미디여야 하며 폭력을 포함해서는 안 됩니다...",
            negativePromptLabel: "부정적 프롬프트 (선택 사항)",
            negativePromptPlaceholder: "예: 슬픈 결말을 피하고 거미를 언급하지 마세요...",
        },
        contribute: {
            title: '다음엔 무슨 일이 일어날까요?',
            description: '다음 챕터를 위해 학생들의 아이디어를 추가하세요.',
            placeholder: '학생의 아이디어를 쓰고 엔터를 누르세요...',
            continueButton: '이야기 계속하기',
            suggestionButton: 'AI 제안'
        },
        story: {
            titlePlaceholder: '이야기가 여기에 나타납니다',
            storyPlaceholder: '캐릭터와 배경을 정의하여 이야기를 시작하세요!',
        },
        history: {
            title: '이야기 내역',
            createdAt: '생성됨',
            noStories: '아직 이야기가 없습니다.',
        },
        deleteDialog: {
            title: '이 이야기를 삭제하시겠습니까?',
            description: '이 작업은 영구적이며 되돌릴 수 없습니다.',
        },
        toastDeleted: '이야기가 삭제되었습니다.',
        toastDeleteFailed: '이야기 삭제에 실패했습니다.',
        toastNarrationSuccess: '전체 이야기 내레이션이 생성 중이며 곧 나타날 것입니다.',
        newStoryButton: '새 이야기 시작',
        narrateButton: '챕터 내레이션',
        'narrateButton--loading': '내레이션 중...',
        narrateFullStoryButton: '오디오북으로 내레이션',
        suggestions: {
            button: 'AI로 제안하기',
            toastSuccess: '아이디어가 제안되었습니다!'
        },
        finishButton: '이야기 끝내기',
        test: {
            createButton: '이야기로 시험 만들기',
            modalTitle: '시험 생성',
            modalDescription: '이 이야기에서 생성할 시험 유형을 선택하세요.',
            typeLabel: '시험 유형',
            types: {
                title: '시험 유형',
                'multiple-choice': '객관식',
                'true-false': '참/거짓',
                'open-ended': '서술형',
                'mixed': '혼합형',
            },
            generateButton: '시험 생성',
            generateError: '시험 생성에 실패했습니다.',
            saveSuccess: '시험이 성공적으로 저장되었습니다!',
            saveError: '시험 저장에 실패했습니다.',
            previewTitle: '생성된 시험 미리보기',
            previewDescription: '생성된 시험을 검토하세요. 이미 저장되었으며 시험 페이지에서 볼 수 있습니다.',
            rubricTitle: '평가 기준표',
            saveButton: '시험 저장',
        },
        illustrateButton: '삽화 그리기',
    },
    debateGenerator: {
        title: '토론 생성기',
        description: '비판적 사고를 장려하기 위해 교육적인 토론 시나리오를 생성합니다.',
        topicLabel: '토론 주제',
        topicPlaceholder: '예: 동물을 동물원에 두어야 하는가?',
        complexityLabel: '복잡성',
        complexities: {
            beginner: '초급',
            intermediate: '중급',
            advanced: '고급'
        },
        button: '새 토론 생성',
        noDebates: {
            title: '논쟁할 준비가 되셨나요?',
            description: '첫 번째 토론 시나리오를 생성하려면 주제와 복잡성을 입력하세요.',
        },
        affirmativeStance: '찬성 입장',
        negativeStance: '반대 입장',
        guidingQuestions: '안내 질문',
        rules: '토론 규칙',
        toastDeleted: '토론이 삭제되었습니다.',
        toastDeleteFailed: '토론 삭제에 실패했습니다.',
        deleteDialog: {
            title: '이 토론을 삭제하시겠습니까?',
            description: '이 작업은 영구적이며 되돌릴 수 없습니다.',
        },
        startSession: "라이브 세션 시작",
        manageSession: "세션 관리",
        turnStructureTitle: "토론 순서 구조",
        currentTurn: "현재 순서",
        notStarted: "토론이 아직 시작되지 않았습니다",
        paused: "토론 일시 중지됨",
        start: "토론 시작",
        nextTurn: "다음 순서",
        pause: "일시 중지",
        resume: "계속",
        liveSession: {
            title: "토론 세션 진행 중",
            description: "토론을 시작하려면 이 QR 코드나 링크를 학생들과 공유하세요.",
            qrCode: "QR 코드",
            link: "직접 링크",
            copy: "복사",
            copied: "복사됨!",
            studentsConnected: "연결된 학생",
            noStudentsYet: "아직 연결된 학생이 없습니다.",
            affirmative: '찬성',
            negative: '반대',
            unassigned: '미정',
            both: '모두',
            teacher: '선생님',
            closeSession: "세션 닫기",
            sessionClosed: "세션이 닫혔습니다."
        }
    },
    digitalConviviality: {
        title: '디지털 시민의식',
        description: '긍정적이고 책임감 있는 온라인 행동을 촉진하는 도구입니다.',
        activities: {
            title: '활동',
            description: '디지털 시민의식 기술을 연습하기 위한 활동을 생성합니다。',
        },
        conflictSimulation: {
            title: '갈등 시뮬레이션',
            description: '가상 갈등 시나리오를 생성하여 어려운 온라인 상황에 대처하는 연습을 합니다。',
            topicsLabel: '갈등 주제 (선택 사항)',
            topicsPlaceholder: '예: 사이버 괴롭힘, 허위 정보, 표절',
            button: '시나리오 생성',
            scenarioTitle: '생성된 시나리오',
            strategiesTitle: '개입 전략',
            strategyLabel: '전략',
            outcomeLabel: '시뮬레이션 결과',
            noScenario: {
                title: '연습할 준비가 되셨나요?',
                description: '갈등 해결 기술을 연습하기 위한 시나리오를 생성합니다。',
            },
            deleteDialog: {
                title: '이 시나리오를 삭제하시겠습니까?',
                description: '이 작업은 내역에서 이 갈등 시나리오를 영구적으로 삭제합니다.',
                confirm: '삭제',
            },
            history: {
                title: '시나리오 내역'
            }
        },
        pact: {
            title: '디지털 협약',
            description: '건강한 디지털 상호작용을 위한 수업 규칙을 공동으로 생성합니다.',
            studentCountLabel: '학생 수',
            mainConcernsLabel: '주요 우려 사항(선택 사항)',
            mainConcernsPlaceholder: '예: 소셜 미디어 사용, 개인 정보 보호',
            button: '협약 초안 생성',
            saveDraftButton: '초안 저장',
            publishButton: '게시',
            republishButton: '재게시',
            publishedAt: '{date}에 게시됨(v{version})',
            noPacts: {
                title: '협약을 맺을 준비가 되셨나요?',
                description: '수업 매개변수를 설정하고 디지털 공존 협약 초안을 생성하세요.'
            },
            deleteDialog: {
                title: '이 협약을 삭제하시겠습니까?',
                description: '생성된 협약이 영구적으로 삭제됩니다.',
                confirm: '삭제'
            },
            history: {
                title: '협약 내역',
                principles: '지침 원칙',
                norms: '특정 규범',
                consequences: '회복적 결과',
                level: '수준',
                restorativeAction: '회복적 조치'
            }
        },
        typeLabel: '활동 유형',
        typePlaceholder: '유형 선택...',
        types: {
            'netiquette-challenge': '네티켓 챌린지',
            'digital-collaboration': '디지털 협업 게임',
            'positive-messaging': '긍정적 메시지 재작성기'
        },
        customPromptLabel: '특정 초점 (선택 사항)',
        customPromptPlaceholder: '예: 소셜 미디어 댓글에 집중...',
        button: '활동 생성',
        history: {
            title: '활동 내역',
            studentInstructions: '학생용 지침',
            pedagogicalObjectives: '교육 목표',
            materials: '자료',
            noMaterials: '제공된 자료 없음.',
            steps: '단계',
        },
        noActivities: {
            title: '좋은 디지털 습관을 장려할 준비가 되셨나요?',
            description: '첫 번째 디지털 시민의식 연습을 생성하려면 위에서 활동 유형을 선택하세요。'
        },
        deleteDialog: {
            title: '이 활동을 삭제하시겠습니까?',
            description: '이 작업은 영구적이며 되돌릴 수 없습니다。',
            confirm: '삭제'
        }
    },
    suggestions: {
        button: 'AI로 제안하기',
        toastSuccess: '주제가 제안되었습니다!'
    }
} as const;
    
