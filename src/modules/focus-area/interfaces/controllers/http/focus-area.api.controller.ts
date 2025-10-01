
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IFocusAreaService } from "@/modules/focus-area/domain/interfaces/focus-area-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getFocusAreaService = () => resolve<IFocusAreaService>(SERVICE_KEYS.FocusAreaService);

export async function getAllFocusAreasHandler() {
    try {
        const focusAreas = await getFocusAreaService().getAllFocusAreas();
        return NextResponse.json(focusAreas);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function createFocusAreaHandler(request: NextRequest) {
    try {
        const body = await request.json(); // { names: ["area1", "area2"] }
        const newFocusAreas = await getFocusAreaService().createFocusAreas(body);
        return NextResponse.json(newFocusAreas, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function generateFocusAreaSuggestionHandler(request: NextRequest) {
    try {
        const body = await request.json(); // { language: "en", existingFocusAreas: [...], customPrompt?: "..." }
        const suggestions = await getFocusAreaService().generateFocusAreaSuggestions(body.language, body.existingFocusAreas, body.customPrompt);
        return NextResponse.json({ suggestions });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Failed to generate suggestions' }, { status: 500 });
    }
}

export async function updateFocusAreaHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const { id } = params;
        const { name } = await request.json();
        const updatedFocusArea = await getFocusAreaService().updateFocusArea(id as string, name);
        if (!updatedFocusArea) {
            return NextResponse.json({ message: 'Focus area not found' }, { status: 404 });
        }
        return NextResponse.json(updatedFocusArea);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function deleteFocusAreaHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const { id } = params;
        await getFocusAreaService().deleteFocusArea(id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
