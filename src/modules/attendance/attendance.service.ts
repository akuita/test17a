import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: BaseRepository<AttendanceRecord>,
  ) {}

  async checkAttendanceStatus(employeeId: number, date: string): Promise<{ disableCheckIn: boolean }> {
    try {
      const record = await this.attendanceRepository.getOne({
        conditions: [
          { column: 'employee_id', value: employeeId, operator: 'EQUAL', whereType: 'WHERE_AND' },
          { column: 'date', value: date, operator: 'EQUAL', whereType: 'WHERE_AND' },
        ],
      });

      return { disableCheckIn: !!record };
    } catch (error) {
      return { disableCheckIn: false };
    }
  }
}