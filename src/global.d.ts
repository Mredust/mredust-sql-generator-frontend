/**
 * 分页信息
 */
interface PageInfo<T> {
  current: number;
  size: number;
  total: number;
  records: T[];
}

/**
 * 分页请求
 */
interface PageRequest {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 删除请求
 */
interface DeleteRequest {
  id: number;
}

/**
 * 返回封装
 */
interface BaseResponse<T> {
  code: number;
  message?: string;
  data: T;
}


