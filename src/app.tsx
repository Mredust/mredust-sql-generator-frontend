// 全局运行时配置
import GlobalFooter from '@/components/GlobalFooter';
import { RunTimeLayoutConfig } from '@@/plugin-layout/types';
import type { RequestConfig } from 'umi';
import './global.less';

/**
 * 全局布局配置
 */
export const layout: RunTimeLayoutConfig = () => {
  return {
    title: 'SQL生成器',
    menu: {
      locale: false,
    },
    fixedHeader: false,
    layout: 'top',
    contentStyle: {
      paddingBottom: 120,
    },
    footerRender: () => <GlobalFooter />,
  };
};

/**
 * 全局请求配置
 * https://umijs.org/docs/max/request
 */
export const request: RequestConfig = {
  baseURL: 'http://192.168.91.131:4090/api',
  timeout: 10000,
  withCredentials: true,
  requestInterceptors: [],
  responseInterceptors: [
    (response) => {
      const data: any = response.data;
      const path = response.request.responseURL;
      if (!data) {
        throw new Error('服务异常');
      }
      // 下载接口没有 code
      if (path.includes('download/excel-data')) {
        return response;
      }
      const code = data.code ?? 500;
      if (code !== 200) {
        console.error(`request error, path = ${path}`, data);
        throw new Error(data.message ?? '服务器错误');
      }
      // do something
      return response;
    },
  ],
};
