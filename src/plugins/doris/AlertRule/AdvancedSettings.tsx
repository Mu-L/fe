import React, { useState } from 'react';
import { Row, Col, Form, Input, Tooltip, Select } from 'antd';
import { DownOutlined, RightOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import InputGroupWithFormItem from '@/components/InputGroupWithFormItem';
import UnitPicker from '@/pages/dashboard/Components/UnitPicker';

interface IProps {
  span?: number;
  prefixField?: any;
  prefixName?: (string | number)[];
  disabled?: boolean;
  showUnit?: boolean;
}

function AdvancedSettings(props: IProps) {
  const { t } = useTranslation('db_aliyunSLS');
  const { span = 8, prefixField = {}, prefixName = [], disabled, showUnit } = props;
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <span
          onClick={() => {
            setOpen(!open);
          }}
          style={{ cursor: 'pointer' }}
        >
          {open ? <DownOutlined /> : <RightOutlined />} {t('query.advancedSettings.title')}
        </span>
      </div>
      <div style={{ display: open ? 'block' : 'none' }}>
        <Row gutter={8}>
          <Col span={span}>
            <InputGroupWithFormItem
              label={
                <span>
                  ValueKey{' '}
                  <Tooltip title={t('query.advancedSettings.valueKey_tip')}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              labelWidth={100}
            >
              <Form.Item
                {...prefixField}
                name={[...prefixName, 'keys', 'valueKey']}
                style={{ width: '100%' }}
                rules={[
                  {
                    required: true,
                    message: t('请输入'),
                  },
                ]}
              >
                <Input disabled={disabled} />
              </Form.Item>
            </InputGroupWithFormItem>
          </Col>
          <Col span={span}>
            <InputGroupWithFormItem
              label={
                <span>
                  LabelKey{' '}
                  <Tooltip title={t('query.advancedSettings.labelKey_tip')}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              labelWidth={100}
            >
              <Form.Item {...prefixField} name={[...prefixName, 'keys', 'labelKey']} style={{ width: '100%' }}>
                <Input disabled={disabled} />
              </Form.Item>
            </InputGroupWithFormItem>
          </Col>
          {showUnit && (
            <Col span={span}>
              <InputGroupWithFormItem label={t('common:unit')}>
                <Form.Item {...prefixField} name={[prefixField.name, 'unit']} initialValue='none'>
                  <UnitPicker optionLabelProp='cleanLabel' style={{ width: '100%' }} dropdownMatchSelectWidth={false} />
                </Form.Item>
              </InputGroupWithFormItem>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}

export default AdvancedSettings;
