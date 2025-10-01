
interface Challenge {
    studentName: string;
    challenge: string;
}

export class LightningRound {
    constructor(
        public id: any,
        public duration: number,
        public interval: number,
        public category: string,
        public plan: Challenge[],
        public createdAt: Date,
        public updatedAt: Date,
        public feedback?: string,
    ) {}
}
