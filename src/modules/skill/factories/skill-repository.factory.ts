
import { MongooseSkillRepository } from "../infrastructure/persistence/mongoose/skill.repository";
import { ISkillRepository } from '../domain/interfaces/skill-repository.interface';

let _skillRepositoryInstance: ISkillRepository;

export function createSkillRepository(): ISkillRepository {
    if(!_skillRepositoryInstance){
        _skillRepositoryInstance = new MongooseSkillRepository();
    }
    return _skillRepositoryInstance;
}
