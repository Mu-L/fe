import React, { useState, useRef, useEffect, useContext } from 'react';
import { Table, Tag, Tooltip, Space, Input, Dropdown, Menu, Button, Modal, message, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SearchOutlined, DownOutlined, ReloadOutlined, CopyOutlined, ApartmentOutlined, InfoCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import _ from 'lodash';
import moment from 'moment';
import { useTranslation, Trans } from 'react-i18next';

import { getMonObjectList } from '@/services/targets';
import { timeFormatter } from '@/pages/dashboard/Renderer/utils/valueFormatter';
import { CommonStateContext } from '@/App';
import usePagination from '@/components/usePagination';
import DocumentDrawer from '@/components/DocumentDrawer';

import clipboard from './clipboard';
import OrganizeColumns from './OrganizeColumns';
import { getDefaultColumnsConfigs, setDefaultColumnsConfigs } from './utils';
import TargetMetaDrawer from './TargetMetaDrawer';
import Explorer from './components/Explorer';
import EditBusinessGroups from './components/EditBusinessGroups';
import HostsSelect from './components/HostsSelect';

// @ts-ignore
import CollectsDrawer from 'plus:/pages/collects/CollectsDrawer';
// @ts-ignore
import UpgradeAgent from 'plus:/parcels/Targets/UpgradeAgent';
// @ts-ignore
import VersionSelect from 'plus:/parcels/Targets/VersionSelect';
// @ts-ignore
import { extraColumns } from 'plus:/parcels/Targets';

export const pageSizeOptions = ['10', '20', '50', '100'];

enum OperateType {
  BindTag = 'bindTag',
  UnbindTag = 'unbindTag',
  UpdateBusi = 'updateBusi',
  RemoveBusi = 'removeBusi',
  UpdateNote = 'updateNote',
  Delete = 'delete',
  None = 'none',
}

export interface ITargetProps {
  id: number;
  cluster: string;
  group_id: number;
  group_objs: object[] | null;
  ident: string;
  note: string;
  tags: string[];
  update_at: number;
}

interface IProps {
  editable?: boolean;
  explorable?: boolean;
  gids?: string;
  selectedRows: ITargetProps[];
  setSelectedRows: (selectedRowKeys: ITargetProps[]) => void;
  refreshFlag: string;
  setRefreshFlag: (refreshFlag: string) => void;
  setOperateType?: (operateType: OperateType) => void;
}

const GREEN_COLOR = '#3FC453';
const YELLOW_COLOR = '#FF9919';
const RED_COLOR = '#FF656B';
const LOST_COLOR_LIGHT = '#CCCCCC';
const LOST_COLOR_DARK = '#929090';
const downtimeOptions = [1, 2, 3, 5, 10, 30];
const Unknown = () => {
  const { t } = useTranslation('targets');
  return <Tooltip title={t('unknown_tip')}>unknown</Tooltip>;
};

export default function List(props: IProps) {
  const { t, i18n } = useTranslation('targets');
  const pagination = usePagination({ PAGESIZE_KEY: 'targets' });
  const { darkMode } = useContext(CommonStateContext);
  const { editable = true, explorable = true, gids, selectedRows, setSelectedRows, refreshFlag, setRefreshFlag, setOperateType } = props;
  const selectedIdents = _.map(selectedRows, 'ident');
  const isAddTagToQueryInput = useRef(false);
  const [searchVal, setSearchVal] = useState('');
  const [tableQueryContent, setTableQueryContent] = useState<string>('');
  const [columnsConfigs, setColumnsConfigs] = useState<{ name: string; visible: boolean }[]>(getDefaultColumnsConfigs());
  const [collectsDrawerVisible, setCollectsDrawerVisible] = useState(false);
  const [collectsDrawerIdent, setCollectsDrawerIdent] = useState('');
  const [downtime, setDowntime] = useState();
  const [agentVersions, setAgentVersions] = useState<string>();
  const [hosts, setHosts] = useState<string>();
  const sorterRef = useRef<any>();
  const LOST_COLOR = darkMode ? LOST_COLOR_DARK : LOST_COLOR_LIGHT;
  const columns: ColumnsType<any> = [
    {
      title: (
        <Space>
          {t('common:table.ident')}
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu
                onClick={async ({ key }) => {
                  let tobeCopy = _.map(tableProps.dataSource, (item) => item.ident);
                  if (key === 'all') {
                    try {
                      const result = await featchData({ current: 1, pageSize: tableProps.pagination.total });
                      tobeCopy = _.map(result.list, (item) => item.ident);
                    } catch (error) {
                      console.error(error);
                    }
                  } else if (key === 'selected') {
                    tobeCopy = selectedIdents;
                  }

                  if (_.isEmpty(tobeCopy)) {
                    message.warn(t('copy.no_data'));
                    return;
                  }

                  const tobeCopyStr = _.join(tobeCopy, '\n');
                  const copySucceeded = clipboard(tobeCopyStr);

                  if (copySucceeded) {
                    message.success(t('ident_copy_success', { num: tobeCopy.length }));
                  } else {
                    Modal.warning({
                      title: t('host.copy.error'),
                      content: <Input.TextArea defaultValue={tobeCopyStr} />,
                    });
                  }
                }}
              >
                <Menu.Item key='current_page'>{t('copy.current_page')}</Menu.Item>
                <Menu.Item key='all'>{t('copy.all')}</Menu.Item>
                <Menu.Item key='selected'>{t('copy.selected')}</Menu.Item>
              </Menu>
            }
          >
            <CopyOutlined
              style={{
                cursor: 'pointer',
              }}
            />
          </Dropdown>
        </Space>
      ),
      dataIndex: 'ident',
      className: 'n9e-hosts-table-column-ident',
      render: (text) => {
        return (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <TargetMetaDrawer ident={text} />
            {import.meta.env['VITE_IS_PRO'] && (
              <Tooltip title='查看关联采集配置'>
                <ApartmentOutlined
                  onClick={() => {
                    setCollectsDrawerVisible(true);
                    setCollectsDrawerIdent(text);
                  }}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  _.forEach(columnsConfigs, (item) => {
    if (!item.visible) return;
    if (item.name === 'host_ip') {
      columns.push({
        title: t('host_ip'),
        dataIndex: 'host_ip',
        className: 'n9e-hosts-table-column-ip',
      });
    }
    if (item.name === 'host_tags') {
      columns.push({
        title: (
          <Space>
            {t('common:host.host_tags')}
            <Tooltip title={t('common:host.host_tags_tip')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        ),
        dataIndex: 'host_tags',
        className: 'n9e-hosts-table-column-tags',
        ellipsis: {
          showTitle: false,
        },
        render(tagArr) {
          const content =
            tagArr &&
            tagArr.map((item) => (
              <Tag
                color='purple'
                key={item}
                onClick={(e) => {
                  if (!tableQueryContent.includes(item)) {
                    isAddTagToQueryInput.current = true;
                    const val = tableQueryContent ? `${tableQueryContent.trim()} ${item}` : item;
                    setTableQueryContent(val);
                    setSearchVal(val);
                  }
                }}
              >
                {item}
              </Tag>
            ));
          return (
            tagArr && (
              <Tooltip title={content} placement='topLeft' getPopupContainer={() => document.body} overlayClassName='mon-manage-table-tooltip'>
                {content}
              </Tooltip>
            )
          );
        },
      });
    }
    if (item.name === 'tags') {
      columns.push({
        title: (
          <Space>
            {t('common:host.tags')}
            <Tooltip title={t('common:host.tags_tip')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        ),
        dataIndex: 'tags',
        className: 'n9e-hosts-table-column-tags',
        ellipsis: {
          showTitle: false,
        },
        render(tagArr) {
          const content =
            tagArr &&
            tagArr.map((item) => (
              <Tag
                color='purple'
                key={item}
                onClick={(e) => {
                  if (!tableQueryContent.includes(item)) {
                    isAddTagToQueryInput.current = true;
                    const val = tableQueryContent ? `${tableQueryContent.trim()} ${item}` : item;
                    setTableQueryContent(val);
                    setSearchVal(val);
                  }
                }}
              >
                {item}
              </Tag>
            ));
          return (
            tagArr && (
              <Tooltip title={content} placement='topLeft' getPopupContainer={() => document.body} overlayClassName='mon-manage-table-tooltip'>
                {content}
              </Tooltip>
            )
          );
        },
      });
    }
    if (item.name === 'group_obj') {
      columns.push({
        title: t('group_obj'),
        dataIndex: 'group_objs',
        className: 'n9e-hosts-table-column-tags',
        ellipsis: {
          showTitle: false,
        },
        render(tagArr) {
          if (_.isEmpty(tagArr)) return t('common:not_grouped');
          const content =
            tagArr &&
            tagArr.map((item) => (
              <Tag color='purple' key={item.name}>
                {item.name}
              </Tag>
            ));
          return (
            tagArr && (
              <Tooltip title={content} placement='topLeft' getPopupContainer={() => document.body}>
                {content}
              </Tooltip>
            )
          );
        },
      });
    }
    if (item.name === 'mem_util') {
      columns.push({
        title: t('mem_util'),
        dataIndex: 'mem_util',
        render(text, reocrd) {
          if (reocrd.cpu_num === -1) return <Unknown />;
          let backgroundColor = GREEN_COLOR;
          if (text > 70) {
            backgroundColor = YELLOW_COLOR;
          }
          if (text > 85) {
            backgroundColor = RED_COLOR;
          }
          if (reocrd.target_up === 0) {
            backgroundColor = LOST_COLOR;
          }

          return (
            <div
              className='table-td-fullBG'
              style={{
                backgroundColor: backgroundColor,
              }}
            >
              {_.floor(text, 1)}%
            </div>
          );
        },
      });
    }
    if (item.name === 'cpu_util') {
      columns.push({
        title: t('cpu_util'),
        dataIndex: 'cpu_util',
        render(text, reocrd) {
          if (reocrd.cpu_num === -1) return <Unknown />;
          let backgroundColor = GREEN_COLOR;
          if (text > 70) {
            backgroundColor = YELLOW_COLOR;
          }
          if (text > 85) {
            backgroundColor = RED_COLOR;
          }
          if (reocrd.target_up === 0) {
            backgroundColor = LOST_COLOR;
          }
          return (
            <div
              className='table-td-fullBG'
              style={{
                backgroundColor: backgroundColor,
              }}
            >
              {_.floor(text, 1)}%
            </div>
          );
        },
      });
    }
    if (item.name === 'cpu_num') {
      columns.push({
        title: t('cpu_num'),
        dataIndex: 'cpu_num',
        render: (val, reocrd) => {
          if (reocrd.cpu_num === -1) return <Unknown />;
          return val;
        },
      });
    }
    if (item.name === 'offset') {
      columns.push({
        title: (
          <Space>
            {t('offset')}
            <Tooltip title={t('offset_tip')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        ),
        dataIndex: 'offset',
        render(text, reocrd) {
          if (reocrd.cpu_num === -1) return <Unknown />;
          let backgroundColor = RED_COLOR;
          if (Math.abs(text) < 2000) {
            backgroundColor = YELLOW_COLOR;
          }
          if (Math.abs(text) < 1000) {
            backgroundColor = GREEN_COLOR;
          }
          if (reocrd.target_up === 0) {
            backgroundColor = LOST_COLOR;
          }
          return (
            <div
              className='table-td-fullBG'
              style={{
                backgroundColor: backgroundColor,
              }}
            >
              {timeFormatter(text, 'milliseconds', 2)?.text}
            </div>
          );
        },
      });
    }
    if (item.name === 'os') {
      columns.push({
        title: t('os'),
        dataIndex: 'os',
        render: (val, reocrd) => {
          if (reocrd.cpu_num === -1) return <Unknown />;
          return val;
        },
      });
    }
    if (item.name === 'arch') {
      columns.push({
        title: t('arch'),
        dataIndex: 'arch',
        render: (val, reocrd) => {
          if (reocrd.cpu_num === -1) return <Unknown />;
          return val;
        },
      });
    }
    if (item.name === 'update_at') {
      columns.push({
        title: (
          <Space>
            {t('update_at')}
            <Tooltip title={<Trans ns='targets' i18nKey='update_at_tip' components={{ 1: <br /> }} />}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        ),
        sorter: true,
        dataIndex: 'update_at',
        render: (val, reocrd) => {
          let result = moment.unix(val).format('YYYY-MM-DD HH:mm:ss');
          let backgroundColor = GREEN_COLOR;
          if (reocrd.target_up === 0) {
            backgroundColor = RED_COLOR;
          } else if (reocrd.target_up === 1) {
            backgroundColor = YELLOW_COLOR;
          }
          return (
            <div
              className='table-td-fullBG'
              style={{
                backgroundColor,
              }}
            >
              {result}
            </div>
          );
        },
      });
    }
    if (item.name === 'remote_addr') {
      columns.push({
        title: (
          <Space>
            {t('remote_addr')}
            <Tooltip title={t('remote_addr_tip')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        ),
        dataIndex: 'remote_addr',
        render: (val, reocrd) => {
          if (reocrd.cpu_num === -1) return <Unknown />;
          return val;
        },
      });
    }
    extraColumns(item.name, columns);
    if (item.name === 'note') {
      columns.push({
        title: t('common:table.note'),
        dataIndex: 'note',
        ellipsis: {
          showTitle: false,
        },
        render(note) {
          return (
            <Tooltip title={note} placement='topLeft' getPopupContainer={() => document.body}>
              {note}
            </Tooltip>
          );
        },
      });
    }
  });

  const featchData = ({ current, pageSize, sorter }: { current: number; pageSize: number; sorter?: any }): Promise<any> => {
    const query = {
      query: tableQueryContent,
      gids: gids,
      limit: pageSize,
      p: current,
      downtime,
      agent_versions: _.isEmpty(agentVersions) ? undefined : JSON.stringify(agentVersions),
      hosts,
      order: sorter?.field,
      desc: sorter?.field ? sorter?.order === 'descend' : undefined,
    };
    return getMonObjectList(query).then((res) => {
      return {
        total: res.dat.total,
        list: res.dat.list,
      };
    });
  };

  const { tableProps, run } = useAntdTable(featchData, {
    manual: true,
    defaultPageSize: localStorage.getItem('targetsListPageSize') ? _.toNumber(localStorage.getItem('targetsListPageSize')) : 30,
  });

  useEffect(() => {
    run({
      current: 1,
      pageSize: tableProps.pagination.pageSize,
      sorter: sorterRef.current,
    });
  }, [tableQueryContent, gids, downtime, agentVersions, hosts]);

  useEffect(() => {
    run({
      current: tableProps.pagination.current,
      pageSize: tableProps.pagination.pageSize,
      sorter: sorterRef.current,
    });
  }, [refreshFlag]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              setRefreshFlag(_.uniqueId('refreshFlag_'));
            }}
          />
          <Input
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
            placeholder={t('search_placeholder')}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onPressEnter={() => {
              setTableQueryContent(searchVal);
            }}
            onBlur={() => {
              setTableQueryContent(searchVal);
            }}
          />
          <HostsSelect
            value={hosts}
            onChange={(newHosts) => {
              setHosts(newHosts);
            }}
          />
          <Select
            allowClear
            placeholder={t('filterDowntime')}
            style={{ width: 'max-content' }}
            dropdownMatchSelectWidth={false}
            options={[
              {
                label: t('filterDowntimeNegative'),
                options: _.map(downtimeOptions, (item) => {
                  return {
                    label: t('filterDowntimeNegativeMin', { count: item }),
                    value: -(item * 60),
                  };
                }),
              },
              {
                label: t('filterDowntimePositive'),
                options: _.map(downtimeOptions, (item) => {
                  return {
                    label: t('filterDowntimePositiveMin', { count: item }),
                    value: item * 60,
                  };
                }),
              },
            ]}
            value={downtime}
            onChange={(val) => {
              setDowntime(val);
            }}
          />
          <VersionSelect
            value={agentVersions}
            onChange={(val) => {
              setAgentVersions(val);
            }}
          />
        </Space>
        <Space>
          {editable && (
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu
                  onClick={({ key }) => {
                    if (key && setOperateType) {
                      setOperateType(key as OperateType);
                    }
                  }}
                >
                  <Menu.Item key={OperateType.BindTag}>{t('bind_tag.title')}</Menu.Item>
                  <Menu.Item key={OperateType.UnbindTag}>{t('unbind_tag.title')}</Menu.Item>
                  <Menu.Item key='EditBusinessGroups'>
                    <EditBusinessGroups
                      gids={gids}
                      idents={selectedIdents}
                      selectedRows={selectedRows}
                      onOk={() => {
                        setRefreshFlag(_.uniqueId('refreshFlag_'));
                        setSelectedRows([]);
                      }}
                    />
                  </Menu.Item>
                  <Menu.Item key={OperateType.UpdateNote}>{t('update_note.title')}</Menu.Item>
                  <Menu.Item key={OperateType.Delete}>{t('batch_delete.title')}</Menu.Item>
                  <Menu.Item key='UpgradeAgent'>
                    <UpgradeAgent
                      selectedIdents={selectedIdents}
                      onOk={() => {
                        setRefreshFlag(_.uniqueId('refreshFlag_'));
                      }}
                    />
                  </Menu.Item>
                </Menu>
              }
            >
              <Button>
                {t('common:btn.batch_operations')} <DownOutlined />
              </Button>
            </Dropdown>
          )}
          {explorable && <Explorer selectedIdents={selectedIdents} />}
          <Button
            onClick={() => {
              OrganizeColumns({
                value: columnsConfigs,
                onChange: (val) => {
                  setColumnsConfigs(val);
                  setDefaultColumnsConfigs(val);
                },
              });
            }}
            icon={<EyeOutlined />}
          />
        </Space>
      </div>
      <Table
        className='mt8 n9e-hosts-table'
        rowKey='id'
        columns={columns}
        size='small'
        {...tableProps}
        showSorterTooltip={false}
        tableLayout='auto'
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: _.map(selectedRows, 'id'),
          onChange(selectedRowKeys, selectedRows: ITargetProps[]) {
            setSelectedRows(selectedRows);
          },
        }}
        pagination={{
          ...tableProps.pagination,
          ...pagination,
          onChange(page, pageSize) {
            localStorage.setItem('targetsListPageSize', _.toString(pageSize));
          },
        }}
        scroll={{ x: 'max-content' }}
        locale={{
          emptyText:
            gids === undefined ? (
              <Trans
                ns='targets'
                i18nKey='all_no_data'
                components={{
                  a: (
                    <a
                      onClick={() => {
                        DocumentDrawer({
                          language: i18n.language,
                          darkMode,
                          title: t('categraf_doc'),
                          documentPath: '/docs/categraf',
                        });
                      }}
                    />
                  ),
                }}
              />
            ) : undefined,
        }}
        onChange={(pagination, filters, sorter) => {
          sorterRef.current = sorter;
          tableProps.onChange(pagination, filters, sorter);
        }}
      />
      <CollectsDrawer visible={collectsDrawerVisible} setVisible={setCollectsDrawerVisible} ident={collectsDrawerIdent} />
    </div>
  );
}
