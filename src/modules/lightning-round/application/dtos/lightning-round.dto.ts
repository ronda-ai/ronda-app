
export interface Challenge {
    studentName: string;
    challenge: string;
}

export interface LightningRoundDTO {
    id: string;
    duration: number;
    interval: number;
    category: string;
    plan: Challenge[];
    feedback?: string;
    createdAt: string;
}
