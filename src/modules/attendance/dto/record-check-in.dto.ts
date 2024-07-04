import { IsNotEmpty, IsNumber, IsDateString, IsISO8601 } from 'class-validator';

export class RecordCheckInDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsNotEmpty()
  @IsISO8601()
  checkInTime: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}