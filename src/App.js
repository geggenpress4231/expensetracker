import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';  // Import the Redux store
import ExpensePage from './pages/ExpensePage';
import SummaryPage from './pages/SummaryPage';
import ExpenseFormModal from './components/ExpenseFormModal'; // Global modal

function App() {
  return (
    <Provider store={store}> {/* Wrap the app with the Redux Provider */}
      <Router>
        <div>
          <Routes>
            <Route path="/expense-tracker" element={<ExpensePage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/" element={<ExpensePage />} />
          </Routes>
          {/* Global Expense Form Modal */}
          <ExpenseFormModal />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
