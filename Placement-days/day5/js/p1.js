
const nested = [1, [2, [3, [4, 5]], 6], [7, 8], 9, [[10]]];

function deepFlatten(arr) {
    return arr.reduce((acc, val) => 
        Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val), []);
}

const flattened = deepFlatten(nested);
console.log(flattened);