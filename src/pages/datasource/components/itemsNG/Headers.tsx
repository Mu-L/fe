import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface Props {
  cate: string;
}

export default function Headers(props: Props) {
  const { t } = useTranslation('datasourceManage');
  const { cate } = props;

  return (
    <div>
      <Form.List name={['settings', `${cate}.headers`]}>
        {(fields, { add, remove }) => (
          <>
            <div className='page-title' style={{ marginTop: '8px' }}>
              {t('form.headers')} <PlusCircleOutlined style={{ marginLeft: '16px', cursor: 'pointer', fontSize: '14px' }} onClick={() => add()} />
            </div>
            {fields.map(({ key, name }) => (
              <Row gutter={16} align='middle' key={key}>
                <Col flex={1}>
                  <Form.Item label='Header' name={[name, 'key']}>
                    <Input placeholder='X-Custom-Header' />
                  </Form.Item>
                </Col>
                <Col flex={1}>
                  <Form.Item label='Value' name={[name, 'value']}>
                    <Input placeholder='Header Value' />
                  </Form.Item>
                </Col>
                <Col>
                  <MinusCircleOutlined style={{ cursor: 'pointer', fontSize: '14px', margin: '8px 16px 0 0' }} onClick={() => remove(name)} />
                </Col>
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </div>
  );
}
