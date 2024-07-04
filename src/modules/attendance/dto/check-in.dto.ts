import { IsDate } from 'class-validator';

export class CheckInDto {
  @IsDate()
  current_time: Date;

  @IsDate()
  allowed_time_window_start: Date;

  @IsDate()
  allowed_time_window_end: Date;
}