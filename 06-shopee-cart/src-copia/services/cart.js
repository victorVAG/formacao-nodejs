async function addItem(userCart, item) {
  userCart.push(item);
}


async function calculateTotal(userCart) {
  console.log("\nShopee Cart TOTAL IS:");

  const result = userCart.reduce((total, item) => total + item.subtotal(), 0);
  console.log(`Total: ${result}`);
}


async function deleteItem(userCart, name) {
  const index = userCart.findIndex((item) => item.name === name);

  if (index !== -1) {
    userCart.splice(index, 1);
  }
}

async function removeItem(userCart, item) {
  const indexFound = userCart.findIndex((p) => p.name === item.name);


  if (indexFound == -1) {
    console.log("item não encontrado");
    return;
  }


  if (userCart[indexFound].quantity > 1) {
    userCart[indexFound].quantity -= 1;
    return;
  }


  if (userCart[indexFound].quantity == 1) {
    userCart.splice(indexFound, 1);
    return;
  }
}

async function displaycart(userCart) {
  console.log("\nShopee cart list:");
  userCart.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name} - R$ ${item.price} | ${
        item.quantity
      }x | Subtotal = ${item.subtotal()}`
    );
  });
}
async function addToWishlist(wishlist, item) {
  wishlist.push(item);
}

async function moveWishlistToCart(wishlist, cart, itemName) {
  const index = wishlist.findIndex((item) => item.name === itemName);
  if (index === -1) {
    console.log("Item não encontrado na wishlist.");
    return;
  }
  const item = wishlist[index];
  wishlist.splice(index, 1); 
  await addItem(cart, item); 
}

async function displayWishlist(wishlist) {
  console.log("\nWishlist:");
  wishlist.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - R$ ${item.price} | ${item.quantity}x`);
  });
}

export {
  addItem,
  calculateTotal,
  deleteItem,
  removeItem,
  displaycart,
  addToWishlist,
  moveWishlistToCart,
  displayWishlist,
};

