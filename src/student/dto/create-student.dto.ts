import { IsNotEmpty, IsNumber, IsNumberString, IsString, MaxLength } from "class-validator";
import { Teacher } from "src/teacher/schema/teacher.schema";
export class CreateStudentDto {
    @IsNotEmpty()
    @IsNumberString()
    readonly studentId: number;
    
    
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly name: string;
  
    
    @IsNumber()
    @IsNotEmpty()
    readonly class: number;

    // @MaxLength(30)
    @IsNotEmpty()
    readonly courses: [string];

}
