import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employees';

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: false })
  check_in_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  check_out_time: Date;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column()
  employee_id: number;

  @ManyToOne(() => Employee, (employee) => employee.attendance_records)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}