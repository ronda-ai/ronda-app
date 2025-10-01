
import { NextResponse } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";

const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);

export async function getSuggestionHandler(request: Request) {
    try {
        const body = await request.json();
        const result = await getStudentService().generateProfileSuggestion(body);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate profile suggestion', error);
        return NextResponse.json({ message: error.message || 'Failed to generate profile suggestion' }, { status: 500 });
    }
}
