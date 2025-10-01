

import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IChallengeService } from "@/modules/challenge/domain/interfaces/challenge-service.interface";
import { AcceptChallengeDTO } from "@/modules/student/application/dtos/accept-challenge.dto";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { eventBus, SystemEvent } from "@/lib/event-bus/event-bus";

const getChallengeService = () => resolve<IChallengeService>(SERVICE_KEYS.ChallengeService);

export async function generateChallengeHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const challengeOutput = await getChallengeService().generateChallengeForStudent(body);
        return NextResponse.json(challengeOutput);
    } catch (error: any) {
        if (error.cause?.status === 503 || (error.message && error.message.includes('503'))) {
            return NextResponse.json({ message: 'The AI model is currently overloaded. Please try again later.' }, { status: 503 });
        }
        console.error('API Error: Failed to generate challenge', error);
        return NextResponse.json({ message: error.message || 'Failed to generate challenge' }, { status: 500 });
    }
}

export async function acceptChallengeHandler(request: NextRequest) {
    try {
        const input: AcceptChallengeDTO = await request.json();
        const { studentIds, ...restOfBody } = input;

        for (const studentId of studentIds) {
            await getChallengeService().createChallenge({
                studentId,
                ...restOfBody,
                status: 'pending'
            });
        }
        
        // Publish event after successfully accepting the challenge
        eventBus.publish(SystemEvent.CHALLENGE_ACCEPTED, {
            studentIds,
            challenge: { // This is the 'challenge' property from the payload definition
                challenge: { // This is the nested 'challenge' object from ChallengeHistoryDTO
                    challenge: restOfBody.challenge,
                    tip: restOfBody.tip,
                    createdAt: new Date().toISOString()
                },
                status: 'pending',
                aiConfiguration: restOfBody.aiConfiguration,
                attempts: restOfBody.attempts,
                selectionMode: restOfBody.selectionMode,
            }
        });

        return new NextResponse(null, { status: 204 });

    } catch (error: any) {
        console.error('API Error: Failed to accept challenge', error);
        return NextResponse.json({ message: error.message || 'Failed to accept challenge' }, { status: 500 });
    }
}

export async function rejectChallengeHandler(request: NextRequest) {
    try {
        const input: AcceptChallengeDTO = await request.json();
        const { studentIds, ...restOfBody } = input;

        for (const studentId of studentIds) {
            await getChallengeService().createChallenge({
                studentId,
                ...restOfBody,
                status: 'rejected'
            });
        }

        return new NextResponse(null, { status: 204 });

    } catch (error: any) {
        console.error('API Error: Failed to reject challenge', error);
        return NextResponse.json({ message: error.message || 'Failed to reject challenge' }, { status: 500 });
    }
}

export async function getChallengesByStudentIdHandler(request: NextRequest, authUser: AuthenticatedUserPayload, context: GenericRouteContext) {
    try {
        const studentId = context.params.studentId as string;
        const challenges = await getChallengeService().getChallengesByStudentId(studentId);
        return NextResponse.json(challenges);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function getAllChallengesHandler(request: NextRequest) {
    try {
        const challenges = await getChallengeService().getAllChallenges();
        return NextResponse.json(challenges);
    } catch (error: any) {
        console.error('API Error: Failed to get all challenges', error);
        return NextResponse.json({ message: error.message || 'Failed to get all challenges' }, { status: 500 });
    }
}
