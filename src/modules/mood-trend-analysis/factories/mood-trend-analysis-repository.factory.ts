
import { MongooseMoodTrendAnalysisRepository } from "../infrastructure/persistence/mongoose/mood-trend-analysis.repository";
import { IMoodTrendAnalysisRepository } from '../domain/interfaces/mood-trend-analysis-repository.interface';

let _moodTrendAnalysisRepositoryInstance: IMoodTrendAnalysisRepository;

export function createMoodTrendAnalysisRepository(): IMoodTrendAnalysisRepository {
    if(!_moodTrendAnalysisRepositoryInstance){
        _moodTrendAnalysisRepositoryInstance = new MongooseMoodTrendAnalysisRepository();
    }
    return _moodTrendAnalysisRepositoryInstance;
}
