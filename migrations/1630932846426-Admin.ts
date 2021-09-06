import {MigrationInterface, QueryRunner} from "typeorm";

export class Admin1630932846426 implements MigrationInterface {
    name = 'Admin1630932846426'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` ADD `admin` tinyint NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `active` tinyint NOT NULL DEFAULT 1", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `active`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `admin`", undefined);
    }

}
