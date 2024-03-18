import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1710774666072 implements MigrationInterface {
    name = 'CreateInitialTables1710774666072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_item_translation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language_slug" "public"."news_item_translation_language_slug_enum" NOT NULL DEFAULT 'en', "title" character varying NOT NULL, "description" character varying NOT NULL, "news_item_id" uuid, CONSTRAINT "PK_c1a9af700999689495419e63ffe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_published" boolean NOT NULL DEFAULT false, "published_date" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e2f3e03d39030228522f707758" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news_item_translation" ADD CONSTRAINT "FK_c1aa5f8f2b2f0f334fab7239357" FOREIGN KEY ("news_item_id") REFERENCES "news_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_item_translation" DROP CONSTRAINT "FK_c1aa5f8f2b2f0f334fab7239357"`);
        await queryRunner.query(`DROP TABLE "news_item"`);
        await queryRunner.query(`DROP TABLE "news_item_translation"`);
    }

}
