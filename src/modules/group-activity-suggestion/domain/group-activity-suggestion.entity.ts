
export class GroupActivitySuggestion {
    constructor(
        public id: any,
        public teacherTip: string,
        public suggestedGroups: string[][],
        public suggestedSkills: string[],
        public suggestedThemes: string[],
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}

    