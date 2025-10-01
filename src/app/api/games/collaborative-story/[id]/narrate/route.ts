
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { ICollaborativeStoryService } from '@/modules/collaborative-story/domain/interfaces/collaborative-story-service.interface';
import { SERVICE_KEYS } from '@/config/service-keys';
import { resolve } from '@/services/bootstrap';
import { NextRequest, NextResponse } from 'next/server';
import { AuthenticatedUserPayload, GenericRouteContext } from '@/lib/middleware/withAuthorization';

const getStoryService = () => resolve<ICollaborativeStoryService>(SERVICE_KEYS.CollaborativeStoryService);

async function narrateFullStoryHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
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

export const POST = withAuthorization(narrateFullStoryHandler, isTeacher);
