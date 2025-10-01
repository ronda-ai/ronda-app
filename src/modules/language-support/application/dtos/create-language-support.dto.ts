
import { LanguageSupport } from "../../domain/language-support.entity";

export type CreateLanguageSupportDTO = Omit<LanguageSupport, 'id' | 'createdAt' | 'updatedAt' | 'feedback' | 'studentId' | 'audioUrl'> & {
    studentId: string;
};
