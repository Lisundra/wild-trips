import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';

const gradientColors = ['#007F5F', '#80B918'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString()); 

function RegButton({ size, onClick, className, style, children }) {
  return (
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
          htmlType="submit"
          size="large"
          style={{ width: '230px', height: '50px', fontSize: '20px', borderRadius: '9px' }}
        >
          {children}
        </Button>
      </ConfigProvider>
  );
}

export default RegButton;