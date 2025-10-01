
import mongoose from "mongoose";
import { MaterialType } from "../application/dtos/language-support.dto";

export class LanguageSupport {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public nativeLanguage: string,
        public focusAreas: string[],
        public teacherGuide: string,
        public studentMaterial: string,
        public studentMaterialTranslation: string,
        public createdAt: Date,
        public updatedAt: Date,
        public materialType?: MaterialType,
        public feedback?: string,
        public audioUrl?: string
    ) {}
}
