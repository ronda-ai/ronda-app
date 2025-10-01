
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { SkillService } from "../application/skill.service";
import { ISkillRepository } from "../domain/interfaces/skill-repository.interface";
import { ISkillService } from '../domain/interfaces/skill-service.interface';
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";

let _skillServiceInstance: ISkillService;

export function createSkillService(): ISkillService {
    if(!_skillServiceInstance){
        const repository = container.resolve<ISkillRepository>(SERVICE_KEYS.SkillRepository);
        const aiConfigService = container.resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
        _skillServiceInstance = new SkillService(repository, aiConfigService);
    }
    return _skillServiceInstance;
}
