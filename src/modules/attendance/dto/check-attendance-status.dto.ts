import { IsInt, IsNotEmpty } from 'class-validator';

export class CheckAttendanceStatusDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;
}