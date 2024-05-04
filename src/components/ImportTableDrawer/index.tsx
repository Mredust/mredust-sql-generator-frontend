import TableInfoCard from '@/components/TableInfoCard';
import { Drawer } from 'antd';
import React from 'react';

interface Props {
  onImport: (values: TableInfoType.TableInfo) => void;
  visible: boolean;
  onClose: () => void;
}

/**
 * 导入表抽屉
 *
 * @constructor
 * @author https://github.com/Mredust
 */
const ImportTableDrawer: React.FC<Props> = (props) => {
  const { visible, onImport, onClose } = props;

  /**
   * 加载我的数据
   * @param searchParams
   * @param setDataList
   * @param setTotal
   */
  const loadMyData = undefined;

  return (
    <Drawer
      title="导入表"
      contentWrapperStyle={{ width: '60%', minWidth: 320 }}
      open={visible}
      onClose={onClose}
    >
      <TableInfoCard onLoad={loadMyData} onImport={onImport} />
    </Drawer>
  );
};

export default ImportTableDrawer;
