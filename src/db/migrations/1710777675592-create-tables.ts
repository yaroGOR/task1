import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTables1710777675592 implements MigrationInterface {
  name = 'CreateTables1710777675592'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "news_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_published" boolean NOT NULL DEFAULT false, "published_date" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4b3130d2448c08413a7687d946c" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "news_item_translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language_slug" "public"."news_item_translations_language_slug_enum" NOT NULL DEFAULT 'en', "title" character varying NOT NULL, "description" character varying NOT NULL, "news_item_id" uuid, CONSTRAINT "PK_b7c147dbfd092ef716bb6e66bdd" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "news_item_translations" ADD CONSTRAINT "FK_51400d298c7f9d920d4aae9b23f" FOREIGN KEY ("news_item_id") REFERENCES "news_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news_item_translations" DROP CONSTRAINT "FK_51400d298c7f9d920d4aae9b23f"`)
    await queryRunner.query(`DROP TABLE "news_item_translations"`)
    await queryRunner.query(`DROP TABLE "news_items"`)
  }
}
