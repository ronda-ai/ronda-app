import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { generateMultiSpeakerSpeech } from "@/ai/flows/generate-multi-speaker-speech";
import { NextRequest, NextResponse } from "next/server";
import { AuthenticatedUserPayload } from '@/lib/middleware/withAuthorization';
import { generateSpeechFromText } from '@/ai/flows/generate-speech-from-text';
import { hasDialogue } from '@/lib/utils';


async function generateSpeechHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();

        // Check if the text contains dialogue cues to decide which flow to use.
        if (hasDialogue(body.text)) {
            const result = await generateMultiSpeakerSpeech(body);
            return NextResponse.json(result);
        } else {
            const result = await generateSpeechFromText(body);
            return NextResponse.json(result);
        }
        
    } catch (error: any) {
        console.error('API Error: Failed to generate speech', error);
        return NextResponse.json({ message: error.message || 'Failed to generate speech' }, { status: 500 });
    }
}

export const POST = withAuthorization(generateSpeechHandler, isTeacher);
