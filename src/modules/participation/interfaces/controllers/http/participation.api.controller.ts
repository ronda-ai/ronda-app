
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IParticipationService } from "@/modules/participation/domain/interfaces/participation-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getParticipationService = () => resolve<IParticipationService>(SERVICE_KEYS.ParticipationService);

export async function addParticipationHandler(request: NextRequest, authUser: AuthenticatedUserPayload, context: GenericRouteContext) {
    try {
        const participation = await getParticipationService().addParticipation(context.params.id);
        return NextResponse.json(participation, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function removeLastParticipationHandler(request: NextRequest, authUser: AuthenticatedUserPayload, context: GenericRouteContext) {
    try {
        await getParticipationService().removeLastParticipation(context.params.id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
