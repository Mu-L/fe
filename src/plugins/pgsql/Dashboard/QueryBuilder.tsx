import React from 'react';
import { Form, Row, Col, Space, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import TimeRangePicker, { isMathString } from '@/components/TimeRangePicker';
import Collapse, { Panel } from '@/pages/dashboard/Editor/Components/Collapse';
import LogQL from '@/components/LogQL';
import ExpressionPanel from '@/pages/dashboard/Editor/Components/ExpressionPanel';
import AddQueryButtons from '@/pages/dashboard/Editor/Components/AddQueryButtons';
import { alphabet } from '@/utils/constant';

import AdvancedSettings from '../components/AdvancedSettings';
import LegendInput from '../components/LegendInput';
import { NAME_SPACE, STYLE_NAME_SPACE, QUERY_KEY } from '../constants';
import './style.less';

export default function MySQLQueryBuilder({ datasourceValue }) {
  const { t } = useTranslation(NAME_SPACE);
  const chartForm = Form.useFormInstance();
  const type = Form.useWatch('type');
  const targets = Form.useWatch('targets');

  if (!type) return null;

  return (
    <div className={STYLE_NAME_SPACE}>
      <Form.List name='targets'>
        {(fields, { add, remove }, { errors }) => {
          return (
            <>
              <Collapse>
                {_.map(fields, (field, index) => {
                  const prefixName = ['targets', field.name];
                  const mode = _.get(targets, [field.name, 'query', 'mode']);
                  const { __mode__ } = targets?.[field.name] || {};
                  if (__mode__ === '__expr__') {
                    return <ExpressionPanel key={field.key} fields={fields} remove={remove} field={field} />;
                  }
                  return (
                    <Panel
                      header={
                        <Form.Item noStyle shouldUpdate>
                          {({ getFieldValue }) => {
                            return getFieldValue([...prefixName, 'refId']) || alphabet[index];
                          }}
                        </Form.Item>
                      }
                      key={field.key}
                      extra={
                        <div>
                          {fields.length > 1 ? (
                            <DeleteOutlined
                              style={{ marginLeft: 10 }}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          ) : null}
                        </div>
                      }
                    >
                      <Form.Item noStyle {...field} name={[field.name, 'refId']}>
                        <div />
                      </Form.Item>
                      <Form.Item
                        className='dashboard-querybuilder-query-item'
                        label={
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Space>{t('query.query')}</Space>
                            <Form.Item name={[field.name, 'query', 'mode']} initialValue={type === 'timeseries' ? 'timeSeries' : 'raw'} noStyle>
                              <Select>
                                <Select.Option value='timeSeries'>{t('query.dashboard.mode.timeSeries')}</Select.Option>
                                <Select.Option value='raw'>{t('query.dashboard.mode.table')}</Select.Option>
                              </Select>
                            </Form.Item>
                          </div>
                        }
                        {...field}
                        name={[field.name, 'query', QUERY_KEY]}
                        validateTrigger={['onBlur']}
                        rules={[
                          {
                            required: true,
                            message: t('query.query_required'),
                          },
                        ]}
                        style={{ flex: 1 }}
                      >
                        <LogQL
                          datasourceCate={NAME_SPACE}
                          datasourceValue={datasourceValue}
                          query={{}}
                          historicalRecords={[]}
                          validateTrigger={[]}
                          placeholder={t('query.query_placeholder')}
                        />
                      </Form.Item>
                      {mode === 'timeSeries' && <AdvancedSettings mode='graph' span={8} prefixField={field} prefixName={[field.name, 'query']} expanded />}
                      <Row gutter={10}>
                        <Col flex='auto'>
                          <Form.Item
                            label='Legend'
                            {...field}
                            name={[field.name, 'legend']}
                            tooltip={{
                              getPopupContainer: () => document.body,
                              title: t('dashboard:query.legendTip2', {
                                interpolation: { skipOnVariables: true },
                              }),
                            }}
                          >
                            <LegendInput />
                          </Form.Item>
                        </Col>
                        <Col flex='100px'>
                          <Form.Item
                            label={t('dashboard:query.time')}
                            {...field}
                            name={[field.name, 'time']}
                            tooltip={{
                              getPopupContainer: () => document.body,
                              title: t('dashboard:query.time_tip'),
                            }}
                            normalize={(val) => {
                              return {
                                start: isMathString(val.start) ? val.start : moment(val.start).format('YYYY-MM-DD HH:mm:ss'),
                                end: isMathString(val.end) ? val.end : moment(val.end).format('YYYY-MM-DD HH:mm:ss'),
                              };
                            }}
                          >
                            <TimeRangePicker
                              dateFormat='YYYY-MM-DD HH:mm:ss'
                              allowClear
                              onClear={() => {
                                const targets = chartForm.getFieldValue('targets');
                                const targetsClone = _.cloneDeep(targets);
                                _.set(targetsClone, [field.name, 'time'], undefined);
                                chartForm.setFieldsValue({
                                  targets: targetsClone,
                                });
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Panel>
                  );
                })}

                <Form.ErrorList errors={errors} />
              </Collapse>
              <AddQueryButtons
                add={add}
                addQuery={(newRefId) => {
                  add({
                    query: {
                      [QUERY_KEY]: '',
                    },
                    refId: newRefId,
                  });
                }}
              />
            </>
          );
        }}
      </Form.List>
    </div>
  );
}
