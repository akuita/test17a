import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from '../../entities/attendance_records';
import { Employee } from '../../entities/employees';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async enableCheckOutButton(employeeId: number): Promise<boolean> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const attendanceRecord = await this.attendanceRecordRepository.findOne({
        where: {
          employee_id: employeeId,
          date: today,
        },
        order: {
          created_at: 'DESC',
        },
      });

      return (
        attendanceRecord &&
        attendanceRecord.check_in_time &&
        !attendanceRecord.check_out_time
      );
    } catch (error) {
      // Log the error or handle it as per the project's error handling policy
      console.error('Error enabling check-out button:', error);
      return false;
    }
  }
}