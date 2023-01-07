import { Module } from '@nestjs/common';
import { TeacherService } from './service/teacher.service';
import { TeacherController } from './controller/teacher.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schema/teacher.schema';
import { Course } from '../course/schema/course.schema';
import { CourseModule } from '../course/course.module';


@Module({
  // imports: [MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }])],
  imports: [MongooseModule.forFeatureAsync([
    { 
      name: Teacher.name,
      inject: [getModelToken(Course.name)],
      imports: [CourseModule],
      // imports: [MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }])],
      useFactory: (courseModel) =>{
        const schema = TeacherSchema;
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
            this.teaches.map(value =>{ 
              return {updateOne: {
                "filter": {"class": value.class, "name": value.course},
                "update": { $push: {"teachers": this._id}},
                "upsert": true
              }}
            })
          )
        })

        schema.pre('deleteOne',{document: true, query: false }, async function(){
          console.log(this)
          await courseModel.updateMany(
            {
              "teachers": this._id
            },
            {
              $pull: {"teachers": this._id}
            }
          )
        })
        return schema;
      }  
    }]),
  // TeacherModule
  ],
  
  providers: [TeacherService],
  controllers: [TeacherController],
  exports: [ TeacherService,MongooseModule]
})
export class TeacherModule {}
