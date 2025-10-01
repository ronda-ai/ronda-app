

import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { TestService } from "../application/test.service";
import { ITestRepository } from "../domain/interfaces/test-repository.interface";
import { ITestService } from '../domain/interfaces/test-service.interface';
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

let _testServiceInstance: ITestService;

export function createTestService(): ITestService {
    if(!_testServiceInstance){
        const repository = container.resolve<ITestRepository>(SERVICE_KEYS.TestRepository);
        const anonymizationService = container.resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);
        _testServiceInstance = new TestService(repository, anonymizationService);
    }
    return _testServiceInstance;
}
