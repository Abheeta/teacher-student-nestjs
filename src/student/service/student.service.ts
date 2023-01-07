import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { Model } from "mongoose";
import { Student, StudentDocument } from '../schema/student.schema';

@Injectable()
export class StudentService {


    constructor(
        @InjectModel('Student') private studentModel:Model<StudentDocument>,
        
    ) { }

    async createStudent(student: CreateStudentDto): Promise<Student>{
        // console.log(student);
    
        const newStudent = await new this.studentModel(student);
        
        return newStudent.save();
     }
    
    async deleteStudent(studentId: number){
        

       const deletedStudent  = await this.studentModel.findOne(
        {"studentId": studentId} 
       ) 
       
       console.log(deletedStudent) 
       deletedStudent.deleteOne() 

       return deletedStudent

    }

    async getStudent(studentId: number){

        const reqStudent = await this.studentModel.findOne(
            {"studentId": studentId}
        )

        return reqStudent;

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
