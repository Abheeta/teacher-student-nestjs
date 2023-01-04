import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import * as mongoose from 'mongoose';
import { Student } from "src/student/schema/student.schema";
import { Teacher } from "src/teacher/schema/teacher.schema";

export type CourseDocument = mongoose.HydratedDocument<Course>;

@Schema()
export class Course {
  
   @Prop()
   class: number;
   @Prop()
   name: string;
   @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Teacher' })
   teachers: Teacher[];
   @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Student' })
   students: Student[];

}
export const CourseSchema = SchemaFactory.createForClass(Course);