/**
 * 表信息服务
 */
import { request } from '@umijs/max';

/**
 * 创建
 * @param params
 */
export async function addTableInfo(params: TableInfoType.TableInfoAddRequest) {
  return request<BaseResponse<number>>('/table-info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 删除
 * @param params
 */
export async function deleteTableInfo(params: DeleteRequest) {
  return request<BaseResponse<boolean>>(`/table-info/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 更新
 * @param params
 */
export async function updateTableInfo(
  params: TableInfoType.TableInfoUpdateRequest,
) {
  return request<BaseResponse<boolean>>(`/table-info/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 根据 id 查询
 * @param id
 */
export async function getTableInfoById(id: number) {
  return request<BaseResponse<TableInfoType.TableInfo>>(`/table-info`, {
    method: 'GET',
    params: { id },
  });
}

/**
 * 分页获取列表
 * @param params
 */
export async function listTableInfoByPage(
  params: TableInfoType.TableInfoQueryRequest,
) {
  return request<BaseResponse<PageInfo<TableInfoType.TableInfo>>>(
    '/table-info/list',
    {
      method: 'GET',
      params,
    },
  );
}


