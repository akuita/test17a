import { IsNotEmpty, IsNumber } from 'class-validator';

export class RecordEmployeeCheckInDto {
  @IsNumber({}, { message: 'Invalid employee ID format.' })
  @IsNotEmpty({ message: 'Employee ID must not be empty.' })
  employeeId: number;
}