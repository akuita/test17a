import { Injectable } from '@nestjs/common';
import { getCurrentServerDateTime } from 'src/shared/utils/date-time.util.ts';

@Injectable()
export class AttendanceService {
  // Other methods...

  getCurrentDateTime(): string {
    return getCurrentServerDateTime();
  }
}