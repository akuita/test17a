import { Injectable, BadRequestException, NotFoundException, ConflictException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isInt, isDate } from 'class-validator';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { Employee } from 'src/entities/employees';
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

  async recordEmployeeCheckIn(employeeId: any, checkInTime: any): Promise<{ status: number, message: string }> {
    // Validate employee_id format
    if (!isInt(employeeId)) {
      throw new BadRequestException('Invalid employee ID format.');
    }

    // Validate check_in_time format
    if (!isDate(checkInTime)) {
      throw new BadRequestException('Invalid check-in time format.');
    } 

    // Check if employee exists
    const employee = await this.employeeRepository.findOne(employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }

    // Assuming the allowed check-in time window is from 8 AM to 10 AM (configurable)
    const startTime = dayjs().hour(8).minute(0).second(0);
    const endTime = dayjs().hour(10).minute(0).second(0);
    if (!dayjs(checkInTime).isBetween(startTime, endTime)) {
      throw new BadRequestException('Check-in time is outside the allowed window.');
    }

    const existingRecord = await this.attendanceRecordRepository.findOne({
      where: { 
        employee_id: employeeId,
        check_in_time: dayjs(checkInTime).startOf('day').toDate(),
      },
    });

    if (existingRecord) {
      throw new ConflictException('The employee has already checked in for the day.');
    }

    const newRecord = this.attendanceRecordRepository.create({
      employee_id: employeeId,
      check_in_time: checkInTime,
      check_in_status: 'checked_in',
    });

    try {
      await this.attendanceRecordRepository.save(newRecord); 
      return { status: 200, message: 'Check-in recorded successfully.' };
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error has occurred on the server.');
    }
  }
}