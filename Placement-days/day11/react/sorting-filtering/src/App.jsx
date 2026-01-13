import { useState } from 'react'
import './App.css'

// ### Question 1: Data Table with Sorting

// **Topic Focus:** Multiple column sorting
// **Scenario:** Create a table of employees (name, department, salary, join date). Make column headers clickable to sort. Show sort indicators (↑↓). First click: ascending, second: descending, third: remove sort. Only one column sorted at a time.
// **Hidden Test:** Immutable sorting, toggling sort direction, reverting to original order

// **Mock Data:**

// ```jsx
// [
//   { id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, joinDate: '2020-03-15' },
//   { id: 2, name: 'Bob Smith', department: 'Marketing', salary: 75000, joinDate: '2021-07-22' },
//   { id: 3, name: 'Carol White', department: 'Engineering', salary: 105000, joinDate: '2019-01-10' },
//   { id: 4, name: 'David Brown', department: 'Sales', salary: 68000, joinDate: '2022-05-30' },
//   { id: 5, name: 'Eve Davis', department: 'HR', salary: 72000, joinDate: '2020-11-12' },
//   // Add 10-15 more entries
// ]

// ```

const employeesData = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, joinDate: '2020-03-15' },
  { id: 2, name: 'Bob Smith', department: 'Marketing', salary: 75000, joinDate: '2021-07-22' },
  { id: 3, name: 'Carol White', department: 'Engineering', salary: 105000, joinDate: '2019-01-10' },
  { id: 4, name: 'David Brown', department: 'Sales', salary: 68000, joinDate: '2022-05-30' },
  { id: 5, name: 'Eve Davis', department: 'HR', salary: 72000, joinDate: '2020-11-12' },
  { id: 6, name: 'Frank Wilson', department: 'Engineering', salary: 98000, joinDate: '2018-06-25' },
  { id: 7, name: 'Grace Lee', department: 'Marketing', salary: 77000, joinDate: '2021-02-14' },
  { id: 8, name: 'Hank Miller', department: 'Sales', salary: 69000, joinDate: '2019-09-05' },
  { id: 9, name: 'Ivy Taylor', department: 'HR', salary: 73000, joinDate: '2020-12-20' },
  { id: 10, name: 'Jack Anderson', department: 'Engineering', salary: 102000, joinDate: '2017-04-18' },
  { id: 11, name: 'Kathy Thomas', department: 'Marketing', salary: 76000, joinDate: '2022-01-11' },
  { id: 12, name: 'Larry Jackson', department: 'Sales', salary: 71000, joinDate: '2018-08-29' },
  { id: 13, name: 'Mona Harris', department: 'HR', salary: 74000, joinDate: '2019-03-03' },
  { id: 14, name: 'Nate Martin', department: 'Engineering', salary: 99000, joinDate: '2020-10-07' },
  { id: 15, name: 'Olivia Garcia', department: 'Marketing', salary: 78000, joinDate: '2021-05-19' },
];

function App() {

  const [employees, setEmployees] = useState(employeesData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  
  const sortByColumn = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
      key = null;
    }
    
    setSortConfig({ key, direction });
    
    if (direction) {
      const sortedEmployees = [...employees].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
      setEmployees(sortedEmployees);
    } else {
      setEmployees(employeesData);
    }
  };


  return (
    <>
      <h1>Employee Data Table with Sorting</h1>

      <table border="1">
        <thead>
          <tr>
            <th onClick={() => sortByColumn('name')}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '↑'}</th>
            <th onClick={() => sortByColumn('department')}>Department {sortConfig.key === 'department' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '↑'}</th>
            <th onClick={() => sortByColumn('salary')}>Salary {sortConfig.key === 'salary' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '↑'}</th>
            <th onClick={() => sortByColumn('joinDate')}>Join Date {sortConfig.key === 'joinDate' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '↑'}</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>{employee.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
