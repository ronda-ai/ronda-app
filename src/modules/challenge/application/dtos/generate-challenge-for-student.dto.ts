
import { GenerateStudentChallengeInput } from "@/ai/flows/generate-student-challenge";

export type GenerateChallengeForStudentInput = GenerateStudentChallengeInput;

export type GenerateChallengeForStudentOutput = {
    challenge: string;
    tip: string;
};
