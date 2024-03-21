import { MigrationInterface, QueryRunner } from 'typeorm'

export class Fix1710977755706 implements MigrationInterface {
  name = 'Fix1710977755706'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "date_created" TO "created_at"`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "created_at" TO "date_created"`)
  }
}
