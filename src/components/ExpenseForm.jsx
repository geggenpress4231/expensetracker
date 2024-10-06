import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addExpense, updateExpense } from '../actions/expenseActions';
import { AutoComplete, Input, Button, Select, DatePicker, Form } from 'antd';
import moment from 'moment';

export default function ExpenseForm({ onSubmit, expense }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Ant Design form instance
  const [suggestions, setSuggestions] = useState([]);
  const LOCAL_STORAGE_KEY = 'expenseDescriptions';
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Load saved descriptions from localStorage when the component loads
  useEffect(() => {
    const savedDescriptions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setSuggestions(savedDescriptions);
  }, []);

  // Pre-fill form with expense data if editing
  useEffect(() => {
    if (expense) {
      form.setFieldsValue({
        description: expense.description,
        amount: expense.amount,
        date: moment(expense.date),
        category: expense.category,
      });
    } else {
      form.resetFields(); // Reset the form if no expense is provided
    }
  }, [expense, form]);

  // Handle form submission
  const onFinish = (values) => {
    const newExpense = {
      id: expense ? expense.id : Date.now(),
      description: values.description,
      amount: parseFloat(values.amount),
      date: values.date.format('YYYY-MM-DD'),
      category: values.category,
    };

    const savedDescriptions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    if (!savedDescriptions.includes(values.description)) {
      savedDescriptions.push(values.description);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedDescriptions));
    }

    if (expense) {
      dispatch(updateExpense(newExpense));
    } else {
      dispatch(addExpense(newExpense));
    }

    onSubmit(); // Close modal after adding/updating
  };

  // Filter suggestions based on input
  const handleSearch = (searchText) => {
    if (searchText) {
      setFilteredSuggestions(
        suggestions.filter((desc) =>
          desc.toLowerCase().startsWith(searchText.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]); // Clear suggestions if input is empty
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="expense-form"
      validateTrigger="onFinish"
      requiredMark={false}   // Set validation to trigger on form submit
    >
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter a description!' }]}
      >
        <AutoComplete
          options={filteredSuggestions.map((desc) => ({ value: desc }))}
          placeholder="Enter description"
          onSearch={handleSearch} // Filter suggestions as the user types
          allowClear
       
          
          filterOption={false}
        />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          { required: true, message: 'Please enter an amount!' },
          {
            validator: (_, value) =>
              value && parseFloat(value) > 0
                ? Promise.resolve()
                : Promise.reject('Amount must be greater than 0!'),
          },
        ]}
      >
        <Input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter amount"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please select a date!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select placeholder="Select a category" allowClear>
          <Select.Option value="Food">Food</Select.Option>
          <Select.Option value="Transport">Transport</Select.Option>
          <Select.Option value="Entertainment">Entertainment</Select.Option>
          <Select.Option value="Bills">Bills</Select.Option>
          <Select.Option value="Health">Health</Select.Option>
          <Select.Option value="Groceries">Groceries</Select.Option>
          <Select.Option value="Education">Education</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
  <Button 
    type="primary" 
    htmlType="submit" 
    block
    className="submit-btn"
    style={{ 
      backgroundColor: '#1a1f71', 
      borderColor: '#1a1f71', 
      color: '#ffffff',
      transition: 'background-color 0.3s ease'  // Adding a smooth transition effect
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#14205b';  // Darker navy on hover
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#1a1f71';  // Reset to original color on mouse leave
    }}
  >
    Submit
  </Button>
</Form.Item>



    </Form>
  );
}
