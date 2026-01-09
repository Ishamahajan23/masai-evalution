const sales = [
  { month: 'Jan', product: 'A', amount: 100 },
  { month: 'Jan', product: 'B', amount: 150 },
  { month: 'Feb', product: 'A', amount: 120 },
  { month: 'Feb', product: 'B', amount: 180 },
  { month: 'Mar', product: 'A', amount: 110 },
  { month: 'Mar', product: 'B', amount: 160 }
];

const result  = sales.reduce((acc, curr)=>{
    if(!acc[curr.product]){
        acc[curr.product] = {total:0};
    }
    acc[curr.product][curr.month] = curr.amount;
    acc[curr.product].total += curr.amount;
    return acc;
      
},{}) 

console.log(result);