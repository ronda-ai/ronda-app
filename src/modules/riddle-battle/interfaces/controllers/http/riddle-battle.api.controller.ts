
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IRiddleBattleService } from "@/modules/riddle-battle/domain/interfaces/riddle-battle-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";

const getRiddleBattleService = () => resolve<IRiddleBattleService>(SERVICE_KEYS.RiddleBattleService);
const getAiConfigService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);

export async function createBattleHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const aiConfig = await getAiConfigService().getConfiguration();
        if (!aiConfig) {
            throw new Error("AI configuration not found.");
        }
        const savedBattle = await getRiddleBattleService().generateAndCreateBattle({ ...body, aiConfig });
        return NextResponse.json(savedBattle);
    } catch (error: any) {
        console.error('API Error: Failed to generate riddle battle', error);
        return NextResponse.json({ message: error.message || 'Failed to generate riddle battle' }, { status: 500 });
    }
}

export async function getAllBattlesHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const battles = await getRiddleBattleService().getAllBattles();
        return NextResponse.json(battles);
    } catch (error: any) {
        console.error('API Error: Failed to get riddle battles', error);
        return NextResponse.json({ message: error.message || 'Failed to get riddle battles' }, { status: 500 });
    }
}

export async function updateBattleHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const body = await request.json();
        const updatedBattle = await getRiddleBattleService().updateBattle(params.id as string, body);
        if (!updatedBattle) {
            return NextResponse.json({ message: "Battle not found" }, { status: 404 });
        }
        return NextResponse.json(updatedBattle);
    } catch (error: any) {
        console.error('API Error: Failed to update riddle battle', error);
        return NextResponse.json({ message: error.message || 'Failed to update battle' }, { status: 500 });
    }
}

export async function deleteBattleHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getRiddleBattleService().deleteBattle(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete riddle battle', error);
        return NextResponse.json({ message: error.message || 'Failed to delete battle' }, { status: 500 });
    }
}
