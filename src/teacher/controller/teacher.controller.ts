import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { response } from "express";
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

    @Delete('/:id')
    async delete(@Res() response, @Param('id') teacherId:number){
    await this.teacherService.deleteTeacher(teacherId);
    return response.status(HttpStatus.OK).json({
        teacherId: teacherId,
        message: "The requested teacher has been deleted"
    })
}
}
