import CustomModal from '@/pages/dict/components/CustomModal';
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

/**
 * 词库管理页面
 * @constructor
 */
const AdminDictPage: React.FC<unknown> = () => {
  const [type, setType] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dictData, setDictData] = useState<DictType.Dict>({} as DictType.Dict);
  const actionRef = useRef<ActionType>();
  //@ts-ignore
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
              setType('update');
              setDictData(temp);
              setModalVisible(true);
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
            onClick={() => {
              setType('create');
              setModalVisible(true);
            }}
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
      <CustomModal
        type={type}
        oldData={dictData}
        modalVisible={modalVisible}
        onSubmit={() => {
          setModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => setModalVisible(false)}
      />
    </PageContainer>
  );
};

export default AdminDictPage;
