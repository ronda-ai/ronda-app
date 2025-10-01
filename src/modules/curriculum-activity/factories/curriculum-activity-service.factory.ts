

import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { CurriculumActivityService } from "../application/curriculum-activity.service";
import { ICurriculumActivityRepository } from "../domain/interfaces/curriculum-activity-repository.interface";
import { ICurriculumActivityService } from '../domain/interfaces/curriculum-activity-service.interface';

let _curriculumActivityServiceInstance: ICurriculumActivityService;

export function createCurriculumActivityService(): ICurriculumActivityService {
    if(!_curriculumActivityServiceInstance){
        const repository = container.resolve<ICurriculumActivityRepository>(SERVICE_KEYS.CurriculumActivityRepository);
        _curriculumActivityServiceInstance = new CurriculumActivityService(repository);
    }
    return _curriculumActivityServiceInstance;
}
