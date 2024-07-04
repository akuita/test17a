import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AttendanceService } from './attendance.service';
import { RecordCheckInDto } from './dto/record-check-in.dto';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/api/attendance_records/check-in')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async checkIn(@Body() recordCheckInDto: RecordCheckInDto) {
    try {
      const result = await this.attendanceService.recordEmployeeCheckIn(
        recordCheckInDto.employeeId,
        recordCheckInDto.checkInTime,
      );
      return {
        status: HttpStatus.OK,
        message: result.status,
      };
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'An unexpected error has occurred on the server.';

      if (error.message === 'Check-in time is outside the allowed window.') {
        status = HttpStatus.BAD_REQUEST;
        message = error.message;
      } else if (error.message === 'Employee has already checked in today.') {
        status = HttpStatus.CONFLICT;
        message = error.message;
      } else if (error.message === 'Employee not found.' || error.message === 'Invalid employee ID format.' || error.message === 'Invalid check-in time format.') {
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = error.message;
      }

      return {
        status,
        message,
      };
    }
  }
}