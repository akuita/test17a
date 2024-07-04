import { BadRequestException } from '@nestjs/common';
import { AttendanceRecord } from 'src/entities/attendance_records';

export class AttendanceService {
  // ... other methods ...

  async checkInTimeWindow(
    current_time: Date,
    allowed_time_window_start: Date,
    allowed_time_window_end: Date
  ): Promise<boolean> {
    if (current_time < allowed_time_window_start || current_time > allowed_time_window_end) {
      throw new BadRequestException('Check-in attempt is outside the allowed time window.');
    }
    return true;
  }

  // ... other methods ...
}