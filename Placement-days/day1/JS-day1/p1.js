//  Q1: Nested Array to Categorized Object (10 mins)
// Convert a nested array of products into an object grouped by category and sorted by price within each category.


const products = [
  ['Electronics', 'Laptop', 999],
  ['Clothing', 'Shirt', 29],
  ['Electronics', 'Mouse', 25],
  ['Clothing', 'Pants', 49],
  ['Electronics', 'Keyboard', 75],
  ['Clothing', 'Jacket', 89]
];

let result={};

for(let [category, name, price] of products){
    if(!result[category]){
        result[category]=[];
    }
    result[category].push({name,price})
    

}

for(let category in result){
    result[category].sort((a,b)=> a.price-b.price);
}

console.log(result)