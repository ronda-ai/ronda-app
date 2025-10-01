
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CreateLanguageSupportDTO } from "../../application/dtos/create-language-support.dto";
import { LanguageSupportDTO } from "../../application/dtos/language-support.dto";

export interface ILanguageSupportService {
    createSupport(dto: CreateLanguageSupportDTO): Promise<LanguageSupportDTO>;
    getSupportsForStudent(studentId: string): Promise<LanguageSupportDTO[]>;
    addFeedback(supportId: string, feedback: string): Promise<LanguageSupportDTO | null>;
    deleteSupport(supportId: string): Promise<void>;
    generateAndCreateSupport(input: { student: StudentDTO, nativeLanguage: string, focusAreas: string[], instructionLanguage: string }): Promise<LanguageSupportDTO>;
    addAudioUrl(supportId: string, audioUrl: string): Promise<LanguageSupportDTO | null>;
}
