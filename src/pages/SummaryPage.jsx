import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { fetchExpenses } from '../actions/expenseActions';  // Import the fetchExpenses action
import { Row, Col, Card, Select } from 'antd';
import HamburgerMenu from '../components/HamburgerMenu';

const { Option } = Select;

export default function SummaryPage() {
  const dispatch = useDispatch();

  // Fetch expenses from Redux store
  const expenses = useSelector((state) => state.expenses.expenses);
  const loading = useSelector((state) => state.expenses.loading);  // Optionally, handle loading state

  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch the expenses data when the component loads
  useEffect(() => {
    dispatch(fetchExpenses());  // Trigger the API call to fetch expenses
  }, [dispatch]);

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return expenses.length > 0 ? expenses.reduce((total, expense) => total + expense.amount, 0) : 0;
  }, [expenses]);

  // Filter expenses based on selected categories
  const filteredExpenses = useMemo(() => {
    if (selectedCategories.length === 0 || selectedCategories.includes('All')) {
      return expenses;
    }
    return expenses.filter(expense => selectedCategories.includes(expense.category));
  }, [selectedCategories, expenses]);

  // Extract unique categories for the dropdown
  const categories = useMemo(() => {
    return ['All', ...new Set(expenses.map(expense => expense.category))];
  }, [expenses]);

  // Show loading indicator if the data is still being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <HamburgerMenu />  {/* Add back the menu if required */}
      <h1>Summary Page</h1>

      <Row gutter={16}>
        <Col span={24}>
          <Card style={{ marginBottom: '20px' }}>
            <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
          </Card>
        </Col>

        {/* Combine Search Categories and Bar Chart in one card */}
        <Col span={12}>
          <Card title="Expenses by Category">
            {/* Category Selector */}
            <Select
              mode="multiple"
              allowClear
              placeholder="Select Categories"
              style={{ width: '100%', marginBottom: '20px' }}
              onChange={setSelectedCategories}
              value={selectedCategories}
            >
              {categories.map(category => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>

            {/* Bar Chart */}
            <BarChart data={filteredExpenses} />
          </Card>
        </Col>

        {/* Pie Chart */}
        <Col span={12}>
          <Card title="Pie Chart">
            <PieChart data={filteredExpenses} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
