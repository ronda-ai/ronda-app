
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IPblService } from "@/modules/pbl/domain/interfaces/pbl-service.interface";

const getPblService = () => resolve<IPblService>(SERVICE_KEYS.PblService);

async function generateTeamsHandler(request: NextRequest) {
    try {
        const body = await request.json();
        // This now generates and saves the team formation
        const teamFormation = await getPblService().generateAndSaveTeams(body);
        return NextResponse.json(teamFormation, { status: 201 });
    } catch (error: any) {
        console.error('API Error: Failed to generate PBL teams', error);
        return NextResponse.json({ message: error.message || 'Failed to generate teams' }, { status: 500 });
    }
}

export { generateTeamsHandler };
