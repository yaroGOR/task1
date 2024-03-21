import { MigrationInterface, QueryRunner } from 'typeorm'

export class Fix1711032164285 implements MigrationInterface {
  name = 'Fix1711032164285'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "is_published" boolean NOT NULL DEFAULT false`)
    await queryRunner.query(`ALTER TABLE "categories" ADD "published_date" date`)
    await queryRunner.query(`ALTER TABLE "categories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "published_date"`)
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "is_published"`)
  }
}
