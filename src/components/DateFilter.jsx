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
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #d9d9d9', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px', color: '#1a1f71' }} />
        <RangePicker
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          placeholder={['From', 'To']}
          style={{ width: '100%', height:'2vh',padding: '8px 12px', border: 'none', backgroundColor: 'transparent' }}
          bordered={false}
        />
      </div>
    </Space>
  );
}
