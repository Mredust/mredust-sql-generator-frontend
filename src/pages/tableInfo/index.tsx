import {
  deleteTableInfo,
  listTableInfoByPage,
} from '@/services/tableInfoService';
import { Link } from '@@/exports';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  Divider,
  message,
  Popconfirm,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useRef, useState } from 'react';
import UpdateModal from './components/UpdateModal';

/**
 * 表信息管理页面
 * @constructor
 */
const AdminTableInfoPage: React.FC<unknown> = () => {
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<TableInfoType.TableInfo>(
    {} as TableInfoType.TableInfo,
  );
  const actionRef = useRef<ActionType>();
  /**
   * 删除节点
   * @param tableInfo
   */
  const doDelete = async (tableInfo: TableInfoType.TableInfo) => {
    const hide = message.loading('正在删除');
    if (!tableInfo?.id) {
      return;
    }
    try {
      await deleteTableInfo({
        id: tableInfo.id,
      });
      message.success('操作成功');
      actionRef.current?.reload();
    } catch (e: any) {
      message.error('操作失败，' + e.message);
    } finally {
      hide();
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<TableInfoType.TableInfo>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '名称',
      dataIndex: 'name',
      render: (_, record) => (
        <div
          style={{
            width: 120,
          }}
        >
          {record.name}
        </div>
      ),
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'textarea',
      render: (_, record) => {
        let contentObj = JSON.parse(record.content);
        let fieldList = contentObj.fieldList;
        return (
          <div
            style={{
              width: 600,
            }}
          >
            <Space direction={'vertical'} size={'middle'}>
              <Row>
                <Space size={'middle'}>
                  <div>数据库：{(contentObj.databaseName ??= '未命名')}</div>
                  <div>
                    表：{(contentObj.tableComment ??= contentObj.tableName)}
                  </div>
                  <div>模拟数据条数：{(contentObj.mockNum ??= '不模拟')}</div>
                </Space>
              </Row>
              <Row>
                <Space size={'middle'}>
                  <Space size={'small'} wrap={true}>
                    {fieldList.map((field: any) => (
                      <Tag color="blue">{field.fieldName.trim()}</Tag>
                    ))}
                  </Space>
                </Space>
              </Row>
            </Space>
          </div>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link
            onClick={() => {
              setUpdateData(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="您确定要删除么？"
            onConfirm={() => doDelete(record)}
            okText="确认"
            cancelText="取消"
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableInfoType.TableInfo>
        headerTitle="表信息管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Link to="/">
            <Button key="1" type="primary">
              新增
            </Button>
          </Link>,
        ]}
        request={async (params) => {
          const searchParams: TableInfoType.TableInfoQueryRequest = {
            ...params,
          };
          const { data, code } = await listTableInfoByPage(searchParams);
          return {
            data: data?.records || [],
            success: code === 200,
            total: data.total,
          } as any;
        }}
        columns={columns}
      />
      <UpdateModal
        modalVisible={updateModalVisible}
        oldData={updateData}
        columns={columns}
        onSubmit={() => {
          setUpdateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => setUpdateModalVisible(false)}
      />
    </PageContainer>
  );
};

export default AdminTableInfoPage;
