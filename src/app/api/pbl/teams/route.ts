

import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IPblService } from "@/modules/pbl/domain/interfaces/pbl-service.interface";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";
import { ITeamFormationRepository } from "@/modules/pbl/domain/interfaces/pbl-repository.interface";
import { TeamFormationMapper } from "@/modules/pbl/application/mappers/team-formation.mapper";

const getTeamFormationRepository = () => resolve<ITeamFormationRepository>(SERVICE_KEYS.TeamFormationRepository);

async function getTeamsForProjectHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    try {
        const repo = getTeamFormationRepository();
        if (projectId) {
            const teamFormations = await repo.findByProjectId(projectId);
            const dtos = teamFormations.map(TeamFormationMapper.toDTO);
            return NextResponse.json(dtos);
        } else {
            // If no projectId is provided, return all team formations
            const allTeamFormations = await repo.findAll();
            const dtos = allTeamFormations.map(TeamFormationMapper.toDTO);
            return NextResponse.json(dtos);
        }
    } catch (error: any) {
        console.error(`API Error: Failed to get team formations`, error);
        return NextResponse.json({ message: error.message || 'Failed to get team formations' }, { status: 500 });
    }
}

export const GET = withAuthorization(getTeamsForProjectHandler, isTeacher);
    