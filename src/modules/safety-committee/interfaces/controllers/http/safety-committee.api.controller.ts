
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { ISafetyCommitteeService } from "@/modules/safety-committee/domain/interfaces/safety-committee-service.interface";

const getSafetyCommitteeService = () => resolve<ISafetyCommitteeService>(SERVICE_KEYS.SafetyCommitteeService);

export async function createCommitteeHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const newCommittee = await getSafetyCommitteeService().createCommittee(body);
        return NextResponse.json(newCommittee, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function getAllCommitteesHandler() {
    try {
        const committees = await getSafetyCommitteeService().getAllCommittees();
        return NextResponse.json(committees);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function deleteCommitteeHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const committeeId = params.id as string;
        await getSafetyCommitteeService().deleteCommittee(committeeId);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// === Member Management ===

export async function addMemberHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const committeeId = params.id as string;
        const { studentId, role } = await request.json();
        const updatedCommittee = await getSafetyCommitteeService().addMember(committeeId, studentId, role);
        if (!updatedCommittee) {
            return NextResponse.json({ message: "Committee not found" }, { status: 404 });
        }
        return NextResponse.json(updatedCommittee);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function removeMemberHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const { id: committeeId, memberId: studentId } = params;
        const updatedCommittee = await getSafetyCommitteeService().removeMember(committeeId as string, studentId as string);
         if (!updatedCommittee) {
            return NextResponse.json({ message: "Committee not found" }, { status: 404 });
        }
        return NextResponse.json(updatedCommittee);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function suggestRoleHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const committeeId = params.id as string;
        const { studentId, language } = await request.json();
        const suggestion = await getSafetyCommitteeService().suggestRole(committeeId, studentId, language);
        return NextResponse.json(suggestion);
    } catch(error: any) {
        return NextResponse.json({ message: error.message || 'Failed to suggest role' }, { status: 500 });
    }
}

// --- Brigade Formation ---
export async function generateBrigadeHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await getSafetyCommitteeService().generateBrigadeSuggestion(body.objective, body.criteria, body.language);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate brigade suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to generate brigade' }, { status: 500 });
    }
}
