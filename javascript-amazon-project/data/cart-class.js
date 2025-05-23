import { addToCart } from "./cart.js";
import { getDeliveryOption, validDeliveryOption } from "./deliveryOptions.js";


class Cart{
   cartItems = undefined;
   // = cartItems; # -> private property
   #localStorageKey; 
   // = localStorageKey = undefined

   constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
   }

   // # -> private method
    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if(!this.cartItems){
            this.cartItems = [{
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

    saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }


    addToCart(productId, selectValue){
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        })

        if(matchingItem){

            matchingItem.quantity+=selectValue;
        } else{
            this.cartItems.push({
                productId: productId,
                quantity: selectValue,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }


    removeFromCart(productId){
        const newCart = [];

        this.cartItems.forEach((cartItem) =>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        this.saveToStorage();
    }


    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });

        if(matchingItem === undefined){
            return;
        }

        if(validDeliveryOption(deliveryOptionId) === false){
            return;
        }

        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }


    updateCartQuantity(){
        let  cartQuantity = 0;
        this.cartItems.forEach((cartItem) =>{
            cartQuantity+=cartItem.quantity;
        });

        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    }

    calculateCartQuantity(){
        let  cartQuantity = 0;
        this.cartItems.forEach((cartItem) =>{
            cartQuantity+=cartItem.quantity;
        });

        return cartQuantity;
    }

     updateQuantity(productId, newQuantity){
        this.cartItems.forEach((item) =>{
            if(productId === item.productId){
                item.quantity = newQuantity;
                this.saveToStorage();
            }
        });
    }
}

const cart = new Cart('cart-oop');
const bussinessCart = new Cart('cart-bussiness');

console.log(cart);
console.log(bussinessCart);
console.log(bussinessCart instanceof Cart);

