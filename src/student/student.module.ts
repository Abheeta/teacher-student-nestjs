import { Module } from '@nestjs/common';
import { StudentService } from './service/student.service';
import { StudentController } from './controller/student.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from '../teacher/schema/teacher.schema';
import { TeacherModule } from '../teacher/teacher.module';
import { Course } from '../course/schema/course.schema';
import { CourseModule } from '../course/course.module';


@Module({
  imports: [MongooseModule.forFeatureAsync([
    { 
      name: Student.name,
      inject: [getModelToken(Course.name)],
      imports: [CourseModule],
      // imports: [MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }])],
      useFactory: (courseModel) =>{
        const schema = StudentSchema;
        schema.pre('save', function(){
          // this.courses.forEach(async (value) => {
          //   const result = courseModel.find({
          //     "class": {$eq: this.class},
          //     "name": {$in: this.courses}
          //   }).exec();
          //   console.log(result);
          // })
       
          // const result = courseModel.updateMany(
          //   {
              
          //       "class": {$eq: this.class},
          //       "name": {$in: this.courses}
            
          //   },
          //   {
          //     $push: {"students": this._id}
          //   } 
          // )
          // console.log(result)

          courseModel.bulkWrite(
            this.courses.map(value =>{
              return {updateOne: {
                "filter": {"class": this.class, "name": value},
                "update": { $push: {"students": this._id}},
                "upsert": true
              }}
            })
          )
        })
        return schema;
      }  
    }]),
  // TeacherModule
  ],
  
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
