const employees = [
  { name: 'John', dept: 'Engineering', salary: 80000 },
  { name: 'Alice', dept: 'Engineering', salary: 95000 },
  { name: 'Bob', dept: 'Marketing', salary: 95000 },
  { name: 'Charlie', dept: 'Engineering', salary: 95000 },
  { name: 'Diana', dept: 'Marketing', salary: 95000 },
  { name: 'Eve', dept: 'HR', salary: 70000 }
];


const filteredEmployees = employees.sort((a, b) => {
    if (a.dept < b.dept) return -1;
    if (a.dept > b.dept) return 1;
    
    if (a.salary > b.salary) return -1;
    if (a.salary < b.salary) return 1;

    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return 0; 
});

console.log(filteredEmployees);