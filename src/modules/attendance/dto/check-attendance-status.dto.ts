import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckAttendanceStatusDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsNotEmpty()
  @IsString()
  date: string;
}