import { Document } from 'mongoose';
import { ITeacher } from 'src/teacher/interface/teacher.interface';
export interface IStudent extends Document{
    readonly studentId: number;
    readonly name: string;
    readonly class: number;
    readonly courses: [string];
}