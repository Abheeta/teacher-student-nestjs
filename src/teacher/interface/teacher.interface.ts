import { Document } from 'mongoose';
import { IStudent } from 'src/student/interface/student.interface';
export interface ITeacher extends Document{
    readonly teacherId: number;
    readonly name: string;
    readonly teaches: [{class:number, course:string}];
}