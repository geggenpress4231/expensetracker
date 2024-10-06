import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { fetchExpenses } from '../actions/expenseActions';
import { Row, Col, Card, Select } from 'antd';
import HamburgerMenu from '../components/HamburgerMenu';
import DateFilter from '../components/DateFilter'; 
import moment from 'moment';
import './SummaryPage.css'
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
    <div className="summary-page-container">
      <HamburgerMenu className="hamburger-menu" />
      <h1 className="summary-page-title">Expense Summary</h1>

      {/* Filter Container (Date Picker + Category Selector + Total Expenses) */}
      <Row gutter={16} className="filter-container" align="middle" style={{ marginBottom: '20px' }}>
        <Col span={8}>
          {/* Date Filter */}
          <DateFilter onDateChange={handleDateChange} />
        </Col>
        <Col span={8}>
          {/* Category Selector */}
          <Select
            mode="multiple"
            allowClear
            placeholder="Select Categories"
            style={{ width: '100%' }}
            onChange={setSelectedCategories}
            value={selectedCategories}
          >
            {categories.map(category => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={8} className="total-expense-container">
          {/* Total Expenses */}
          <h2 className="total-expense-amount">Total Expenses: ${totalExpenses.toFixed(2)}</h2>
        </Col>
      </Row>

      {/* Charts Container */}
      
        <div className="charts-container">
          {/* Bar Chart */}
          <div className="bar-chart-container">
           
            <BarChart data={filteredExpenses} />
          </div>
          {/* Pie Chart */}
          <div className="pie-chart-container">
           
            <PieChart data={filteredExpenses} />
          </div>
        </div>
  
    </div>
  );
}
