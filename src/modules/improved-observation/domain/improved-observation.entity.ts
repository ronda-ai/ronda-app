
export class ImprovedObservation {
    constructor(
        public id: any,
        public originalObservation: string,
        public improvedObservation: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
