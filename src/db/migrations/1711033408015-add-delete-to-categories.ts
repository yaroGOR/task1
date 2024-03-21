import { MigrationInterface, QueryRunner } from 'typeorm'

export class Fix1711033408015 implements MigrationInterface {
  name = 'Fix1711033408015'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "deleted_at" TIMESTAMP`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "deleted_at"`)
  }
}
