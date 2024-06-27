import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';

const gradientColors = ['#007F5F', '#80B918'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString()); 

function CatalogButton({ size, onClick, className, style, children }) {
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
        <Button
          type="primary"
          size={size}
          onClick={onClick}
          className={className}
          style={{ ...style, width: '230px', height: '25px', fontSize: '18px' }}
        >
          {children}
        </Button>
      </ConfigProvider>
    </Space>
  );
}

export default CatalogButton;
