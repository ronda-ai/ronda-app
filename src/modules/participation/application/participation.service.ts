
import { IParticipationRepository } from "../domain/interfaces/participation-repository.interface";
import { IParticipationService } from "../domain/interfaces/participation-service.interface";
import { ParticipationDTO } from "./dtos/participation.dto";
import { ParticipationMapper } from "./mappers/participation.mapper";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";

const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);

export class ParticipationService implements IParticipationService {
    constructor(private readonly participationRepository: IParticipationRepository) {}

    async addParticipation(studentId: any): Promise<ParticipationDTO> {
        const participation = await this.participationRepository.create(studentId);
        return ParticipationMapper.toDTO(participation);
    }

    async removeLastParticipation(studentId: any): Promise<void> {
        const participations = await this.participationRepository.findByStudentId(studentId);
        if (participations.length > 0) {
            // Sort by date descending to find the last one
            const lastParticipation = participations.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
            await this.participationRepository.delete(lastParticipation.id);
        }
    }

    async getParticipations(studentId: any): Promise<ParticipationDTO[]> {
        const participations = await this.participationRepository.findByStudentId(studentId);
        return participations.map(ParticipationMapper.toDTO);
    }
    
    async getParticipationCount(studentId: any): Promise<number> {
        return await this.participationRepository.countByStudentId(studentId);
    }

    async deleteParticipationsForStudent(studentId: any): Promise<void> {
        await this.participationRepository.deleteByStudentId(studentId);
    }

    async getParticipationCountByDateRange(startDate: string, endDate: string, studentIds: string[]): Promise<{ id: string; name: string; count: number }[]> {
        const participationCounts = await this.participationRepository.countByDateRange(new Date(startDate), new Date(endDate), studentIds);
        
        // Fetch all students to map IDs to names after the query
        const studentService = getStudentService();
        const allStudents = await studentService.getAllStudents();
        const studentMap = new Map(allStudents.map(s => [s.id, s.name]));
        
        const resultsWithName = participationCounts.map(pc => ({
            ...pc,
            name: studentMap.get(pc.id) || 'Unknown Student'
        }));

        return resultsWithName;
    }
}
