import { IsNumber, IsDateString } from 'class-validator';

export class ActivateCheckoutButtonDto {
  @IsNumber()
  employeeId: number;

  @IsDateString()
  date: string;
}