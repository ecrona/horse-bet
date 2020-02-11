import {MigrationInterface, QueryRunner} from "typeorm";

export class Foundation1581411755195 implements MigrationInterface {
    name = 'Foundation1581411755195'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `bets` (`homeTeam` varchar(255) NOT NULL, `awayTeam` varchar(255) NOT NULL, `userEmail` varchar(255) NOT NULL, `placement` int NOT NULL, PRIMARY KEY (`homeTeam`, `awayTeam`, `userEmail`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `fixtures` (`awayTeam` varchar(255) NOT NULL, `homeTeam` varchar(255) NOT NULL, `round` int NOT NULL, `firstMatchStart` timestamp NULL, `secondMatchStart` timestamp NULL, `matchWinner` int NOT NULL, `score` varchar(255) NOT NULL, `lastSync` timestamp NULL, PRIMARY KEY (`awayTeam`, `homeTeam`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `users` (`displayName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, PRIMARY KEY (`email`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `users`", undefined);
        await queryRunner.query("DROP TABLE `fixtures`", undefined);
        await queryRunner.query("DROP TABLE `bets`", undefined);
    }

}
