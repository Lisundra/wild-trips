import React from 'react';
import { Tooltip, Button } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';

function DifficultyTooltip() {
  const gradient = 'linear-gradient(116deg, #007F5F, #80B918)';

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
      color={gradient}
      placement="rightTop"
      mouseLeaveDelay="0.15"
      arrow={false}
    >
      <Button
        shape="circle"
        style={{
          position: 'absolute',
          bottom: '15px',
          fontSize: '22px',
          background: gradient,
          borderColor: gradient,
          color: 'white',
        }}
      >
        <QuestionOutlined />
      </Button>
    </Tooltip>
  );
}

export default DifficultyTooltip;
