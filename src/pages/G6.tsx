import React from 'react';
import G6 from '@antv/g6';
import {
  Group,
  Rect,
  Text,
  Circle,
  Image,
  createNodeFromReact,
} from 'g6-react-node';
import { G6MiniDemo } from './G6MiniDemo';

const ReactNode = ({ cfg = {} }) => {
    // @ts-ignore
  const { description, meta = {}, label = 'label' } = cfg;
  return (
    <Group>
      <Rect>
        <Rect
          style={{
            width: 150,
            height: 20,
            fill: cfg.color,
            radius: [6, 6, 0, 0],
            cursor: 'move',
            stroke: cfg.color,
            justyfyContent: 'center',
          }}
          draggable="true"
        >
          <Text
            style={{
              margin: [4, 5],
              fontWeight: 'bold',
              fill: '#fff',
            }}
          >
            {label}
          </Text>
        </Rect>
        <Rect
          style={{
            width: 150,
            height: 55,
            stroke: cfg.color,
            fill: '#ffffff',
            radius: [0, 0, 6, 6],
          }}
        >
          <Text style={{ fill: '#333', margin: [8, 4] }}>
            描述: {description}
          </Text>
          <Text style={{ fill: '#333', margin: [6, 4] }}>
            创建者: {meta.creatorName}
          </Text>
        </Rect>
      </Rect>
      <Circle
        style={{
          stroke: cfg.color,
          r: 10,
          fill: '#fff',
          cursor: 'pointer',
          margin: [0, 'auto'],
        }}
        name="circle"
      >
        <Image
          style={{
            img:
              'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            width: 12,
            height: 12,
            margin: [4, 'auto'],
          }}
        />
      </Circle>
    </Group>
  );
};

G6.registerNode('test', createNodeFromReact(ReactNode));

export default () => <G6MiniDemo nodeType="test" count={3} height={200}/>;