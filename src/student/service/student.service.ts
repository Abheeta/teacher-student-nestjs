import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { Model } from "mongoose";
import { Student, StudentDocument } from '../schema/student.schema';
import { UpdateStudentDto } from '../dto/update-student.dto';

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

    async updateStudent(id: number, updates: UpdateStudentDto){

    }


    async updateStudent(studentId: number, updates: UpdateStudentDto) {
        // console.log(updates, studentId);
        const updateQuery = {
            set: {},
            push: {},
            pull: {}
        };
        updates.updateOps.forEach(element => {
            // console.log(element);
            if(element.op === "replace") {
                updateQuery.set[element.path] = element.value;
            }
            else {
                updateQuery[element.op === "add" ? "push" : "pull"][element.path] = element.value
            }
        });

        // console.log(updateQuery)

        let updatedStudent = await this.studentModel.findOne({
            "studentId": studentId
        }).exec();

        if (!updatedStudent) {
            throw new NotFoundException(`Student #${studentId} not found`);
        }

        updatedStudent = await this.studentModel.findOneAndUpdate({
            "_id": updatedStudent._id,
            "class": updatedStudent.class,
            "courses": updatedStudent.courses
        }, {
            $pullAll: { "courses": updateQuery.pull["courses"] }
        }, { new: true });

        console.log("2: " + updatedStudent);

      

        updatedStudent = await this.studentModel.findOneAndUpdate({
            "_id": updatedStudent._id,
            "class": updatedStudent.class,
            "courses": updatedStudent.courses
        }, {
            $set: updateQuery.set,
            $push: { "courses": { $each: updateQuery.push["courses"]} },
            // $pull: { "courses": { $each: updateQuery.pull["courses"]} }
            // $pushAll: { "courses": updateQuery.push["courses"] },
            // $pullAll: { "courses": updateQuery.pull["courses"] }
        }, { new: true });

        console.log("3: " + updatedStudent);
        
        
        
        return updatedStudent;
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
