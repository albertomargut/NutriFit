import { MigrationInterface, QueryRunner, Table } from "typeorm";

// -----------------------------------------------------------------------------

export class CreateNutritionists1712487992581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createTable(
            new Table({
              name: "nutritionists",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "user_id",
                  type: "int",
                  isUnique: true,
                },
                {
                  name: "speciality",
                  type: "enum",
                  enum: ["Sports Nutritionist", "Clinical Nutritionist", "Dietitian"],
                  isNullable: true
                },
                {
                  name: "work_experience",
                  type: "int",
                  isNullable: true,
               },
              ],
              foreignKeys: [
                {
                  columnNames: ["user_id"],
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
                
              ],
            }),
            true
          );
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
      
          await queryRunner.dropTable("nutritionists");
        }
      }
      
