import { DataTypes } from 'sequelize';
import {
  BeforeCreate,
  Column,
  DataType,
  Default,
  Model,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
@Table
export class SearchSchema extends Model {
  // @Column({ primaryKey: true, autoIncrement: true })
  // id: number;

  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUID })
  id: string;

  @Column
  search_key: string;

  @Column(DataTypes.JSONB)
  property_json: any[];

  @BeforeCreate
  static addUUID(instance: SearchSchema) {
    instance.id = uuidv4();
  }
}
