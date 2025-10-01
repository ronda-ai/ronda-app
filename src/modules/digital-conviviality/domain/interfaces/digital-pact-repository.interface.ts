
import { DigitalPactDTO } from "../../application/dtos/digital-pact.dto";
import { CreateDigitalPactDTO } from "../../application/dtos/create-digital-pact.dto";
import { DigitalPact } from "../digital-conviviality.entity";

export interface IDigitalPactRepository {
    create(data: CreateDigitalPactDTO): Promise<DigitalPact>;
    findAll(): Promise<DigitalPact[]>;
    findById(id: string): Promise<DigitalPact | null>;
    update(id: string, data: Partial<DigitalPact>): Promise<DigitalPact | null>;
    delete(id: string): Promise<void>;
}
