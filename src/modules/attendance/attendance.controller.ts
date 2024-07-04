import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { RecordCheckInDto } from './dto/record-check-in.dto';
import { AttendanceService } from './attendance.service';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/attendance/check-in')
  @Auth()
  async recordCheckIn(@Body() recordCheckInDto: RecordCheckInDto) {
    const result = await this.attendanceService.recordEmployeeCheckIn(
      recordCheckInDto.employeeId,
      recordCheckInDto.checkInTime,
      recordCheckInDto.date,
    );

    if (result.success) {
      return {
        status: 200,
        message: result.message,
        check_in_details: result.checkInDetails,
      };
    } else {
      // Depending on the error message, the status code can be set accordingly
      let statusCode = 400;
      if (result.error === 'Invalid employee ID') {
        statusCode = 422;
      } else if (result.error === 'Employee has already checked in today') {
        statusCode = 422;
      } else if (result.error === 'An error occurred while recording check-in') {
        statusCode = 500;
      }

      return {
        status: statusCode,
        message: result.error,
      };
    }
  }
}