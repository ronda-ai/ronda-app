
export interface RiddleBattleDTO {
    id: string;
    topic?: string;
    teamBlueRiddle: string;
    teamBlueAnswer: string;
    teamRedRiddle: string;
    teamRedAnswer: string;
    winner?: 'teamBlue' | 'teamRed' | 'tie';
    feedback?: string;
    mood?: string;
    createdAt: string;
}
