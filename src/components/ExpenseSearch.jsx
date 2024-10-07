import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { updateSearchParams } from '../actions/searchActions';
import debounce from 'lodash.debounce';

const { Search } = Input;

export default function ExpenseSearch({ onSearch }) {  // Using a callback to send search params to parent
  const [query, setQuery] = useState('');

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchText) => {
      const searchParams = parseQuery(searchText);
      onSearch(searchParams); 
    }, 500),  
    [onSearch]
  );

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);
    debouncedSearch(searchText);  // Trigger debounced search
  };

  // Function to parse the input and separate description and amount
  const parseQuery = (input) => {
    const searchParams = {
      description: '',
      amount: '',
    };

    const terms = input.split(' ');

    terms.forEach(term => {
      // Check if the term is numeric (for amount)
      if (!isNaN(term)) {
        searchParams.amount = parseFloat(term);
      } else {
        // Treat remaining terms as description
        searchParams.description += ` ${term}`.trim(); // Ensure there's no extra space
      }
    });

    return searchParams;
  };

  return (
    <Search
      placeholder="Search" 
      value={query}
      onChange={handleSearchChange}
      allowClear
    />
  );
}
