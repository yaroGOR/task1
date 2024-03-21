import { MigrationInterface, QueryRunner } from 'typeorm'

export class Fix1711043519636 implements MigrationInterface {
  name = 'Fix1711043519636'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "slug" character varying NOT NULL DEFAULT 'categorySlug'`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "slug"`)
  }
}
