
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { TestAnalysisService } from "../application/test-analysis.service";
import { ITestAnalysisRepository } from "../domain/interfaces/test-analysis-repository.interface";
import { ITestAnalysisService } from '../domain/interfaces/test-analysis-service.interface';
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _testAnalysisServiceInstance: ITestAnalysisService;

export function createTestAnalysisService(): ITestAnalysisService {
    if(!_testAnalysisServiceInstance){
        const repository = container.resolve<ITestAnalysisRepository>(SERVICE_KEYS.TestAnalysisRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _testAnalysisServiceInstance = new TestAnalysisService(repository, anonymizationService);
    }
    return _testAnalysisServiceInstance;
}
