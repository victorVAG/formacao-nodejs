import * as cartService from "./services/cart.js";
import createItem from "./services/item.js";

const myCart = [];
const myWhishList = [];

console.log("Welcome to the your Shopee Cart!");

// Criar itens
const item1 = await createItem("hotwheels ferrari", 20.99, 1);
const item2 = await createItem("hotwheels lamborghini", 39.99, 3);
const item3 = await createItem("miniatura batmóvel", 59.99, 1);

// Adicionar ao carrinho
await cartService.addItem(myCart, item1);

// Adicionar à wishlist
await cartService.addToWishlist(myWhishList, item2);
await cartService.addToWishlist(myWhishList, item3);

// Mostrar wishlist
await cartService.displayWishlist(myWhishList);

// Mover item da wishlist para o carrinho
await cartService.moveWishlistToCart(myWhishList, myCart, "hotwheels lamborghini");

// Mostrar carrinho atualizado
await cartService.displaycart(myCart);

// Mostrar wishlist atualizada
await cartService.displayWishlist(myWhishList);

// Total
await cartService.calculateTotal(myCart);