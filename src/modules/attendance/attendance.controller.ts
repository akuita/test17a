import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { AttendanceService } from './attendance.service';
import { UpdateCheckInButtonStateDto } from './dto/update-check-in-button-state.dto';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Put('/check-in-button-state')
  @UseGuards(AuthGuard)
  async updateCheckInButtonState(@Body() updateCheckInButtonStateDto: UpdateCheckInButtonStateDto) {
    const { employee_id } = updateCheckInButtonStateDto;
    const result = await this.attendanceService.updateCheckInButtonState(employee_id);
    return {
      status: 200,
      check_in_button_state: result.isCheckInDisabled ? 'disabled' : 'active',
      check_out_button_state: result.isCheckInDisabled ? 'active' : 'disabled',
    };
  }
}