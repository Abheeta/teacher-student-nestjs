import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { Teacher } from '../schema/teacher.schema';
import { TeacherService } from '../service/teacher.service';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService){}

    @Post()
    async create(@Res() response, @Body() teacher: CreateTeacherDto){
        const newTeacher = await this.teacherService.createTeacher(teacher);
        return response.status(HttpStatus.CREATED).json({
            newTeacher
        });
    }
}
