
export interface ScenarioChoice {
  text: string;
}

export interface ScenarioEvaluation {
    isCorrect: 'good' | 'average' | 'bad';
    feedback: string;
    mbeCriterias: string[];
}

export interface ClassroomClimateScenarioInput {
  language: string;
  studentAliases: string[];
  scenarioDescription?: string;
  simulationLength: 'short' | 'medium' | 'complex';
  history?: {
      role: 'user' | 'model';
      text: string;
      evaluation?: ScenarioEvaluation;
  }[];
}

export interface ClassroomClimateScenarioOutput {
  evaluation?: ScenarioEvaluation;
  narrative: string;
  choices: ScenarioChoice[];
  isFinalStep: boolean;
  finalSummary?: string;
}
