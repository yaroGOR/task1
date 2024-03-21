import { MigrationInterface, QueryRunner } from 'typeorm'

export class Fix1710981220388 implements MigrationInterface {
  name = 'Fix1710981220388'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."category_translations_language_slug_enum" RENAME TO "category_translations_language_slug_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."category_translations_language_slug_enum" AS ENUM('en', 'fr', 'es', 'de', 'uk')`,
    )
    await queryRunner.query(`ALTER TABLE "category_translations" ALTER COLUMN "language_slug" DROP DEFAULT`)
    await queryRunner.query(
      `ALTER TABLE "category_translations" ALTER COLUMN "language_slug" TYPE "public"."category_translations_language_slug_enum" USING "language_slug"::"text"::"public"."category_translations_language_slug_enum"`,
    )
    await queryRunner.query(`ALTER TABLE "category_translations" ALTER COLUMN "language_slug" SET DEFAULT 'en'`)
    await queryRunner.query(`DROP TYPE "public"."category_translations_language_slug_enum_old"`)
    await queryRunner.query(
      `ALTER TYPE "public"."news_translations_language_slug_enum" RENAME TO "news_translations_language_slug_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."news_translations_language_slug_enum" AS ENUM('en', 'fr', 'es', 'de', 'uk')`,
    )
    await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "language_slug" DROP DEFAULT`)
    await queryRunner.query(
      `ALTER TABLE "news_translations" ALTER COLUMN "language_slug" TYPE "public"."news_translations_language_slug_enum" USING "language_slug"::"text"::"public"."news_translations_language_slug_enum"`,
    )
    await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "language_slug" SET DEFAULT 'en'`)
    await queryRunner.query(`DROP TYPE "public"."news_translations_language_slug_enum_old"`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."news_translations_language_slug_enum_old" AS ENUM('en', 'fr', 'es', 'de')`,
    )
    await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "language_slug" DROP DEFAULT`)
    await queryRunner.query(
      `ALTER TABLE "news_translations" ALTER COLUMN "language_slug" TYPE "public"."news_translations_language_slug_enum_old" USING "language_slug"::"text"::"public"."news_translations_language_slug_enum_old"`,
    )
    await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "language_slug" SET DEFAULT 'en'`)
    await queryRunner.query(`DROP TYPE "public"."news_translations_language_slug_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."news_translations_language_slug_enum_old" RENAME TO "news_translations_language_slug_enum"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."category_translations_language_slug_enum_old" AS ENUM('en', 'fr', 'es', 'de')`,
    )
    await queryRunner.query(`ALTER TABLE "category_translations" ALTER COLUMN "language_slug" DROP DEFAULT`)
    await queryRunner.query(
      `ALTER TABLE "category_translations" ALTER COLUMN "language_slug" TYPE "public"."category_translations_language_slug_enum_old" USING "language_slug"::"text"::"public"."category_translations_language_slug_enum_old"`,
    )
    await queryRunner.query(`ALTER TABLE "category_translations" ALTER COLUMN "language_slug" SET DEFAULT 'en'`)
    await queryRunner.query(`DROP TYPE "public"."category_translations_language_slug_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."category_translations_language_slug_enum_old" RENAME TO "category_translations_language_slug_enum"`,
    )
  }
}
