// @ts-nocheck
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Form } from 'antd';
import { Operator, Row, getRowSytleColor } from '../../util';
import ShowTagSelectIcon from './showTagIcon';
import { ValueTagsCont } from './valueTagsCont';
import HighlightText from './highlight';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import LogContext from '../context';
import { FieldConfigVersion2 } from '@/pages/log/IndexPatterns/types';

interface IProps {
  fieldConfig?: FieldConfigVersion2;
  datasourceValue: number;
  row: Row;
  operator: Operator;
  keywords: string[];
  addQueryLabel: (key: string, value: string, operator: string) => void;
  range: IRawTimeRange;
}
export default function LogRow(props: IProps) {
  const { t } = useTranslation('explorer');
  const { datasourceValue, row, operator, keywords, addQueryLabel, fieldConfig, range } = props;
  const [showTags, setShowTags] = useState<boolean>(false);
  const [showContext, setShowContext] = useState<boolean>(false);
  useEffect(() => {
    setShowTags(false);
  }, [row]);

  return (
    <div>
      <span className='logRowStyled' style={{ borderLeftColor: getRowSytleColor(row.tags?.level ?? 'unknow') }}>
        <span
          className='log-ts-row'
          onMouseEnter={() => {
            setShowContext(true);
          }}
          onMouseLeave={() => {
            setShowContext(false);
          }}
          onClick={() => {
            setShowTags(!showTags);
          }}
        >
          <span style={{ paddingRight: '5px' }}>
            <ShowTagSelectIcon
              showTags={showTags}
              onShowTagsChange={(value) => {
                setShowTags(value);
              }}
            />
          </span>
          {operator.showTime && <span className='rowTimestamp'>{moment(Number(row.time) / 1000000).format('YYYY-MM-DD HH:mm:ss')}</span>}
          <span className='rowLogContent'>
            <HighlightText text={row.log} keyword={keywords} prettifyJson={operator.prettifyJson} />
          </span>
          {showContext && keywords && keywords.length > 0 && (
            <Button
              size='small'
              type='primary'
              style={{ borderRadius: 4 }}
              onClick={() => {
                LogContext({ time: row.time, log: row.log, datasourceValue: datasourceValue, tags: row.tags });
              }}
            >
              {t('log.show_conext')}
            </Button>
          )}
        </span>
        <ValueTagsCont tags={row.tags} showTags={showTags} addQueryLabel={addQueryLabel} log={row.log} fieldConfig={fieldConfig} range={range} />
      </span>
    </div>
  );
}
