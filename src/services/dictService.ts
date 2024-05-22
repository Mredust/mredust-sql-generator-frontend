/**
 * 词库接口管理
 */
import { request } from '@umijs/max';

/**
 * 创建
 * @param params
 */
export async function addDict(params: DictType.DictRequest) {
  return request<BaseResponse<number>>('/dict/add', {
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
export async function deleteDict(params: DeleteRequest) {
  return request<BaseResponse<boolean>>(`/dict/delete`, {
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
export async function updateDict(params: DictType.DictRequest) {
  return request<BaseResponse<boolean>>(`/dict/update`, {
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
export async function getDictById(id: number) {
  return request<BaseResponse<DictType.Dict>>(`/dict`, {
    method: 'GET',
    params: { id },
  });
}

/**
 * 分页获取列表
 * @param params
 */
export async function listDictByPage(params: DictType.DictQueryRequest) {
  return request<BaseResponse<PageInfo<DictType.Dict>>>('/dict/list', {
    method: 'GET',
    params,
  });
}
