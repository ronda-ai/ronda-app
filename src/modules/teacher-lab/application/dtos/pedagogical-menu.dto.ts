
interface Activity {
    start: string;
    development: string;
    closure: string;
}

interface Approach {
    title: string;
    activities: Activity;
    mbeJustification: string;
    adaptationSuggestion: string;
}

export interface PedagogicalMenuDTO {
    approaches: Approach[];
}
