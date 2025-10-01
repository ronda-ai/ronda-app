
import { NextResponse } from "next/server";
import { resolve } from "@/services/bootstrap";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { SERVICE_KEYS } from "@/config/service-keys";
import { AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { IExpertAdviceService } from "@/modules/expert-advice/domain/interfaces/expert-advice-service.interface";

const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);
const getAiConfigService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
const getExpertAdviceService = () => resolve<IExpertAdviceService>(SERVICE_KEYS.ExpertAdviceService);


export async function getExpertAdviceHandler(request: Request, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const { student, question, language } = body;

        const classroomConfig = await getAiConfigService().getConfiguration();
        const allStudents = await getStudentService().getAllStudents();

        const result = await getExpertAdviceService().getExpertAdvice({
            student: student,
            question,
            allStudents,
            classroomContext: {
                className: classroomConfig?.className,
                subject: classroomConfig?.subject,
                ageOrGrade: classroomConfig?.ageOrGrade,
                country: classroomConfig?.country,
                classInterests: classroomConfig?.classInterests,
            },
            language
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('API Error: Failed to get expert advice', error);
        return NextResponse.json({ message: error.message || 'Failed to get expert advice' }, { status: 500 });
    }
}
