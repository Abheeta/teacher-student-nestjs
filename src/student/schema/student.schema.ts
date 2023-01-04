import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import * as mongoose from 'mongoose';
import { Teacher } from "src/teacher/schema/teacher.schema";

export type StudentDocument = mongoose.HydratedDocument<Student>;

@Schema()
export class Student {
  
   @Prop({required:true, index:true, unique:true})
   studentId: number;
   @Prop()
   name: string;
   @Prop()
   class: number;
   @Prop()
   courses:[string];

}
export const StudentSchema = SchemaFactory.createForClass(Student);