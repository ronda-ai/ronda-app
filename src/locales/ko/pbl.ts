
export default {
    title: 'PBL 연구실',
    tagline: '하나의 아이디어로 복잡한 프로젝트를 조율하세요.',
    tabs: {
        phase1: '1단계: 계획',
        phase2: '2단계: 팀',
        phase3: '3단계: 개발',
        phase4: '4단계: 평가',
    },
    phase1: {
        form: {
            title: '1단계: 프로젝트 기획자',
            description: '중심 주제를 정의하고 AI가 구조화된 프로젝트 계획을 수립하도록 하세요.',
            topicLabel: '중심 프로젝트 주제',
            topicPlaceholder: '예: 우리 도시의 기후 변화, 비디오 게임의 역사...',
            skillsLabel: '개발할 핵심 기술',
            noSkills: '아직 정의된 기술이 없습니다. 활동 생성기로 이동하여 추가하세요.',
            durationLabel: '예상 기간',
            durations: {
                'oneWeek': '1주',
                'twoWeeks': '2주',
                'oneMonth': '1개월',
            },
            generateButton: '프로젝트 계획 생성'
        },
        generating: {
            title: '프로젝트 계획 생성 중...'
        },
    },
    phase2: {
        title: '2단계: 팀 구성',
        description: '학생들의 프로필과 관계를 기반으로 전략적인 그룹을 형성하기 위해 AI를 사용하세요.',
        selectProject: '프로젝트 선택',
        selectProjectPlaceholder: '팀을 구성할 프로젝트를 선택하세요...',
        teamSize: '팀 크기',
        groupingCriteria: '그룹화 기준',
        criteria: {
            balanced: '균형 잡힌 팀',
            'social-remediation': '사회적 개선',
            synergy: '관심사 시너지',
        },
        generateButton: '팀 생성',
        noProjectSelected: '먼저 프로젝트를 선택하세요.',
        results: {
            title: '제안된 팀',
            teamName: '팀 {name}',
            rationale: '팀 구성 이유',
            formation: '구성',
            deleteDialog: {
                title: '이 팀 구성을 삭제하시겠습니까?',
                description: '이 작업은 되돌릴 수 없습니다. 이 팀 구성을 영구적으로 삭제합니다.',
            },
        },
        table: {
            student: '학생',
            suggestedRole: '제안된 역할',
            justification: '근거',
        }
    },
    phase3: {
        title: '3단계: 즉석 스캐폴딩',
        description: '프로젝트 개발 중 어려움을 겪는 팀을 위한 빠른 개입 계획을 생성합니다.',
        selectTeam: '개입할 팀',
        selectTeamPlaceholder: '학생 선택...',
        problemLabel: '문제 설명',
        problemPlaceholder: '예: 팀이 막혔습니다, 갈등이 있습니다, 학생이 의욕이 없습니다...',
        generateButton: '개입 생성',
        suggestionTitle: '제안된 개입',
        microActivity: '막힘을 푸는 마이크로 활동',
        guidingQuestions: '교사를 위한 안내 질문',
        noSuggestion: '생성된 개입 계획이 여기에 표시됩니다.',
    },
    phase4: {
        title: '4단계: 루브릭 생성기',
        description: '프로젝트의 최종 결과물에 대한 상세한 평가 루브릭을 생성합니다.',
        generateButton: '루브릭 생성',
        rubricTitle: '제안된 평가 루브릭',
        noRubric: '생성된 루브릭이 여기에 표시됩니다.',
    },
    history: {
        title: '프로젝트 기록',
        description: '이전에 생성된 프로젝트를 검토하고 관리합니다.',
        noResults: {
            title: '아직 프로젝트 없음',
            description: '양식을 사용하여 첫 번째 프로젝트 기반 학습 계획을 생성하세요.'
        },
        phases: '프로젝트 단계',
        milestones: '주요 마일스톤',
        finalProduct: '최종 결과물 제안',
        deleteDialog: {
            title: '이 프로젝트 계획을 삭제하시겠습니까?',
            description: '이 작업은 되돌릴 수 없습니다. 이 프로젝트 계획을 영구적으로 삭제합니다.',
        },
    },
} as const;
