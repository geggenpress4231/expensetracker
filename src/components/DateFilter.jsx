import React from 'react';
import { DatePicker, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

export default function DateFilter({ onDateChange }) {
  const handleDateChange = (dates, dateStrings) => {
    onDateChange(dateStrings);  // Pass the range as [start, end]
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CalendarOutlined style={{ marginRight: '10px', fontSize: '16px', color: '#1890ff' }} />
        <RangePicker
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          placeholder={['Select Date Range']}
          style={{ width: '100%' }}
          bordered={false}
        />
      </div>
    </Space>
  );
}
