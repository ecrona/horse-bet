import {MigrationInterface, QueryRunner} from "typeorm";

export class TournamentId1581412013703 implements MigrationInterface {
    name = 'TournamentId1581412013703'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `bets` ADD `tournamentId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `bets` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `bets` ADD PRIMARY KEY (`homeTeam`, `awayTeam`, `userEmail`, `tournamentId`)", undefined);
        await queryRunner.query("ALTER TABLE `fixtures` ADD `tournamentId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `fixtures` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `fixtures` ADD PRIMARY KEY (`awayTeam`, `homeTeam`, `tournamentId`)", undefined);
        await queryRunner.query("UPDATE `fixtures` SET tournamentId = 1");
        await queryRunner.query("UPDATE `bets` SET tournamentId = 1");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `fixtures` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `fixtures` ADD PRIMARY KEY (`awayTeam`, `homeTeam`)", undefined);
        await queryRunner.query("ALTER TABLE `fixtures` DROP COLUMN `tournamentId`", undefined);
        await queryRunner.query("ALTER TABLE `bets` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `bets` ADD PRIMARY KEY (`homeTeam`, `awayTeam`, `userEmail`)", undefined);
        await queryRunner.query("ALTER TABLE `bets` DROP COLUMN `tournamentId`", undefined);
    }

}
