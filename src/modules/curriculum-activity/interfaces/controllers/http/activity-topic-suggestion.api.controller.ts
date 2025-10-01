
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ICurriculumActivityService } from "@/modules/curriculum-activity/domain/interfaces/curriculum-activity-service.interface";

const getCurriculumActivityService = () => resolve<ICurriculumActivityService>(SERVICE_KEYS.CurriculumActivityService);

export async function generateTopicSuggestionHandler(request: NextRequest) {
  try {
    const body = await request.json();
    const suggestion = await getCurriculumActivityService().generateTopicSuggestion(
      body.language,
      body.existingSkills,
      body.classContext
    );
    return NextResponse.json(suggestion);
  } catch (error: any) {
    console.error('API Error: Failed to generate topic suggestion', error);
    return NextResponse.json(
      { message: error.message || 'Failed to generate suggestion' },
      { status: 500 }
    );
  }
}
