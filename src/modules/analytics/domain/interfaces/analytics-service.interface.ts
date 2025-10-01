
import { AnalyticsDTO } from "../../application/dtos/analytics.dto";

export interface IAnalyticsService {
    getAnalytics(startDate: string, endDate: string, studentIds: string[]): Promise<AnalyticsDTO>;
}
