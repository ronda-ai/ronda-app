
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { CollaborativeStoryService } from "../application/collaborative-story.service";
import { ICollaborativeStoryRepository } from "../domain/interfaces/collaborative-story-repository.interface";
import { ICollaborativeStoryService } from '../domain/interfaces/collaborative-story-service.interface';

let _collaborativeStoryServiceInstance: ICollaborativeStoryService;

export function createCollaborativeStoryService(): ICollaborativeStoryService {
    if(!_collaborativeStoryServiceInstance){
        const repository = container.resolve<ICollaborativeStoryRepository>(SERVICE_KEYS.CollaborativeStoryRepository);
        _collaborativeStoryServiceInstance = new CollaborativeStoryService(repository);
    }
    return _collaborativeStoryServiceInstance;
}
