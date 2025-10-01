
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ILightningRoundService } from "@/modules/lightning-round/domain/interfaces/lightning-round-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getLightningRoundService = () => resolve<ILightningRoundService>(SERVICE_KEYS.LightningRoundService);

export async function generateRoundHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await getLightningRoundService().generateRound(body);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate lightning round', error);
        return NextResponse.json({ message: error.message || 'Failed to generate lightning round' }, { status: 500 });
    }
}

export async function getAllRoundsHandler(request: NextRequest) {
    try {
        const rounds = await getLightningRoundService().getAllRounds();
        return NextResponse.json(rounds);
    } catch (error: any) {
        console.error('API Error: Failed to get lightning rounds', error);
        return NextResponse.json({ message: error.message || 'Failed to get lightning rounds' }, { status: 500 });
    }
}

export async function updateRoundHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const { id } = params;
        const body = await request.json();
        const updatedRound = await getLightningRoundService().updateRound(id as string, body);
        if (!updatedRound) {
            return NextResponse.json({ message: "Round not found" }, { status: 404 });
        }
        return NextResponse.json(updatedRound);
    } catch (error: any) {
        console.error('API Error: Failed to update lightning round', error);
        return NextResponse.json({ message: error.message || 'Failed to update round' }, { status: 500 });
    }
}


export async function deleteRoundHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const { id } = params;
        await getLightningRoundService().deleteRound(id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete lightning round', error);
        return NextResponse.json({ message: error.message || 'Failed to delete lightning round' }, { status: 500 });
    }
}
