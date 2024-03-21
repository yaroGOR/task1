import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1710977279455 implements MigrationInterface {
  name = 'Migrations1710977279455'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."news_translations_language_slug_enum" AS ENUM('en', 'fr', 'es', 'de')`,
    )
    await queryRunner.query(
      `CREATE TABLE "news_translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language_slug" "public"."news_translations_language_slug_enum" NOT NULL DEFAULT 'en', "title" character varying NOT NULL, "description" character varying NOT NULL, "news_id" uuid, CONSTRAINT "PK_aa28099d8337dedcf1fb7537bbc" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_published" boolean NOT NULL DEFAULT false, "published_date" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" uuid, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "news_translations" ADD CONSTRAINT "FK_f6463f823b5554ecccc3312370a" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_aac53a9364896452e463139e4a0" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_aac53a9364896452e463139e4a0"`)
    await queryRunner.query(`ALTER TABLE "news_translations" DROP CONSTRAINT "FK_f6463f823b5554ecccc3312370a"`)
    await queryRunner.query(`DROP TABLE "news"`)
    await queryRunner.query(`DROP TABLE "news_translations"`)
    await queryRunner.query(`DROP TYPE "public"."news_translations_language_slug_enum"`)
  }
}
