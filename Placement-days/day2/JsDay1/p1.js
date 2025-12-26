const employees = [
  { id: 1, name: 'John', dept: 'Engineering', salary: 80000 },
  { id: 2, name: 'Jane', dept: 'Engineering', salary: 95000 },
  { id: 3, name: 'Bob', dept: 'Marketing', salary: 65000 },
  { id: 4, name: 'Alice', dept: 'Engineering', salary: 88000 },
  { id: 5, name: 'Charlie', dept: 'Marketing', salary: 72000 },
  { id: 6, name: 'Diana', dept: 'HR', salary: 70000 }
];


const result ={};
for(let {id, name, dept, salary} of employees){
    if(!result[dept]){
        result[dept]={'employees':[], 'avgSalary':0,'totalsalary':0, 'totalCount':0};
    }
    
    result[dept]['employees'].push(name);
    result[dept]['totalCount']+=1;
    
    result[dept]['totalsalary'] += salary
    
}

for(let dept in result){
    result[dept].avgSalary= result[dept].totalsalary/ result[dept].totalCount;
}

console.log(result);