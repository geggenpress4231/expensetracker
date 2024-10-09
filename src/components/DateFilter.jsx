import React, { useState, useEffect } from 'react';
import { DatePicker, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default function DateFilter({ onDateChange }) {
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD'); // Default display format
  
  const handleDateChange = (dates, dateStrings) => {
    // Internally handle dates in 'YYYY-MM-DD' format for consistency
    if (dates) {
      const formattedDates = dates.map(date => date ? date.format('YYYY-MM-DD') : null);
      onDateChange(formattedDates); // Pass consistently formatted dates
    } else {
      onDateChange([null, null]);  // Pass null when date range is cleared
    }
  };

  // Check screen size and adjust the date display format accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDateFormat('DD-MM-YYYY'); // Use day-month-year display format on smaller screens
      } else {
        setDateFormat('YYYY-MM-DD'); // Use year-month-day display format on larger screens
      }
    };

    // Add event listener to detect window resize
    window.addEventListener('resize', handleResize);

    // Run once to set initial state
    handleResize();

    // Cleanup the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #d9d9d9', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px', color: '#1a1f71' }} />
        <RangePicker
          onChange={handleDateChange}
          format={dateFormat}  // Dynamically set display format based on screen size
          placeholder={['From', 'To']}
          style={{ width: '100%', height: '2vh', padding: '2px 12px', border: 'none', backgroundColor: 'transparent' }}
          bordered={false}
        />
      </div>
    </Space>
  );
}
