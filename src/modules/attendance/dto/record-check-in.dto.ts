import { IsNumber, IsDate, ValidateIf, isInt, isDate } from 'class-validator';

export class RecordCheckInDto {
  @IsNumber({}, { message: 'Invalid employee ID format.' })
  @ValidateIf((o) => isInt(o.employeeId))
  employeeId: number;

  @IsDate({ message: 'Invalid check-in time format.' })
  @ValidateIf((o) => isDate(o.checkInTime))
  checkInTime: Date;
}