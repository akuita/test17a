import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAttendanceRecordsTable1720123099507 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'attendance_records',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'check_in_time',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'check_out_time',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'date',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'employee_id',
                    type: 'int',
                    isNullable: false,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['employee_id'],
                    referencedTableName: 'employees',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('attendance_records');
    }
}