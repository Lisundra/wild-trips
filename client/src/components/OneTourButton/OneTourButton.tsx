import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';

const gradientColors = ['#007F5F', '#80B918'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString()); 

function OneTourButton() {
  return (
    <Space>
      <ConfigProvider
        key="3"
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(116deg,  ${gradientColors.join(', ')})`,
              colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(gradientColors).join(', ')})`,
              colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(gradientColors).join(', ')})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Button type="primary" size="large" style={{ width: '250px', height: '50px', fontSize: '25px' }}>
        Отправить заявку
        </Button>
      </ConfigProvider>
    </Space>
  );
}

export default OneTourButton;
