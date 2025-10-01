
import { CreateLanguageSupportDTO } from "../../application/dtos/create-language-support.dto";
import { LanguageSupport } from "../language-support.entity";

export interface ILanguageSupportRepository {
    create(data: CreateLanguageSupportDTO): Promise<LanguageSupport>;
    findByStudentId(studentId: string): Promise<LanguageSupport[]>;
    findById(id: string): Promise<LanguageSupport | null>;
    update(id: string, data: Partial<LanguageSupport>): Promise<LanguageSupport | null>;
    delete(id: string): Promise<void>;
}
