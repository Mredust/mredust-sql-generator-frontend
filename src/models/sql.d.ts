/**
 * 表 Schema 类型
 */
interface TableSchema {
  databaseName?: string;
  tableName: string;
  tableComment?: string;
  mockNum: number;
  fieldList: Field[];
}

/**
 * 列类型
 */
interface Field {
  fieldName: string;
  fieldType: string;
  fieldLength?: number;
  defaultValue?: string;
  notNull?: boolean;
  comment?: string;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  mockType: string;
  mockParams?: string;
  onUpdate?: string;
}

/**
 * 生成返回封装类型
 */
interface GenerateVO {
  tableSchema: TableSchema;
  createSql: string;
  insertSql: string;
  dataJson: string;
  dataList: Record<string, any>[];
}

/**
 * 根据 SQL 生成请求
 */
interface GenerateBySqlRequest {
  sql: string;
}
