# Expense Tracker

A demo of the app can be viewed here: [Expense Tracker Demo](https://drive.google.com/file/d/1W5GBrsKdcS-Tnjqwl3-fAw3aSsKklVHl/view?usp=sharing)

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version >= 14.x.x recommended)  
- **npm** (comes with Node.js)
- **IDE e.g. VSCode**

## Installation Steps

 **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/geggenpress4231/expensetracker.git
   cd frontend
   ```
### Install Dependencies

Install the project dependencies by running:

```bash
npm install
```
### Setup JSON Server

This project uses **JSON Server** to mock a RESTful API. Follow these steps to set up JSON Server:

### Open a terminal window

```bash
json-server --watch db.json --port 5000
```
### In a separate terminal window
```bash
npm start
```
## Tools and Packages Used

This project makes use of several key tools and libraries to enhance functionality and development experience. Below is a list of the most important dependencies and how they are used in this application:

### 1. **@reduxjs/toolkit** - `^2.2.7`
   Used for efficient state management in the application. It simplifies Redux logic for managing global state, especially for handling expenses and filtering operations throughout the app.

### 2. **antd** - `^5.21.2`
   Utilized as the primary UI component library for the project. It provides pre-built components such as buttons, forms, modals, and tables, ensuring a responsive and visually consistent interface across the application.

### 3. **axios** - `^1.7.7`
   Used for handling HTTP requests in the app. Axios is responsible for making API calls to the **JSON Server** to fetch, add, update, and delete expense data, facilitating seamless interaction with the backend.

### 4. **d3** - `^7.9.0`
   Used for building custom data visualizations such as bar and pie charts. D3 powers the dynamic rendering of charts that visually represent the expense data, providing users with clear insights into their spending habits.

### 5. **lodash** - `^4.17.21`
   A utility library used throughout the app to perform data manipulation tasks such as filtering, sorting, and aggregating expense data efficiently. It has been used to implement debouncing for Search Component.

### 6. **moment** - `^2.30.1`
   Moment is used for handling date formatting and manipulation, especially for filtering expenses by date range. It helps in comparing, formatting, and displaying dates in a user-friendly manner.

### 7. **react-dom** - `^18.3.1`
   This package is used to connect React components to the browser's DOM, allowing the UI to be rendered and updated efficiently in response to user actions.

### 8. **react-icons** - `^5.3.0`
   Provides a wide range of icons used throughout the application, such as edit and delete buttons in the expense list. It helps enhance the UI by providing consistent and easily recognizable visual elements.

### 9. **react-router-dom** - `^6.26.2`
   Manages client-side routing in the app. It allows seamless navigation between different pages, such as the Expense List and Summary pages, without reloading the entire app.

---


## Assumptions and Instructions for Optional Features

### 1. **Date Range Picker**
   - Assumption: The user will be able to pick both start and end dates. If no date range is selected, all expenses will be displayed by default.
   - When a date range is selected, the app filters expenses that fall within the selected range and updates both the expense list and the charts accordingly.
   - If only one date (start or end) is selected, the app assumes the user wants to see all expenses up to or starting from that date.

### 2. **Category Picker**
   - Assumption: By default, all categories are shown unless a specific category is selected.
   - The app assumes that the category picker allows the user to filter expenses by one or more categories. Selecting "All" resets the filter, showing all categories.

### 3. **Search by Description or Amount**
   - Assumption: The search functionality can be used to filter expenses by both **description** (partial or full matches) and **amount** (exact match).
   - The search bar assumes that the user input is case-insensitive for descriptions.
   - For amounts, the app expects numerical input. If the user inputs non-numeric values, no expenses will be returned.
   - The app updates the list and charts in real-time as the user types in the search bar.

### 4. **Bar Chart and Pie Chart**
   - Assumption: The charts update dynamically based on the filters applied (date range, category, search).
   - The **Bar Chart** shows the total expenses per category for the given filters, while the **Pie Chart** visualizes the percentage distribution of expenses across categories.
   - If no data matches the filters, both charts will show an empty state or zero values.

### 5. **General Instructions for Testing**
   - Ensure the **JSON Server** is running locally on [http://localhost:5000](http://localhost:5000) before testing any of the filtering or chart functionalities.
   - Test different combinations of date ranges, categories, and search queries to see the dynamic changes in the expense list and charts.
   - Try adding new expenses via the app and verify that the newly added expenses appear in both the list and the charts.

---



