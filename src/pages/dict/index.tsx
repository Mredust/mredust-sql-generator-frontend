import { deleteDict, listDictByPage } from '@/services/dictService';
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
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useRef, useState } from 'react';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

/**
 * 词库管理页面
 * @constructor
 */
const AdminDictPage: React.FC<unknown> = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<DictType.Dict>(
    {} as DictType.Dict,
  );
  const actionRef = useRef<ActionType>();
  const colorList = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];

  /**
   * 删除节点
   * @param dict
   */
  const doDelete = async (dict: DictType.Dict) => {
    const hide = message.loading('正在删除');
    if (!dict?.id) {
      return;
    }
    try {
      await deleteDict({
        id: dict.id,
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
  const columns: ProColumns<DictType.Dict>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '内容',
      width: 700,
      dataIndex: 'content',
      valueType: 'textarea',
      fieldProps: {
        placeholder: '多个单词间用【英文或中文逗号】分割',
      },
      render: (_, record) => {
        let contentArray = JSON.parse(record.content);
        return (
          <div
            style={{
              width: '600px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {contentArray.map((word: string, index: number) => (
              // 彩色标签
              // <Tag key={index} color={colorList[Math.floor(Math.random() * colorList.length)]}>
              //   {word.trim()}
              // </Tag>
              <Tag key={index} color="blue">
                {word.trim()}
              </Tag>
            ))}
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
              let temp = { ...record };
              temp.content = JSON.parse(record.content).join(',');
              setUpdateData(temp);
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
      <ProTable<DictType.Dict>
        headerTitle="词库管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        options={{
          reload: true,
          setting: true,
          density: true,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            新增
          </Button>,
        ]}
        request={async (params) => {
          const searchParams: DictType.DictQueryRequest = {
            ...params,
          };
          const { data, code } = await listDictByPage(searchParams);
          return {
            data: data?.records || [],
            success: code === 200,
            total: data.total,
          } as any;
        }}
        columns={columns}
      />
      <CreateModal
        modalVisible={createModalVisible}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => setCreateModalVisible(false)}
      />
      <UpdateModal
        modalVisible={updateModalVisible}
        oldData={updateData}
        onSubmit={() => {
          setUpdateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => setUpdateModalVisible(false)}
      />
    </PageContainer>
  );
};

export default AdminDictPage;
