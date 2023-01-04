import { Document } from 'mongoose';
import { ITeacher } from 'src/teacher/interface/teacher.interface';
export interface IStudent extends Document{
    readonly class: number;
    readonly name: string;
    teachers: [ITeacher];
    students: [IStudent];

}