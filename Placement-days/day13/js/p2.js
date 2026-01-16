
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj; 
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  const clone = Array.isArray(obj) ? [] : {}; 
  hash.set(obj, clone); 

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}

const obj = {
  name: 'John',
  address: {
    city: 'NYC',
    coords: { lat: 40, lng: -74 }
  },
  hobbies: ['reading', 'gaming']
};
obj.self = obj; 

const clonedObj = deepClone(obj);
console.log(clonedObj);
console.log(clonedObj.self === clonedObj);