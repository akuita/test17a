import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { Employee } from 'src/entities/employees';
import { BaseRepository } from 'src/shared/base.repository';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async recordEmployeeCheckIn(employeeId: number, checkInTime: Date): Promise<{ status: string }> {
    // Assuming the allowed check-in time window is from 8 AM to 10 AM
    const startTime = dayjs().hour(8).minute(0).second(0);
    const endTime = dayjs().hour(10).minute(0).second(0);
    if (!dayjs(checkInTime).isBetween(startTime, endTime)) {
      throw new Error('Check-in time is outside the allowed window.');
    }

    const existingRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        check_in_time: dayjs(checkInTime).startOf('day').toDate(),
      },
    });

    if (existingRecord) {
      return { status: 'Employee has already checked in today.' };
    }

    const newRecord = this.attendanceRecordRepository.create({
      employee_id: employeeId,
      check_in_time: checkInTime,
      check_in_status: 'checked_in',
    });

    await this.attendanceRecordRepository.save(newRecord);

    return { status: 'Check-in has been recorded successfully.' };
  }
}