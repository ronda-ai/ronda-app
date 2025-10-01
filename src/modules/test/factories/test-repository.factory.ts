
import { MongooseTestRepository } from "../infrastructure/persistence/mongoose/test.repository";
import { ITestRepository } from '../domain/interfaces/test-repository.interface';

let _testRepositoryInstance: ITestRepository;

export function createTestRepository(): ITestRepository {
    if(!_testRepositoryInstance){
        _testRepositoryInstance = new MongooseTestRepository();
    }
    return _testRepositoryInstance;
}
