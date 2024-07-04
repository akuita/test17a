import { Controller, Get, UseGuards, Param, ParseIntPipe, NotFoundException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AttendanceService } from './attendance.service';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('/api/employees/:employee_id/check-in-info')
  @UseGuards(AuthGuard)
  async getEmployeeCheckInInfo(@Param('employee_id', ParseIntPipe) employeeId: number): Promise<{ status: number; employee: { name: string; role: string; } }> {
    const employee = await this.attendanceService.getEmployeeById(employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found.');
    }
    return {
      status: HttpStatus.OK,
      employee: {
        name: employee.name,
        role: employee.role
      }
    };
  }
}