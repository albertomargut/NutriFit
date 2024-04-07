import { MigrationInterface, QueryRunner, Table } from "typeorm";

// -----------------------------------------------------------------------------

export class CreateUsersRoles1712487958286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
           new Table({
              name: "users_roles",
              columns: [
                 {
                    name: "user_id",
                    type: "int",
                    isPrimary: true,
                 },
                 {
                    name: "role_id",
                    type: "int",
                    isPrimary: true,
                 },
              ],
              foreignKeys: [
                 {
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                 },
                 {
                    columnNames: ["role_id"],
                    referencedTableName: "roles",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                 },
              ],
           }),
           true
        );
     }
       public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable("users_roles");
       }
    }
    
