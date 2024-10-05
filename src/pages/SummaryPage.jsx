import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { fetchExpenses } from '../actions/expenseActions';
import { Row, Col, Card, Select } from 'antd';
import HamburgerMenu from '../components/HamburgerMenu';
import DateFilter from '../components/DateFilter'; // Reuse the DateFilter component
import moment from 'moment';

const { Option } = Select;

export default function SummaryPage() {
  const dispatch = useDispatch();

  // Fetch expenses from Redux store
  const expenses = useSelector((state) => state.expenses.expenses);
  const loading = useSelector((state) => state.expenses.loading);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);  // State for selected date range

  // Fetch the expenses data when the component loads
  useEffect(() => {
    dispatch(fetchExpenses());  // Trigger the API call to fetch expenses
  }, [dispatch]);

  // Calculate total expenses within the selected date range
  const totalExpenses = useMemo(() => {
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = moment(expense.date, 'YYYY-MM-DD');  // Format the expense date correctly
      const isInRange = dateRange[0] && dateRange[1]
        ? expenseDate.isBetween(moment(dateRange[0], 'YYYY-MM-DD'), moment(dateRange[1], 'YYYY-MM-DD'), 'days', '[]')
        : true;  // If no date range, include all expenses
      return isInRange;
    });
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses, dateRange]);

  // Filter expenses based on selected categories and date range
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const expenseDate = moment(expense.date, 'YYYY-MM-DD');  // Ensure correct date format
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes('All') || selectedCategories.includes(expense.category);
      const matchesDateRange = dateRange[0] && dateRange[1]
        ? expenseDate.isBetween(moment(dateRange[0], 'YYYY-MM-DD'), moment(dateRange[1], 'YYYY-MM-DD'), 'days', '[]')
        : true;  // If no date range, include all expenses
      return matchesCategory && matchesDateRange;
    });
  }, [selectedCategories, dateRange, expenses]);

  // Extract unique categories for the dropdown
  const categories = useMemo(() => {
    return ['All', ...new Set(expenses.map(expense => expense.category))];
  }, [expenses]);

  // Handle date range change (coming from DateFilter)
  const handleDateChange = (dateStrings) => {
    setDateRange(dateStrings ? [dateStrings[0], dateStrings[1]] : [null, null]);  // Update date range filter
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <HamburgerMenu />
      <h1>Summary Page</h1>

      <Row gutter={16}>
        <Col span={24}>
          <Card style={{ marginBottom: '20px' }}>
            <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
          </Card>
        </Col>

        {/* Combine Date and Category Filters with Bar Chart in one card */}
        <Col span={12}>
          <Card title="Expenses by Category and Date">
            {/* Reuse DateFilter component */}
            <DateFilter onDateChange={handleDateChange} />

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
          <Card title="Expenses by Category">
            <PieChart data={filteredExpenses} />  {/* Filtered data is passed to both charts */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
