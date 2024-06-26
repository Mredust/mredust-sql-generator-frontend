import { addDict, updateDict } from '@/services/dictService';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Input,
  InputRef,
  message,
  Modal,
  Space,
  Tag,
} from 'antd';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import '../index.less';

interface CustomModalProps {
  type: string;
  oldData?: DictType.Dict;
  modalVisible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const tagInputStyle: React.CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top',
};

const CustomModal: React.FC<PropsWithChildren<CustomModalProps>> = (props) => {
  const { type, oldData, modalVisible, onSubmit, onCancel } = props;
  const [name, setName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (oldData && oldData.name && oldData.content) {
      setName(oldData.name);
      setTags(oldData.content.split(','));
    }
  }, [oldData]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const handleReset = () => {
    setName('');
    setTags([]);
  };
  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRequest = async () => {
    let tagsStr = tags.join(',');
    // 校验
    if (!name || !tagsStr) {
      message.error('数据不能为空');
      return false;
    }
    const requestData = {
      name,
      content: tagsStr,
      ...(type === 'update' && { id: oldData?.id }),
    };
    const hide = message.loading('正在处理请求中...');
    try {
      await (type === 'update'
        ? updateDict(requestData)
        : addDict(requestData));
      hide();
      message.success('处理成功');
      onSubmit();
      return true;
    } catch (error) {
      hide();
      message.error('处理失败请重试！');
      return false;
    }
  };
  return (
    <Modal
      width={800}
      destroyOnClose
      title={type === 'create' ? '新增词库' : '更新词库'}
      open={modalVisible}
      onCancel={() => {
        handleReset();
        onCancel();
      }}
      footer={[
        <Button key="back" onClick={handleReset}>
          重置
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={async () => {
            const success = await handleRequest();
            if (!success) {
              onCancel();
            }
            handleReset();
          }}
        >
          提交
        </Button>,
      ]}
    >
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Space direction="vertical" style={{ display: 'flex' }}>
          <div>名称</div>
          <Input
            placeholder="请输入词库名称"
            allowClear
            value={name}
            onChange={handleInputName}
          />
        </Space>
        <Space direction="vertical" style={{ display: 'flex' }}>
          <div>内容</div>
          <Card>
            <Space wrap>
              {tags.map<React.ReactNode>((tag, index) => {
                if (editInputIndex === index) {
                  return (
                    <Input
                      ref={editInputRef}
                      key={tag}
                      size="small"
                      style={tagInputStyle}
                      value={editInputValue}
                      onChange={handleEditInputChange}
                      onBlur={handleEditInputConfirm}
                      onPressEnter={handleEditInputConfirm}
                    />
                  );
                }
                return (
                  <Tag
                    key={tag}
                    closable={true}
                    style={{ userSelect: 'none' }}
                    onClose={() => handleClose(tag)}
                    color="blue"
                  >
                    <span
                      onDoubleClick={(e) => {
                        if (index !== 0) {
                          setEditInputIndex(index);
                          setEditInputValue(tag);
                          e.preventDefault();
                        }
                      }}
                    >
                      {tag}
                    </span>
                  </Tag>
                );
              })}
              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={tagInputStyle}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag
                  style={{
                    height: 22,
                    borderStyle: 'dashed',
                  }}
                  icon={<PlusOutlined />}
                  onClick={showInput}
                  color={'blue'}
                >
                  添加标签
                </Tag>
              )}
            </Space>
          </Card>
        </Space>
      </Space>
    </Modal>
  );
};

export default CustomModal;
