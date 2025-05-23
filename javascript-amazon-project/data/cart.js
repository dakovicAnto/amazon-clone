// Export - Choosing which variables can be accessed outside of this file

import { getDeliveryOption, validDeliveryOption } from "./deliveryOptions.js";

// for porpuse of easier development we are adding default values to cart list
export let cart;
loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));

//if we don't have cart in localStorage the line above will get us null
// if null then...
if(!cart){
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
    
} 
}

//
function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

/* // VAŽNO - F Koja se koristi u amazon.js,
// dok se u checkoutu koristi funkcija s istim imenom koja update-a
// return home link, dok ova ocdje update-a na home stranici  broj item-a
// u cart-u */
export function updateCartQuantity(){
    let  cartQuantity = 0;
    cart.forEach((cartItem) =>{
        cartQuantity+=cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

// samo da izracuna ukupan broj item-a u cart i da ga vrati
export function calculateCartQuantity(){
    let  cartQuantity = 0;
    cart.forEach((cartItem) =>{
        cartQuantity+=cartItem.quantity;
    });

    return cartQuantity;
}

export function addToCart(productId, selectValue){
let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    // if we find matching item in line 81 it will be object which
    // means truthy value so we can write if statement like this
    if(matchingItem){
        // we can do like this because this var - object is only a 
        // refference to a spec. place in memory, so matching item
        // and item will point to the same place and when one is changed,
        // both are changed
        matchingItem.quantity+=selectValue;
    } else{
        cart.push({
            productId: productId,
            quantity: selectValue,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}

//f for removing product from cart
    //steps
        //1. create new array
        //2. loop trough the cart
        //3. Add each product to the new array, except for this productId
export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}

//14l.
// azuriraj vrijednost u listi podataka za odredni productId čiji 
// je quantity update-an
export function updateQuantity(productId, newQuantity){
    cart.forEach((item) =>{
        if(productId === item.productId){
            item.quantity = newQuantity;
            saveToStorage();
        }
    });
}

// f for updating del optionId in cart
/* 1. Loop trough the cart and find the product
    2. Update the deliveryOptionId of the product*/
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    // 16l. if productId not in cart return
    if(matchingItem === undefined){
        return;
    }

    // 16m.
    if(validDeliveryOption(deliveryOptionId) === false){
        return;
    }


    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

//L18 just for example of showing callbacks big problem - multiple callbacks
// we are making this f - loading cart from backend

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}