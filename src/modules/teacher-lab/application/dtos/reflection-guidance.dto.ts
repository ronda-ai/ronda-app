
export interface ReflectionGuidanceInput {
  teacherReflection: string;
  history?: {
      role: 'user' | 'model';
      text: string;
  }[];
  language: string;
}

export interface ReflectionGuidanceOutput {
  guidance: string;
}
