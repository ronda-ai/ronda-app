
import { MongooseCollaborativeStoryRepository } from "../infrastructure/persistence/mongoose/collaborative-story.repository";
import { ICollaborativeStoryRepository } from '../domain/interfaces/collaborative-story-repository.interface';

let _collaborativeStoryRepositoryInstance: ICollaborativeStoryRepository;

export function createCollaborativeStoryRepository(): ICollaborativeStoryRepository {
    if(!_collaborativeStoryRepositoryInstance){
        _collaborativeStoryRepositoryInstance = new MongooseCollaborativeStoryRepository();
    }
    return _collaborativeStoryRepositoryInstance;
}
