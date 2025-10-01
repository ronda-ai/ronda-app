
import { MongooseTestAnalysisRepository } from "../infrastructure/persistence/mongoose/test-analysis.repository";
import { ITestAnalysisRepository } from '../domain/interfaces/test-analysis-repository.interface';
import { TestAnalysisEncryptionRepository } from '../infrastructure/persistence/mongoose/test-analysis-encryption.repository';
import { EncryptionService } from '@/modules/shared/application/encryption.service';

let _testAnalysisRepositoryInstance: ITestAnalysisRepository;

export function createTestAnalysisRepository(): ITestAnalysisRepository {
    if(!_testAnalysisRepositoryInstance){
        const mongooseRepository = new MongooseTestAnalysisRepository();
        const encryptionService = new EncryptionService();
        _testAnalysisRepositoryInstance = new TestAnalysisEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _testAnalysisRepositoryInstance;
}
