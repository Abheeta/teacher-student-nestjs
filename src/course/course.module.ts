import { Module } from '@nestjs/common';
import { CourseService } from './service/course.service';
import { CourseController } from './controller/course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }])],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [MongooseModule]
})
export class CourseModule {}
