
export interface AnalyticsDTO {
    attendance: { date: string; present: number; absent: number }[];
    participation: { name: string; count: number }[];
}
