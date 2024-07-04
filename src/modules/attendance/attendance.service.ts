import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employees';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
  ) {}

  async recordEmployeeCheckIn(
    employeeId: number,
    checkInTime: string,
    date: string,
  ): Promise<{ success: boolean; message: string; checkInDetails?: AttendanceRecord } | { success: boolean; error: string }> {
    try {
      // Validate the employee_id
      const employee = await this.employeeRepository.findOneBy({ id: employeeId });
      if (!employee) {
        return { success: false, error: 'Invalid employee ID' };
      }

      // Check if the employee has already checked in for the current date
      const existingRecord = await this.attendanceRecordRepository.findOneBy({
        employee_id: employeeId,
        date: date,
      });
      if (existingRecord) {
        return { success: false, error: 'Employee has already checked in for today' };
      }

      // Record the check-in
      const checkInRecord = this.attendanceRecordRepository.create({
        employee_id: employeeId,
        check_in_time: checkInTime,
        date: date,
      });
      await this.attendanceRecordRepository.save(checkInRecord);

      return { success: true, message: 'Check-in recorded successfully', checkInDetails: checkInRecord };
    } catch (error) {
      return { success: false, error: 'An error occurred while recording check-in' };
    }
  }
}