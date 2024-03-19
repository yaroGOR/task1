import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1710890141074 implements MigrationInterface {
    name = 'CreateInitialTables1710890141074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_item_translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language_slug" "public"."news_item_translations_language_slug_enum" NOT NULL DEFAULT 'en', "title" character varying NOT NULL, "description" character varying NOT NULL, "news_item_id" uuid, CONSTRAINT "PK_b7c147dbfd092ef716bb6e66bdd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_published" boolean NOT NULL DEFAULT false, "published_date" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" uuid, CONSTRAINT "PK_4b3130d2448c08413a7687d946c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language_slug" "public"."category_translations_language_slug_enum" NOT NULL DEFAULT 'en', "title" character varying NOT NULL, "category_id" uuid, CONSTRAINT "PK_9dff018a4a26a924c60d3e86432" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news_item_translations" ADD CONSTRAINT "FK_51400d298c7f9d920d4aae9b23f" FOREIGN KEY ("news_item_id") REFERENCES "news_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_items" ADD CONSTRAINT "FK_bbcb3b8d0e11b57eb9f594c3641" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_translations" ADD CONSTRAINT "FK_87902f79e775e1c1b0082201d7e" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_translations" DROP CONSTRAINT "FK_87902f79e775e1c1b0082201d7e"`);
        await queryRunner.query(`ALTER TABLE "news_items" DROP CONSTRAINT "FK_bbcb3b8d0e11b57eb9f594c3641"`);
        await queryRunner.query(`ALTER TABLE "news_item_translations" DROP CONSTRAINT "FK_51400d298c7f9d920d4aae9b23f"`);
        await queryRunner.query(`DROP TABLE "category_translations"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "news_items"`);
        await queryRunner.query(`DROP TABLE "news_item_translations"`);
    }

}
