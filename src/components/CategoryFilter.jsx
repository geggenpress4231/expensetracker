import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function CategoryFilter({ categories, onCategoryChange, selectedCategories, allowMultiple = false }) {
  return (
    <Select
      mode={allowMultiple ? "multiple" : undefined}
      allowClear
      placeholder="Select Category"
      style={{ width: '100%' }}
      onChange={onCategoryChange}
      value={selectedCategories}
    >
      {categories.map(category => (
        <Option key={category} value={category}>
          {category}
        </Option>
      ))}
    </Select>
  );
}
