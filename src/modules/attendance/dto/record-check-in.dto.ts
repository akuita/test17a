import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class RecordCheckInDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsNotEmpty()
  @IsString()
  checkInTime: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}