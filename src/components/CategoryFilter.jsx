import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function CategoryFilter({ categories, onCategoryChange }) {
  return (
    <Select
      placeholder="Select Category"
      onChange={onCategoryChange}
      allowClear
    >
      <Option value="All">All</Option>  {/* "All" option */}
      {categories.map((category) => (
        <Option key={category} value={category}>
          {category}
        </Option>
      ))}
    </Select>
  );
}
