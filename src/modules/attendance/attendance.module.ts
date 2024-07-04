import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { Employee } from 'src/entities/employees';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceRecord, Employee])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}