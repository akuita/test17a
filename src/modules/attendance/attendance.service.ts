import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
  ) {}

  async checkDuplicateCheckIn(employeeId: number, currentDate: Date): Promise<boolean> {
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingRecord = await this.attendanceRepository.findOne({
      where: {
        employee_id: employeeId,
        check_in_time: MoreThanOrEqual(startOfDay),
        check_out_time: LessThan(endOfDay),
      },
    });

    return !!existingRecord;
  }
}