Array.prototype.myFilter=function(callback){
    let result =[];

    for(let i=0;i<this.length;i++){
       if(callback(this[i], i, this)){
         result.push(this[i])
       }
    }
    return result;
}


const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = nums.myFilter(x => x % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Phone', price: 699, inStock: false },
  { name: 'Tablet', price: 499, inStock: true }
];
const available = products.myFilter(p => p.inStock && p.price < 800);
console.log(available); // [{ name: 'Tablet', price: 499, inStock: true }]
