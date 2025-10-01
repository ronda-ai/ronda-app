
import { GenerateDigitalConflictScenarioOutput } from "@/ai/flows/generate-digital-conflict-scenario";
import { ActivityType } from "@/ai/flows/generate-digital-conviviality-activity";
import { GenerateDigitalPactOutput } from "@/ai/flows/generate-digital-pact";


export class DigitalConvivialityActivity {
    constructor(
        public id: any,
        public title: string,
        public introduction: string,
        public materials: string[],
        public pedagogicalObjectives: string[],
        public steps: string[],
        public studentInstructions: string,
        public activityType: ActivityType,
        public createdAt: Date,
        public updatedAt: Date,
        public customPrompt?: string,
    ) {}
}

export class DigitalConflictScenario implements GenerateDigitalConflictScenarioOutput {
    constructor(
        public id: any,
        public title: string,
        public scenario: string,
        public strategies: { name: string; description: string; simulatedOutcome: string; }[],
        public createdAt: Date,
        public updatedAt: Date,
        public topics?: string[],
    ) {}
}

export class DigitalPact implements GenerateDigitalPactOutput {
    constructor(
        public id: any,
        public title: string,
        public principles: { title: string; description: string; }[],
        public norms: { principle: string; norm: string; }[],
        public consequences: { level: number; description: string; restorativeAction: string; }[],
        public createdAt: Date,
        public updatedAt: Date,
        public version: number = 1,
        public publishedAt?: Date,
    ) {}
}
