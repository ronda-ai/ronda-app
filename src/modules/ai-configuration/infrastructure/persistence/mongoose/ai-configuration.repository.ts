

import { dbConnect } from "@/lib/mongodb";
import { IAIConfigurationRepository } from "../../../domain/interfaces/ai-configuration-repository.interface";
import AIConfigurationModel, { IAIConfigurationDocument } from "./ai-configuration.schema";
import { AIConfiguration } from "../../../domain/ai-configuration.entity";

export class MongooseAIConfigurationRepository implements IAIConfigurationRepository {

    private toDomain(doc: IAIConfigurationDocument): AIConfiguration {
        return new AIConfiguration(
            doc._id.toString(),
            doc.subject,
            doc.ageOrGrade,
            doc.country,
            doc.challengeLocation,
            doc.createdAt,
            doc.updatedAt,
            doc.className,
            doc.classInterests,
            doc.customPrompt,
            doc.negativePrompt,
            doc.plugin,
            doc.modelName,
            doc.ollamaBaseUrl,
            doc.analysisLevel,
            doc.theme ? {
                name: doc.theme.name,
                primary: doc.theme.primary,
                background: doc.theme.background,
                accent: doc.theme.accent,
            } : undefined
        );
    }

    async find(): Promise<AIConfiguration | null> {
        await dbConnect();
        // Since there is only one configuration document, we find the first one.
        const doc = await AIConfigurationModel.findOne().exec();
        return doc ? this.toDomain(doc) : null;
    }

    async upsert(data: Partial<AIConfiguration>): Promise<AIConfiguration> {
        await dbConnect();
        // Upsert the single configuration document.
        const doc = await AIConfigurationModel.findOneAndUpdate({}, data, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }).exec();
        return this.toDomain(doc);
    }
}
