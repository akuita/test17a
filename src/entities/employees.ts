import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AttendanceRecord } from './attendance_records';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: false })
  logged_in: boolean;

  @OneToMany(() => AttendanceRecord, attendanceRecord => attendanceRecord.employee)
  attendance_records: AttendanceRecord[];
}