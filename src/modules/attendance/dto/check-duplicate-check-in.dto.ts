import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CheckDuplicateCheckInDto {
  @IsNumber({}, { message: 'Employee ID must be a number' })
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: number;

  @IsDateString({}, { message: 'Date must be a valid date string' })
  @IsNotEmpty({ message: 'Date is required' })
  date: string;
}