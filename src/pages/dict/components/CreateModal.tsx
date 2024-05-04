import { addDict } from '@/services/dictService';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface CreateModalProps {
  modalVisible: boolean;
  columns: ProColumns<DictType.Dict>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: DictType.Dict) => {
  // 校验
  if (!fields.name || !fields.content) {
    message.error('数据不能为空');
    return false;
  }
  const hide = message.loading('正在添加');
  try {
    await addDict({
      ...fields,
    } as DictType.DictAddRequest);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 创建数据模态框
 * @param props
 * @constructor
 */
const CreateModal: React.FC<PropsWithChildren<CreateModalProps>> = (props) => {
  const { modalVisible, columns, onSubmit, onCancel } = props;

  return (
    <Modal
      width={800}
      destroyOnClose
      title="新增词库"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProTable<DictType.Dict, DictType.Dict>
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            onSubmit?.();
          }
        }}
        rowKey="id"
        type="form"
        columns={columns}
      />
    </Modal>
  );
};

export default CreateModal;
