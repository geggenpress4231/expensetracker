import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { updateSearchParams } from '../actions/searchActions';
import debounce from 'lodash.debounce';

const { Search } = Input;

export default function ExpenseSearch() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchText) => {
      const searchParams = parseQuery(searchText);
      dispatch(updateSearchParams(searchParams)); // Dispatch search parameters to Redux store
    }, 500), // 500ms debounce delay
    [dispatch]
  );

  // Handle input change with debounced search
  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);
    debouncedSearch(searchText); // Trigger the debounced search
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
      }
      // Treat remaining terms as description
      else {
        if (searchParams.description) {
          searchParams.description += ` ${term}`; // Concatenate description terms
        } else {
          searchParams.description = term;
        }
      }
    });

    return searchParams;
  };

  return (
  
      <Search
        placeholder="Search"
        value={query}
        onChange={handleSearchChange} // Call debounced search on input change
        allowClear
        
      />
   
    
  );
}
