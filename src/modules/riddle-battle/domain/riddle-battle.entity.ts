
export class RiddleBattle {
    constructor(
        public id: any,
        public teamBlueRiddle: string,
        public teamBlueAnswer: string,
        public teamRedRiddle: string,
        public teamRedAnswer: string,
        public createdAt: Date,
        public updatedAt: Date,
        public topic?: string,
        public winner?: 'teamBlue' | 'teamRed' | 'tie',
        public feedback?: string,
        public mood?: string,
    ) {}
}
