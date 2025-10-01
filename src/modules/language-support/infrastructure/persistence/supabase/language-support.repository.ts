import { ILanguageSupportRepository } from "../../../domain/interfaces/language-support-repository.interface";
import { CreateLanguageSupportDTO } from "../../../application/dtos/create-language-support.dto";
import { LanguageSupport } from "../../../domain/language-support.entity";

export class SupabaseLanguageSupportRepository implements ILanguageSupportRepository {
    async create(data: CreateLanguageSupportDTO): Promise<LanguageSupport> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<LanguageSupport[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<LanguageSupport | null> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: Partial<LanguageSupport>): Promise<LanguageSupport | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
