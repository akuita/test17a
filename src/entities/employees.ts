import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AttendanceRecord } from './attendance_records';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  role: string;

+ @Column({ type: 'boolean', default: false })
+ login_status: boolean;

  @OneToMany(() => AttendanceRecord, attendanceRecord => attendanceRecord.employee)
  attendance_records: AttendanceRecord[];
}