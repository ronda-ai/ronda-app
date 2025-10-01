
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IEvaluationService } from "@/modules/evaluation/domain/interfaces/evaluation-service.interface";

const getEvaluationService = () => resolve<IEvaluationService>(SERVICE_KEYS.EvaluationService);

export async function evaluateChallengeHandler(request: NextRequest) {
    try {
        const body = await request.json();
        await getEvaluationService().evaluateChallenge(body);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to evaluate challenge', error);
        return NextResponse.json({ message: error.message || 'Failed to evaluate challenge' }, { status: 400 });
    }
}
