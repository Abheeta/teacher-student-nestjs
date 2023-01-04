import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Student } from "src/student/schema/student.schema";
export class CreateTeacherDto {
    @IsNumber()
    @IsNotEmpty()
    readonly teacherId: number;
    
    
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly name: string;
  
    
    @IsNotEmpty()
    readonly teaches: [{
        class:number,
        course:string
    }];


    
}
