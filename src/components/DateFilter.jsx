import React, { useState, useEffect } from 'react';
import { DatePicker, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default function DateFilter({ onDateChange }) {
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [selectedDates, setSelectedDates] = useState([null, null]);

  // Handle date changes
  const handleDateChange = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      onDateChange(dateStrings);  // Send formatted date strings to the parent component
      setSelectedDates(dates);    // Keep the selected dates as moment objects for the RangePicker
    } else {
      setSelectedDates([null, null]); // Clear the selected dates if nothing is selected
      onDateChange([null, null]);
    }
  };

  // Adjust date format based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDateFormat('DD-MM-YYYY');
      } else {
        setDateFormat('YYYY-MM-DD');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Run once to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #d9d9d9', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px', color: '#1a1f71' }} />
        <RangePicker
          value={selectedDates} // Controlled value
          onChange={handleDateChange}
          format={dateFormat} // Dynamically set display format based on screen size
          placeholder={['From', 'To']}
          style={{ width: '100%', height: '2vh', padding: '2px 12px', border: 'none', backgroundColor: 'transparent' }}
          bordered={false}
          allowClear={true} // Allow clearing of dates with a "clear" button
        />
      </div>
    </Space>
  );
}
