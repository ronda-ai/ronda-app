
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ISkillService } from "@/modules/skill/domain/interfaces/skill-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getSkillService = () => resolve<ISkillService>(SERVICE_KEYS.SkillService);

export async function getAllSkillsHandler() {
    try {
        const skills = await getSkillService().getAllSkills();
        return NextResponse.json(skills);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function createSkillHandler(request: NextRequest) {
    try {
        const body = await request.json(); // { names: ["skill1", "skill2"] }
        const newSkills = await getSkillService().createSkills(body);
        return NextResponse.json(newSkills, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function generateSkillSuggestionHandler(request: NextRequest) {
    try {
        const body = await request.json(); // { language: "en", existingSkills: [...], customPrompt?: "..." }
        const suggestions = await getSkillService().generateSkillSuggestions(body.language, body.existingSkills, body.customPrompt);
        return NextResponse.json({ suggestions });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Failed to generate suggestions' }, { status: 500 });
    }
}

export async function updateSkillHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const { id } = params;
        const { name } = await request.json();
        const updatedSkill = await getSkillService().updateSkill(id as string, name);
        if (!updatedSkill) {
            return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
        }
        return NextResponse.json(updatedSkill);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function deleteSkillHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const { id } = params;
        await getSkillService().deleteSkill(id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
