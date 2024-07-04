import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLoginStatusToEmployees1720114614970 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('employees', new TableColumn({
            name: 'login_status',
            type: 'boolean',
            isNullable: false,
            default: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('employees', 'login_status');
    }
}