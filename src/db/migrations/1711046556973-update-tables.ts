import { MigrationInterface, QueryRunner } from 'typeorm'

export class Fix1711046556973 implements MigrationInterface {
  name = 'Fix1711046556973'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" ADD "thumbnail_url" character varying`)
    await queryRunner.query(`ALTER TABLE "news" ADD "slug" character varying`)
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "slug" DROP NOT NULL`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "slug" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "slug"`)
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "thumbnail_url"`)
  }
}
