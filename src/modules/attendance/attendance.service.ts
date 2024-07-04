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

  async activateCheckoutButton(employeeId: number, date: string): Promise<{ activate: boolean }> {
    try {
      const attendanceRecord = await this.attendanceRecordRepository.findOne({
        where: {
          employee_id: employeeId,
          date: date,
          check_out_time: null,
        },
      });

      return { activate: !!attendanceRecord };
    } catch (error) {
      // Log the error or handle it as per the project's error handling policy
      return { activate: false };
    }
  }
}