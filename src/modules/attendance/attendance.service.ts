import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
  ) {}

  async checkDuplicateCheckIn(employeeId: number, date: string): Promise<boolean> {
    const existingRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        date: date,
      },
    });
    return !!existingRecord;
  }
}