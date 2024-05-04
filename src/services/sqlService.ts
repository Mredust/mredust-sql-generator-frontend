// @ts-ignore
import { request } from '@umijs/max';

/**
 * 根据 schema 生成 SQL
 * @param params
 */
export async function generateBySchema(params: TableSchema) {
  return request<BaseResponse<GenerateVO>>('/sql/build', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 根据 SQL 获取 schema
 * @param params
 */
export async function getSchemaBySql(params: GenerateBySqlRequest) {
  return request<BaseResponse<TableSchema>>('/sql/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 根据 Excel 获取 schema
 * @param file
 */
export async function getSchemaByExcel(file: any) {
  const params = new FormData();
  params.append('file', file);
  return request<BaseResponse<TableSchema>>('/sql/excel', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: params,
  });
}

/**
 * 下载模拟数据 Excel
 * @param params
 */
export async function downloadExcelData(params: GenerateVO) {
  return request<BlobPart>('/sql/download/excel-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
    data: params,
  });
}

/**
 * 生成创建表 SQL
 * @param id
 */
export async function generateCreateTableSql(id: number) {
  return request<BaseResponse<string>>(`/table-info/generate/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: id,
  });
}
