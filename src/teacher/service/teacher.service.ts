import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Teacher, TeacherDocument } from 'src/teacher/schema/teacher.schema';
import { CreateTeacherDto } from '../dto/create-teacher.dto';

@Injectable()
export class TeacherService {

    
    constructor(
        // @InjectModel('Student') private studentModel:Model<StudentDocument>,
        @InjectModel('Teacher') private teacherModel:Model<TeacherDocument>
        
    ) { }

    async createTeacher(teacher: CreateTeacherDto): Promise<Teacher>{
        const newTeacher = await new this.teacherModel(teacher);

        return newTeacher.save();
     }
    
    async deleteTeacher(teacherId: number){
        const deletedTeacher = await this.teacherModel.findOne(
            {"teacherId": teacherId}
        )

        deletedTeacher.deleteOne()

        return deletedTeacher;
    }

    async getTeacher(teacherId: number){
        const reqTeacher = await this.teacherModel.findOne(
            {"teacherId": teacherId}
        )

        return reqTeacher;
    }

    //  async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
    //     const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
    //    if (!existingStudent) {
    //      throw new NotFoundException(`Student #${studentId} not found`);
    //    }
    //    return existingStudent;
    // }

    // async deleteStudent(studentId: string): Promise<IStudent> {
    //     const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    //    if (!deletedStudent) {
    //      throw new NotFoundException(`Student #${studentId} not found`);
    //    }
    //    return deletedStudent;
    // }
}
