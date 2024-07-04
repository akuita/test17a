import { NumberField, DateField } from 'src/decorators/field.decorator';

export class CheckInDto {
  @NumberField({ required: true })
  employee_id: number;

  @DateField({ required: true })
  current_date: Date;
}