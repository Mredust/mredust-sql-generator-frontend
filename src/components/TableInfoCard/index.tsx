import TableInfoList from '@/components/TableInfoList';
import { listTableInfoByPage } from '@/services/tableInfoService';
import { Card, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

// 默认分页大小
const DEFAULT_PAGE_SIZE = 10;

interface Props {
  title?: string;
  onLoad?: (
    searchParams: TableInfoType.TableInfoQueryRequest,
    setDataList: (dataList: TableInfoType.TableInfo[]) => void,
    setTotal: (total: number) => void,
  ) => void;
  onImport?: (values: TableInfoType.TableInfo) => void;
}

/**
 * 表信息卡片
 *
 * @constructor
 * @author https://github.com/Mredust
 */
const TableInfoCard: React.FC<Props> = (props) => {
  const { onLoad, onImport } = props;
  const [dataList, setDataList] = useState<TableInfoType.TableInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const initSearchParams: TableInfoType.TableInfoQueryRequest = {
    pageNum: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };
  const [searchParams, setSearchParams] =
    useState<TableInfoType.TableInfoQueryRequest>(initSearchParams);

  /**
   * 加载数据
   */
  const innerOnLoad = () => {
    listTableInfoByPage({
      ...searchParams,
    })
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e) => {
        message.error('加载失败，' + e.message);
      });
  };

  // 加载数据
  useEffect(() => {
    setLoading(true);
    if (onLoad) {
      onLoad(searchParams, setDataList, setTotal);
    } else {
      innerOnLoad();
    }
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="table-info-card">
      <Card
        title={
          <Input.Search
            style={{ width: 250 }}
            placeholder="请输入名称"
            enterButton="搜索"
            onSearch={(value) => {
              setSearchParams({
                ...initSearchParams,
                name: value,
              });
            }}
          />
        }
      >
        {
          <>
            <TableInfoList
              pagination={{
                total,
                onChange: (pageNum) => {
                  setSearchParams({ ...searchParams, pageNum });
                  window.scrollTo({
                    top: 0,
                  });
                },
                pageSize: DEFAULT_PAGE_SIZE,
              }}
              dataList={dataList}
              loading={loading}
              onImport={onImport}
            />
          </>
        }
      </Card>
    </div>
  );
};

export default TableInfoCard;
