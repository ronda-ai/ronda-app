
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";

const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);

interface Params {
    publicId: string;
}

export async function PUT(request: NextRequest, context: { params: Params }) {
    try {
        const { publicId } = context.params;
        const { themeName } = await request.json();

        if (!themeName) {
            return NextResponse.json({ message: "themeName is required" }, { status: 400 });
        }

        await getStudentService().updatePublicProfileTheme(publicId, themeName);

        return new NextResponse(null, { status: 204 });

    } catch (error: any) {
        console.error('API Error: Failed to update public profile theme', error);
        return NextResponse.json({ message: error.message || 'Failed to update theme' }, { status: 500 });
    }
}
