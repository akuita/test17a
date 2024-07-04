import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../entities/employees';
import { AttendanceRecord } from '../../entities/attendance_records';
import * as dayjs from 'dayjs';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async updateCheckInButtonState(employeeId: number): Promise<{ check_in_button_state: string; check_out_button_state: string }> {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    if (!employee) {
      throw new Error('Employee not found.');
    }

    const today = dayjs().startOf('day').toDate();
    const attendanceRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        date: today,
      },
    });

    if (!attendanceRecord) {
      throw new Error('Employee check-in record not found.');
    }

    return { check_in_button_state: 'disabled', check_out_button_state: 'active' };
  }

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