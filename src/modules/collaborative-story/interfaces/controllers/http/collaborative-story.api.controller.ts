import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ICollaborativeStoryService } from "@/modules/collaborative-story/domain/interfaces/collaborative-story-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getStoryService = () => resolve<ICollaborativeStoryService>(SERVICE_KEYS.CollaborativeStoryService);

export async function processChapterHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        
        if (body.finishStory) {
            const story = await getStoryService().finishStory(body.storyId);
            if (!story) {
                 return NextResponse.json({ message: "Story not found" }, { status: 404 });
            }
            return NextResponse.json(story);
        }

        const result = await getStoryService().processChapter(body);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to process story chapter', error);
        return NextResponse.json({ message: error.message || 'Failed to process story chapter' }, { status: 500 });
    }
}

export async function getStoriesHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const stories = await getStoryService().getAllStories();
        return NextResponse.json(stories);
    } catch (error: any) {
        console.error('API Error: Failed to get stories', error);
        return NextResponse.json({ message: error.message || 'Failed to get stories' }, { status: 500 });
    }
}

export async function updateStoryHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const body = await request.json();
        const { chapterIndex, ...chapterData } = body;
        const updatedStory = await getStoryService().updateChapter(params.id as string, chapterIndex, chapterData);

        if (!updatedStory) {
            return NextResponse.json({ message: "Story not found" }, { status: 404 });
        }
        return NextResponse.json(updatedStory);
    } catch (error: any) {
        console.error('API Error: Failed to update story', error);
        return NextResponse.json({ message: error.message || 'Failed to update story' }, { status: 500 });
    }
}

export async function deleteStoryHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getStoryService().deleteStory(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete story', error);
        return NextResponse.json({ message: error.message || 'Failed to delete story' }, { status: 500 });
    }
}

export async function getStoryStartersHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const result = await getStoryService().generateStoryStarters(body.language);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate story starters', error);
        return NextResponse.json({ message: error.message || 'Failed to generate story starters' }, { status: 500 });
    }
}

export async function getContributionSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const result = await getStoryService().generateContributionSuggestion(body);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate story contribution suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to generate suggestion' }, { status: 500 });
    }
}

export async function generateIllustrationHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const result = await getStoryService().generateIllustration(body.prompt, body.language);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate illustration', error);
        return NextResponse.json({ message: error.message || 'Failed to generate illustration' }, { status: 500 });
    }
}

export async function narrateFullStoryHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const storyId = params.id as string;
        const updatedStory = await getStoryService().generateFullStoryAudio(storyId);
        if (!updatedStory) {
            return NextResponse.json({ message: 'Story not found or narration failed.' }, { status: 404 });
        }
        return NextResponse.json(updatedStory);
    } catch (error: any) {
        console.error(`API Error: Failed to narrate full story`, error);
        return NextResponse.json({ message: error.message || 'Failed to narrate story' }, { status: 500 });
    }
}
