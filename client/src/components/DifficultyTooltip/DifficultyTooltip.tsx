import React from 'react';
import { Tooltip, Button } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

function DifficultyTooltip() {
  return (
    <Tooltip
      title={
        <div style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
          Три уровня сложности: <br />
          <br />
          низкая: подойдет новичкам<br />
          <br />
          средняя: нужен инструктаж гида<br />
          <br />
          высокая: требует особой подготовки
        </div>
      }
      color="#008000"
      placement="right"
      mouseLeaveDelay="0.15"
    >
      <Button
        shape="circle"
        style={{
          position: 'absolute',
          bottom: '15px',
          fontSize: '22px',
          backgroundColor: '#008000',
          borderColor: '#008000',
          color: 'white',
        }}
      >
        <QuestionOutlined />
      </Button>
    </Tooltip>
  );
}

export default DifficultyTooltip;
