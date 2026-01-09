const transactions = [
  {
    date: '2024-01-15',
    category: 'Food',
    items: [
      { name: 'Groceries', amount: 50 },
      { name: 'Restaurant', amount: 75 }
    ]
  },
  {
    date: '2024-01-16',
    category: 'Transport',
    items: [
      { name: 'Gas', amount: 40 },
      { name: 'Parking', amount: 10 }
    ]
  },
  {
    date: '2024-01-17',
    category: 'Food',
    items: [
      { name: 'Coffee', amount: 5 }
    ]
  }
];
const result = transactions.reduce((acc,curr)=>{

    if(!acc[curr.category]){
        acc[curr.category] = {total:0, count:0}

    }

    acc[curr.category].total += curr.items.reduce((sum,item)=> sum + item.amount,0);
    acc[curr.category].count += curr.items.length;
    return acc;

},{})

console.log(result);