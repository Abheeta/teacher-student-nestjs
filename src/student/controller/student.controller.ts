import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
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

    // @Get()
    // async getAll(@Res() response){
        
        
    // }



}
