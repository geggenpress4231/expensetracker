import React, { useMemo, useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import BarChart from '../components/BarChart';
import { Select, Card, Row, Col } from 'antd';
import HamburgerMenu from '../components/HamburgerMenu';

const { Option } = Select;

export default function SummaryPage() {
  const { expenses } = useContext(ExpenseContext);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  // Filter and aggregate expenses by selected categories
  const filteredExpenses = useMemo(() => {
    if (selectedCategories.length === 0 || selectedCategories.includes("All")) {
      return expenses;
    }
    return expenses.filter((expense) => selectedCategories.includes(expense.category));
  }, [selectedCategories, expenses]);

  // Unique categories for the dropdown
  const categories = useMemo(() => {
    return ["All", ...new Set(expenses.map((expense) => expense.category))];
  }, [expenses]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <HamburgerMenu/>
      <h1>Summary Page</h1>

      <Row gutter={16}>
        <Col span={24}>
          <Card style={{ marginBottom: '20px' }}>
            <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
          </Card>
        </Col>

        <Col span={24}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Select Categories"
            style={{ width: '100%', marginBottom: '20px' }}
            onChange={setSelectedCategories}
            value={selectedCategories}
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={24}>
          <BarChart data={filteredExpenses} />
        </Col>
      </Row>
    </div>
  );
}
