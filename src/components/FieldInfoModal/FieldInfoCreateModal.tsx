import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal, Typography } from 'antd';
import React, { PropsWithChildren } from 'react';

interface Props {
  modalVisible: boolean;
  initialValues?: FieldInfoType.FieldInfo;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 创建数据模态框
 * @param props
 * @constructor
 */
const FieldInfoCreateModal: React.FC<PropsWithChildren<Props>> = (props) => {
  const { modalVisible, initialValues, onCancel } = props;

  /**
   * 表格列配置
   */
  const columns: ProColumns<FieldInfoType.FieldInfo>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true }],
      },
      fieldProps: {
        autoFocus: true,
        placeholder: '请输入中文名称',
      },
    },
    {
      title: '内容（不建议在此处修改）',
      dataIndex: 'content',
      valueType: 'textarea',
    },
  ];

  return (
    <Modal
      destroyOnClose
      title="保存字段信息（后续可直接导入）"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Typography.Text type="secondary">
        注意，你提交的内容可能会被公开！
      </Typography.Text>
      <div style={{ marginBottom: 16 }} />
      <ProTable<FieldInfoType.FieldInfo, FieldInfoType.FieldInfo>
        form={{
          initialValues,
          submitter: {
            render: (props, dom) => [...dom.reverse()],
          },
        }}
        rowKey="id"
        type="form"
        columns={columns}
      />
    </Modal>
  );
};

export default FieldInfoCreateModal;
