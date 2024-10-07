# Expense Tracker

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

This project makes use of several key tools and libraries to enhance functionality and development experience. Below is a list of the most important dependencies used:

### 1. **@reduxjs/toolkit** - `^2.2.7`
   A modern, opinionated way to write Redux logic, featuring simplified configuration and usage of Redux.

### 2. **antd** - `^5.21.2`
   A popular UI component library based on React, used for creating beautiful and responsive designs quickly.

### 3. **axios** - `^1.7.7`
   A promise-based HTTP client for making requests to external APIs, used in this project for API communication.

### 4. **d3** - `^7.9.0`
   A powerful library for creating data visualizations with SVG, used in this project for building charts and graphs.

### 5. **lodash** - `^4.17.21`
   A utility library delivering performance and ease-of-use for common JavaScript functions such as manipulating arrays and objects.

### 6. **moment** - `^2.30.1`
   A date manipulation library used for handling, formatting, and displaying dates in the application.

### 7. **react** - `^18.3.1`
   The core library for building user interfaces, utilized for creating interactive components.

### 8. **react-dom** - `^18.3.1`
   The entry point to the DOM rendering functionality for React.

### 9. **react-icons** - `^5.3.0`
   A library providing popular icons from various icon sets for easy integration into the React components.

### 10. **react-redux** - `^9.1.2`
   Official bindings for integrating Redux with React, making it easier to manage state in the application.

### 11. **react-router-dom** - `^6.26.2`
   A routing library for React, used for handling navigation and URL management in the application.

### 12. **react-scripts** - `5.0.1`
   Scripts and configuration for building and running Create React App projects.

---

These are the essential libraries and tools that power this project, providing everything from state management and API handling to data visualization and routing.
