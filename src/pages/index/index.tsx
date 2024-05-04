import FormInput from '@/components/FormInput';
import GenerateResultCard from '@/components/GenerateResultCard';
import ImportTableDrawer from '@/components/ImportTableDrawer';
import JsonInputModal from '@/components/JsonInputModal';
import SqlInputModal from '@/components/SqlInputModal';
import { generateBySchema } from '@/services/sqlService';
import { PageContainer } from '@ant-design/pro-components';
import {
  BackTop,
  Button,
  Card,
  Col,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
} from 'antd';
import React, { useRef, useState } from 'react';
import { useSearchParams } from 'umi';
import './index.less';

const IndexPage: React.FC = () => {
  const [result, setResult] = useState<GenerateVO>();
  const [jsonInputModalVisible, setJsonInputModalVisible] = useState(false);
  const [sqlInputModalVisible, setSqlInputModalVisible] = useState(false);
  const [importTableDrawerVisible, setImportTableDrawerVisible] =
    useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const formInputRef: any = useRef();
  const [layout, setLayout] = useState('input');

  const [searchParams] = useSearchParams();

  /**
   * 根据 Schema 生成
   * @param values
   */
  const doGenerateBySchema = async (values: TableSchema) => {
    setGenLoading(true);
    try {
      const res = await generateBySchema(values);
      setResult(res.data);
      message.success('已生成');
    } catch (e: any) {
      message.error('生成错误，' + e.message);
    }
    setGenLoading(false);
  };

  /**
   * 导入 tableSchema
   * @param tableSchema
   */
  const importTableSchema = (tableSchema: TableSchema) => {
    formInputRef.current.setFormValues(tableSchema);
    setJsonInputModalVisible(false);
    setSqlInputModalVisible(false);
    message.success('导入成功');
  };

  /**
   * 更改布局
   * @param e
   */
  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  /**
   * 输入配置视图
   */
  const inputConfigView = (
    <Card
      title="输入配置"
      extra={
        <Select defaultValue="MySQL" style={{ width: 120 }} disabled>
          <Select.Option value="MySQL">MySQL</Select.Option>
        </Select>
      }
    >
      <Space size="large" wrap>
        <Button onClick={() => setImportTableDrawerVisible(true)}>
          导入表
        </Button>
        <Button onClick={() => setJsonInputModalVisible(true)}>导入配置</Button>
        <Button onClick={() => setSqlInputModalVisible(true)}>导入SQL</Button>
      </Space>
      <div style={{ marginTop: 16 }} />
      <FormInput ref={formInputRef} onSubmit={doGenerateBySchema} />
    </Card>
  );

  return (
    <div id="indexPage">
      <PageContainer
        extra={
          <div style={{ marginLeft: 0 }}>
            切换布局：
            <Radio.Group onChange={onLayoutChange} value={layout}>
              <Radio.Button value="input">上下布局</Radio.Button>
              <Radio.Button value="half">左右布局</Radio.Button>
            </Radio.Group>
          </div>
        }
      >
        <Row gutter={[12, 12]}>
          <Col
            xs={24}
            xl={layout === 'half' ? 12 : 24}
            order={layout === 'output' ? 2 : 1}
          >
            {inputConfigView}
          </Col>
          <Col
            xs={24}
            xl={layout === 'half' ? 12 : 24}
            order={layout === 'output' ? 1 : 2}
          >
            <GenerateResultCard result={result} loading={genLoading} />
          </Col>
        </Row>
        <BackTop />
      </PageContainer>
      <JsonInputModal
        onSubmit={importTableSchema}
        visible={jsonInputModalVisible}
        onClose={() => setJsonInputModalVisible(false)}
      />
      <SqlInputModal
        onSubmit={importTableSchema}
        visible={sqlInputModalVisible}
        onClose={() => setSqlInputModalVisible(false)}
      />
      <ImportTableDrawer
        onImport={(tableInfo) => {
          formInputRef.current.setFormValues(JSON.parse(tableInfo.content));
          setImportTableDrawerVisible(false);
          message.success('导入成功');
        }}
        visible={importTableDrawerVisible}
        onClose={() => setImportTableDrawerVisible(false)}
      />
    </div>
  );
};

export default IndexPage;
