
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { CreateStudentDTO } from '../../../application/dtos/create-student.dto';
import { UpdateStudentDTO } from '../../../application/dtos/update-student.dto';
import { IStudentRepository } from '../../../domain/interfaces/student-repository.interface';
import { Student } from '../../../domain/student.entity';

export class StudentEncryptionRepository implements IStudentRepository {
  constructor(
    private readonly decoratedRepository: IStudentRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  private encryptStudentData(data: Partial<CreateStudentDTO> | Partial<UpdateStudentDTO>): any {
    const encryptedData = { ...data };
    if (encryptedData.name) {
      encryptedData.name = this.encryptionService.encrypt(encryptedData.name);
    }
    if (encryptedData.qualities) {
      encryptedData.qualities = encryptedData.qualities.map(q => this.encryptionService.encrypt(q));
    }
    if (encryptedData.notes) {
      encryptedData.notes = this.encryptionService.encrypt(encryptedData.notes);
    }
    if (encryptedData.disability) {
      encryptedData.disability = this.encryptionService.encrypt(encryptedData.disability);
    }
    if (encryptedData.neurodiversity) {
        encryptedData.neurodiversity = this.encryptionService.encrypt(encryptedData.neurodiversity);
    }
    if (encryptedData.fears) {
        encryptedData.fears = encryptedData.fears.map(fear => this.encryptionService.encrypt(fear));
    }
    if (encryptedData.age !== undefined) {
        encryptedData.age = this.encryptionService.encrypt(String(encryptedData.age)) as any;
    }
    if (encryptedData.gender !== undefined) {
        encryptedData.gender = this.encryptionService.encrypt(encryptedData.gender) as any;
    }
    if (encryptedData.isAbsent !== undefined) {
        encryptedData.isAbsent = this.encryptionService.encrypt(String(encryptedData.isAbsent)) as any;
    }
    return encryptedData;
  }

  private decryptStudent(student: Student | null): Student | null {
    if (!student) {
      return null;
    }
    const decryptedStudent = { ...student };
    if (decryptedStudent.name) {
      decryptedStudent.name = this.encryptionService.decrypt(decryptedStudent.name);
    }
    if (decryptedStudent.qualities) {
        decryptedStudent.qualities = decryptedStudent.qualities.map(q => this.encryptionService.decrypt(q));
    }
    if (decryptedStudent.notes) {
      decryptedStudent.notes = this.encryptionService.decrypt(decryptedStudent.notes);
    }
    if (decryptedStudent.disability) {
        decryptedStudent.disability = this.encryptionService.decrypt(decryptedStudent.disability);
    }
    if (decryptedStudent.neurodiversity) {
        decryptedStudent.neurodiversity = this.encryptionService.decrypt(decryptedStudent.neurodiversity);
    }
    if (decryptedStudent.fears) {
        decryptedStudent.fears = decryptedStudent.fears.map(fear => this.encryptionService.decrypt(fear));
    }
    if (decryptedStudent.age !== undefined) {
        try {
            const decryptedAge = this.encryptionService.decrypt(String(decryptedStudent.age));
            decryptedStudent.age = parseInt(decryptedAge, 10);
        } catch (e) {
             // It might be unencrypted from before
             decryptedStudent.age = Number(student.age);
        }
    }
    if (decryptedStudent.gender) {
         try {
            decryptedStudent.gender = this.encryptionService.decrypt(decryptedStudent.gender as any) as any;
        } catch (e) {
            // unencrypted
        }
    }
    if (decryptedStudent.isAbsent !== undefined) {
         try {
            const decryptedIsAbsent = this.encryptionService.decrypt(String(decryptedStudent.isAbsent));
            decryptedStudent.isAbsent = decryptedIsAbsent === 'true';
        } catch(e) {
             // unencrypted
             decryptedStudent.isAbsent = Boolean(student.isAbsent);
        }
    }
    return decryptedStudent;
  }

  async create(studentData: Omit<Student, 'id'>): Promise<Student> {
    const encryptedData = this.encryptStudentData(studentData);
    const student = await this.decoratedRepository.create(encryptedData);
    return this.decryptStudent(student) as Student;
  }

  async findAll(): Promise<Student[]> {
    const students = await this.decoratedRepository.findAll();
    return students.map(student => this.decryptStudent(student) as Student);
  }

  async findById(id: any): Promise<Student | null> {
    const student = await this.decoratedRepository.findById(id);
    return this.decryptStudent(student);
  }
  
  async findByPublicId(publicId: string): Promise<Student | null> {
    const student = await this.decoratedRepository.findByPublicId(publicId);
    return this.decryptStudent(student);
  }

  async findByName(name: string): Promise<Student | null> {
    // We must encrypt the name before searching
    const encryptedName = this.encryptionService.encrypt(name);
    const student = await this.decoratedRepository.findByName(encryptedName);
    return this.decryptStudent(student);
  }

  async update(id: any, studentData: UpdateStudentDTO): Promise<Student | null> {
    const encryptedData = this.encryptStudentData(studentData);
    const student = await this.decoratedRepository.update(id, encryptedData);
    return this.decryptStudent(student);
  }

  async delete(id: any): Promise<void> {
    return this.decoratedRepository.delete(id);
  }
}
