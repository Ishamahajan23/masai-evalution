const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 299 }
];


const productsContainer = document.getElementById('products');

products.forEach(product => {
  const productDiv = document.createElement('div');
  productDiv.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: $${product.price}</p>
    <button onClick="addToCart(${product.id})">Add to Cart</button>
  `;

   

  productsContainer.appendChild(productDiv);
});

function addtoQuantity(){

}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cartItems.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  updateCart();
}

const cartContainer = document.getElementById('cart');
const cartItems = [];

function updateCart() {
  cartContainer.innerHTML = '<h2>Shopping Cart</h2>';
  let subtotal = 0;

  cartItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <h4>${item.name}</h4>
      <p>Price: $${item.price} | Quantity: ${item.quantity}</p>
      <button class="remove">Remove</button>
    `;

    const removeButton = itemDiv.querySelector('.remove');
    removeButton.addEventListener('click', () => {
      const index = cartItems.findIndex(ci => ci.id === item.id);
      if (index > -1) {
        cartItems.splice(index, 1);
        updateCart();
      }
    });

    cartContainer.appendChild(itemDiv);
    subtotal += item.price * item.quantity;
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;     
    const summaryDiv = document.createElement('div');
    summaryDiv.innerHTML = `
      <h3>Summary</h3>
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Tax (10%): $${tax.toFixed(2)}</p>
      <p>Total: $${total.toFixed(2)}</p>
    `;

    cartContainer.appendChild(summaryDiv);
}


// <!-- 
// Build a mini shopping cart with add/remove functionality and total calculation.

// **Requirements:**

// - Display products with "Add to Cart" button
// - Show cart items with quantity controls (+/-)
// - Calculate and display subtotal, tax (10%), and total
// - Remove item functionality
// - Update UI reactively without full reload

// **Data:** -->