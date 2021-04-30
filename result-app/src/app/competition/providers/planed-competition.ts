export interface PlanedCompetition {
    id: string,
    description: string,
    competitionDateTimestamp: { seconds: number, nanoseconds: number},
    competitionDate: Date
}
