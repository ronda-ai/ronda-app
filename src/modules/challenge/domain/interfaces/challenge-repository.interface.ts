
import { CreateChallengeDTO } from "../../application/dtos/create-challenge.dto";
import { UpdateChallengeDTO } from "../../application/dtos/update-challenge.dto";
import { Challenge } from "../challenge.entity";


export interface IChallengeRepository {
    create(data: CreateChallengeDTO): Promise<Challenge>;
    findAll(): Promise<Challenge[]>;
    findByStudentId(studentId: string): Promise<Challenge[]>;
    update(id: string, data: UpdateChallengeDTO): Promise<Challenge | null>;
    deleteByStudentId(studentId: string): Promise<void>;
}
