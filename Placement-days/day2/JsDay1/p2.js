const orders = [
  {
    orderId: 'A1',
    customer: { name: 'John', location: { city: 'NYC', country: 'USA' } },
    items: [
      { product: 'Laptop', quantity: 1, price: 999 },
      { product: 'Mouse', quantity: 2, price: 25 }
    ]
  },
  {
    orderId: 'A2',
    customer: { name: 'Jane', location: { city: 'LA', country: 'USA' } },
    items: [
      { product: 'Keyboard', quantity: 1, price: 75 }
    ]
  }
];


const result = orders.map((o)=>{

    customName = o?.customer?.name;
    cityName = o?.customer?.location?.city;

    let total = 0
    o?.items.map((i)=>{
        total+=i.price;
    })




    return {orderId: o.orderId, name: customName, city: cityName, totalAmount: total}
})

console.log(result);