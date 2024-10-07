import React from 'react';
import { Select } from 'antd';
import './CategoryFilter.css';  // Import the CSS file

const { Option } = Select;

export default function CategoryFilter({ categories, onCategoryChange, selectedCategories, allowMultiple = false }) {
  return (
    <Select
      mode={allowMultiple ? "multiple" : undefined}
      allowClear
      placeholder="Select Category"
      className="category-select"
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
