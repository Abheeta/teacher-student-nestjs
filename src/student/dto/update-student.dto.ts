import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty, IsString, ValidateBy, ValidateIf, ValidateNested } from 'class-validator';

export class UpdateStudentDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => UpdateDescDto)
    readonly updateOps: UpdateDescDto[];
}

export class UpdateDescDto {
    @ValidateIf(
        (updateOp: UpdateDescDto) => !(
            (updateOp.op === "replace" && updateOp.path !== "courses") || 
            ((updateOp.op === "add" || updateOp.op === "remove") && updateOp.path === "courses")
        ) 
    )
    @IsNotEmpty()
    @IsString()
    @IsIn([""], {
        message: "op must be one of the following values: add, remove, replace. Also, add & remove can only be paired with path=courses, and replace can only be paired with path=name or path=class"
    })
    readonly op: string;


    @IsNotEmpty()
    @IsString()
    @IsIn(["name", "class", "courses"])
    readonly path: string;

    
    @IsNotEmpty()
    readonly value;
}