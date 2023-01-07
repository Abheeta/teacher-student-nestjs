import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Query } from "@nestjs/common/decorators";
import { response } from "express";
import { CreateStudentDto } from "../dto/create-student.dto";
import { Student } from '../schema/student.schema';
import { StudentService } from '../service/student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService){}

    @Post()
    async create(@Res() response, @Body() student: CreateStudentDto){
        const newStudent = await this.studentService.createStudent(student);
        return response.status(HttpStatus.CREATED).json({
            newStudent
        })
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') studentId:number){
        await this.studentService.deleteStudent(studentId);
        return response.status(HttpStatus.OK).json({
            studentId: studentId,
            message: "The requested student has been deleted"
        })
    }

    @Get('/:id')
    async get(@Res() response, @Param('id') studentId: number){
        const student = await this.studentService.getStudent(studentId);
        return response.status(HttpStatus.OK).json(
            {student}
        )
    }

    // @Get()
    // async getAll(@Res() response){
        
        
    // }



}
