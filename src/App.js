import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpensePage from './pages/ExpensePage';
import SummaryPage from './pages/SummaryPage';
import { ExpenseProvider } from './context/ExpenseContext'; 
import { ModalProvider } from './context/ModalContext'; 
import ExpenseFormModal from './components/ExpenseFormModal'; 

function App() {
  return (
    <ExpenseProvider>
      <ModalProvider>
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
      </ModalProvider>
    </ExpenseProvider>
  );
}

export default App;
