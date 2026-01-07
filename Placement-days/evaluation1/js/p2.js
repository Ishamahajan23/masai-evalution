const transactions = [
  { id: 1, category: 'Food', amount: 45.50, date: '2024-01-15' },
  { id: 2, category: 'Transport', amount: 20.00, date: '2024-01-16' },
  { id: 3, category: 'Food', amount: 30.75, date: '2024-01-17' },
  { id: 4, category: 'Entertainment', amount: 50.00, date: '2024-01-18' },
  { id: 5, category: 'Food', amount: 25.25, date: '2024-01-19' },
  { id: 6, category: 'Transport', amount: 15.50, date: '2024-01-20' }
];

function aggregateData(data){

    const result = data.reduce((acc, d)=>{

        if(!acc[d.category]){
            acc[d.category]={
                total: d.amount,
                count:1,
                highest: d.amount,
                lowest: d.amount
            }
        }else{
            acc[d.category].total += d.amount;
            acc[d.category].count+=1;
            if(d.amount > acc[d.category].highest){
                acc[d.category].highest= d.amount;
            }
            if(d.amount < acc[d.category].lowest){
                acc[d.category].lowest= d.amount;
            }

        }

        acc[d.category].average = Number((acc[d.category].total/ acc[d.category].count).toFixed(2));

        return acc;


    },{
       

    })
    return result;


}

const result = aggregateData(transactions);
console.log(result);

/* Expected Output:
{
  Food: {
    total: 101.50,
    average: 33.83,
    count: 3,
    highest: 45.50,
    lowest: 25.25
  },
  Transport: {
    total: 35.50,
    average: 17.75,
    count: 2,
    highest: 20.00,
    lowest: 15.50
  },
  Entertainment: {
    total: 50.00,
    average: 50.00,
    count: 1,
    highest: 50.00,
    lowest: 50.00
  }
}
*/
