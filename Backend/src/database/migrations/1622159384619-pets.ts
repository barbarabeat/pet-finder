import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class pets1622159384619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'pets',
          columns: [
            {
              name: 'id',
              type: 'integer',
              unsigned: true,
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'breed',
              type: 'varchar',
            },
            {
              name: 'age',
              type: 'integer',
            },
            {
              name: 'weight',
              type: 'float',
            },
            {
              name: 'city',
              type: 'varchar',
            },
            {
              name: 'state',
              type: 'varchar',
            },
            {
              name: 'isAdopted',
              type: 'boolean',
              default: false,
            },
            {
              name: 'user_id',
              type: 'integer',
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'users',
              columnNames: ['user_id'],
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            },
          ],
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('pets');
    }

}
