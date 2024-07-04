import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from '../../entities/attendance_records';
import { Employee } from '../../entities/employees';
import * as dayjs from 'dayjs';
import { getCurrentServerDateTime } from '../../shared/utils/date-time.util';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
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

  async recordCheckIn(employeeId: number): Promise<any> {
    try {
      // Validate that the "employeeId" corresponds to an existing employee
      const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
      if (!employee) {
        throw new Error('Employee not found.');
      }

      // Check that the "employeeId" does not have a check-in entry for the current date
      const today = dayjs().startOf('day').toDate();
      const existingRecord = await this.attendanceRecordRepository.findOne({
        where: {
          employee_id: employeeId,
          date: today,
        },
      });
      if (existingRecord) {
        throw new Error('Employee has already checked in today.');
      }

      // Create a new "AttendanceRecord" entity with the check-in time and associate it with the employee
      const checkInTime = getCurrentServerDateTime();
      const attendanceRecord = this.attendanceRecordRepository.create({
        check_in_time: checkInTime,
        date: today,
        employee_id: employeeId,
      });

      // Save the new attendance record to the database
      await this.attendanceRecordRepository.save(attendanceRecord);

      // Return the details of the check-in operation
      return {
        status: 200,
        message: 'Check-in recorded successfully.',
        check_in_details: {
          employee_id: employeeId,
          check_in_time: checkInTime,
          date: today,
        },
      };
    } catch (error) {
      throw new Error(`Failed to record check-in: ${error.message}`);
    }
  }
}