export interface StoryChapter {
    number: number;
    title: string;
    text: string;
    illustration?: string;
    audioUrl?: string;
}

export class CollaborativeStory {
    constructor(
        public id: any,
        public title: string,
        public characters: string[],
        public setting: string,
        public chapters: StoryChapter[],
        public isFinished: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public language?: string,
        public chapterLength?: 'short' | 'medium' | 'long',
        public allowDialogues?: boolean,
        public customPrompt?: string,
        public negativePrompt?: string,
        public narratorVoice?: string,
        public fullStoryAudioUrl?: string,
    ) {}
}
