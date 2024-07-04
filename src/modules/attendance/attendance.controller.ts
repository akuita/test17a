import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { Auth } from '../../decorators/auth.decorator';
import { AttendanceService } from './attendance.service';
import { RecordEmployeeCheckInDto } from './dto/record-employee-check-in.dto';
import { getCurrentServerDateTime } from '../../shared/utils/date-time.util';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in')
  @UseGuards(AuthGuard)
  @Auth()
  @HttpCode(HttpStatus.OK)
  async recordCheckIn(@Body() recordEmployeeCheckInDto: RecordEmployeeCheckInDto) {
    try {
      const { employeeId } = recordEmployeeCheckInDto;
      const checkInResult = await this.attendanceService.recordCheckIn(employeeId);

      if (checkInResult.error) {
        return {
          status: checkInResult.status,
          message: checkInResult.message,
        };
      }

      return {
        status: HttpStatus.OK,
        message: "Check-in recorded successfully.",
        check_in_details: checkInResult.checkInDetails,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error has occurred on the server.',
      };
    }
  }

  @Get('current-time')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async getCurrentTime() {
    try {
      const currentServerDateTime = getCurrentServerDateTime();
      return {
        status: HttpStatus.OK,
        current_time: currentServerDateTime,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error has occurred on the server.',
      };
    }
  }
}