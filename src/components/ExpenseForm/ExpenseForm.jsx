import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addExpense, updateExpense } from '../../actions/expenseActions';
import { AutoComplete, Input, Button, Select, DatePicker, Form, message } from 'antd';  
import moment from 'moment';

export default function ExpenseForm({ onSubmit, expense }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [suggestions, setSuggestions] = useState([]);
  const LOCAL_STORAGE_KEY = 'expenseDescriptions';
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    const savedDescriptions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setSuggestions(savedDescriptions);
  }, []);

  useEffect(() => {
    if (expense) {
      form.setFieldsValue({
        description: expense.description,
        amount: expense.amount,
        date: moment(expense.date),
        category: expense.category,
      });
    } else {
      form.resetFields();
    }
  }, [expense, form]);

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
      message.success(`Expense "${values.description}" updated successfully!`);  // Show success toast with description for update
    } else {
      dispatch(addExpense(newExpense));
      message.success(`Expense "${values.description}" added successfully!`);  // Show success toast with description for adding expense
    }

    onSubmit();  // Close the modal or any other action
  };

  const handleSearch = (searchText) => {
    if (searchText && searchText.length > 0 && /^[a-zA-Z]+/.test(searchText)) { // Ensure first character is a letter
      setFilteredSuggestions(
        suggestions.filter((desc) =>
          desc.toLowerCase().startsWith(searchText.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]); // Clear suggestions when searchText is empty or doesn't start with an alphabet
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="expense-form"
      validateTrigger="onFinish"
      requiredMark={false}
    >
      <Form.Item
        label={<label htmlFor="description">Description</label>}
        name="description"
        rules={[{ required: true, message: 'Please enter a description!' }]}
      >
        <AutoComplete
          id="description"
          options={filteredSuggestions.map((desc) => ({ value: desc }))}
          placeholder="Enter description"
          onSearch={handleSearch}
          allowClear
          aria-autocomplete="list"
          aria-expanded="false"
        />
      </Form.Item>

      <Form.Item
        label={<label htmlFor="amount">Amount</label>}
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
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter amount"
          style={{ width: '100%' }}
          aria-required="true"
        />
      </Form.Item>

      <Form.Item
        label={<label htmlFor="date">Date</label>}
        name="date"
        rules={[{ required: true, message: 'Please select a date!' }]}
      >
        <DatePicker id="date" style={{ width: '100%' }} aria-required="true" />
      </Form.Item>

      <Form.Item
        label={<label htmlFor="category">Category</label>}
        name="category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select
          id="category"
          placeholder="Select a category"
          allowClear
          aria-required="true"
        >
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
    aria-label="Submit expense form"
  >
    Submit
  </Button>
</Form.Item>


    </Form>
  );
}
