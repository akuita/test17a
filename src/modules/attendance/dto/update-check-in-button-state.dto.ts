import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCheckInButtonStateDto {
  @IsNumber()
  @IsNotEmpty()
  employee_id: number;
}