import { MigrationInterface, QueryRunner } from 'typeorm'

export class Fix1711055703804 implements MigrationInterface {
  name = 'Fix1711055703804'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" ADD "deleted_at" TIMESTAMP`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "deleted_at"`)
  }
}
