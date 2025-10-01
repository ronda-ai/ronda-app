

import { ChallengeHistoryDTO } from "@/modules/challenge/application/dtos/challenge-history.dto";

export type Gender = 'female' | 'male' | 'non-binary' | 'other' | 'prefer-not-to-say';

export class Student {
    constructor(
        public id: any,
        public name: string,
        public qualities: string[],
        public age?: number,
        public notes?: string,
        public fears?: string[],
        public disability?: string,
        public neurodiversity?: string,
        public goodRelations?: any[],
        public badRelations?: any[],
        public isAbsent: boolean = false,
        public gender?: Gender,
        public publicId?: string | null,
        public publicIdExpiresAt?: Date | null,
        public publicIdViewed?: boolean,
        public isUniqueViewActive?: boolean,
        public publicTheme?: string,
        public participation: number = 0, // This will be calculated on the fly
        public challengeHistory: ChallengeHistoryDTO[] = [] // This is populated by the service
    ) {}
}

export type SelectionMode =
  | 'random'
  | 'weighted'
  | 'lightning'
  | 'pair'
  | 'personalized-individual'
  | 'personalized-multiple';
