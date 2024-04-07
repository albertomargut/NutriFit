import { MigrationInterface, QueryRunner, Table } from "typeorm";

// -----------------------------------------------------------------------------

export class CreateAppointments1712488006356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    

        await queryRunner.createTable(
            new Table({
              name: "appointments",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "client_id",
                  type: "int",
                  isNullable: true,
                  
                },
                {
                  name: "nutritionist_id",
                  type: "int",
                  isNullable:true
                },
                {
                  name: "date",
                  type: "date",
                  
                },
                {
                  name: "time",
                  type: "time",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
                  onUpdate: "CURRENT_TIMESTAMP",
                },
    
              ],
              foreignKeys: [
                {
                  columnNames: ["client_id"],
                  referencedTableName: "clients",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
                {
                  columnNames: ["nutritionist_id"],
                  referencedTableName: "nutritionists",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE"
                },
                
                
             ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropTable("appointments");
    }

}

