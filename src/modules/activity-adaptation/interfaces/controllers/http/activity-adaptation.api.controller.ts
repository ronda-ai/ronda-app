
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IActivityAdaptationService } from "@/modules/activity-adaptation/domain/interfaces/activity-adaptation-service.interface";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";

const getActivityAdaptationService = () => resolve<IActivityAdaptationService>(SERVICE_KEYS.ActivityAdaptationService);
const getAiConfigurationService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);

export async function createAdaptationHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const { originalActivity, language, students: selectedStudents, customPrompt } = body;

        const aiConfig = await getAiConfigurationService().getConfiguration();
        
        let studentNeeds: string[] = [];
        let classInterests: string[] = aiConfig?.classInterests || [];

        if (selectedStudents && selectedStudents.length > 0) {
            const studentIds = selectedStudents.map((s: StudentDTO) => s.id);
            const fullStudentData = await Promise.all(studentIds.map((id: string) => getStudentService().getStudentById(id)));
            
            const validStudents = fullStudentData.filter(Boolean) as StudentDTO[];
            
            studentNeeds = [...new Set(validStudents.flatMap(s => [s.disability, s.neurodiversity, ...(s.fears || [])]).filter(Boolean) as string[])];
            classInterests = [...new Set(validStudents.flatMap(s => s.qualities || []))];
        } else {
            const allStudents = await getStudentService().getAllStudents();
            studentNeeds = [...new Set(allStudents.flatMap(s => [s.disability, s.neurodiversity]).filter(Boolean) as string[])];
        }

        const savedAdaptation = await getActivityAdaptationService().createAdaptation({
            originalActivity,
            suggestions: [], // The service will call the AI flow
            studentNeeds,
            classInterests,
            ageOrGrade: aiConfig?.ageOrGrade,
            country: aiConfig?.country,
            subject: aiConfig?.subject,
            customPrompt
        }, language);
        
        return NextResponse.json(savedAdaptation);

    } catch (error: any) {
        console.error('API Error: Failed to generate activity adaptations', error);
        return NextResponse.json({ message: error.message || 'Failed to generate adaptations' }, { status: 500 });
    }
}

export async function getAllAdaptationsHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const adaptations = await getActivityAdaptationService().getAllAdaptations();
        return NextResponse.json(adaptations);
    } catch (error: any) {
        console.error('API Error: Failed to get activity adaptations', error);
        return NextResponse.json({ message: error.message || 'Failed to get adaptations' }, { status: 500 });
    }
}
