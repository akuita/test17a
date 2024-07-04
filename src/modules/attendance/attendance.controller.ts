import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Auth } from '../../decorators/auth.decorator';
import { getCurrentServerDateTime } from '../../shared/utils/date-time.util';

@Controller('attendance')
export class AttendanceController {
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