
export class Evaluation {
    constructor(
        public rating: 'needs-support' | 'met-expectations' | 'exceeded-expectations',
        public feedback?: string,
        public mood?: string,
    ) {}
}
