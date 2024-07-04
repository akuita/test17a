import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from '../../entities/attendance_records';
import * as dayjs from 'dayjs';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
  ) {}

  async checkAttendanceStatus(employeeId: number): Promise<{ isCheckInDisabled: boolean }> {
    try {
      const today = dayjs().startOf('day').toDate();
      const attendanceRecord = await this.attendanceRecordRepository.findOne({
        where: {
          employee_id: employeeId,
          date: today,
        },
      });

      return { isCheckInDisabled: !!attendanceRecord?.check_in_time };
    } catch (error) {
      throw new Error(`Failed to check attendance status: ${error.message}`);
    }
  }
}