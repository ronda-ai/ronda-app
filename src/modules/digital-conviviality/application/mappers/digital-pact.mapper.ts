

import { DigitalPact } from "../../domain/digital-conviviality.entity";
import { DigitalPactDTO } from "../dtos/digital-pact.dto";

export class DigitalPactMapper {
    public static toDTO(pact: DigitalPact): DigitalPactDTO {
        return {
            id: pact.id,
            title: pact.title,
            principles: pact.principles,
            norms: pact.norms,
            consequences: pact.consequences,
            version: pact.version,
            publishedAt: pact.publishedAt?.toISOString(),
            createdAt: pact.createdAt.toISOString(),
            updatedAt: pact.updatedAt.toISOString(),
        };
    }
}
