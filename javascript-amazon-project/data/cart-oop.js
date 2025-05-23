import { addToCart } from "./cart.js";
import { getDeliveryOption, validDeliveryOption } from "./deliveryOptions.js";

// convert code from procedure to OOP style
// group all the data and f in this object


 /* function for creating (Generating) multiple
  objects so we don't have to  copy paste lot of code
 use PascalCase for things that generate objects
 we' ll use parameter instead raw string for localStorage key
 because when generate different carts we want them to have
 different localStorage place to save their data seperately */
function Cart(localStorageKey){
    const cart = {
    cartItems : undefined,

    // . this - JS feature that gives us the Object that contains
    // this f or var (outter object) so in this case we don't
    // have to use cart.cartItem all over again
    loadFromStorage: function(){
        // cahnge to cart-oop so we don't affect our original cart
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

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
    },


    saveToStorage: function(){
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },


    addToCart: function(productId, selectValue){
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });

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
    },


    removeFromCart: function(productId){
        const newCart = [];

        this.cartItems.forEach((cartItem) =>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        this.saveToStorage();
    },


    updateDeliveryOption: function(productId, deliveryOptionId) {
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
    },


    updateCartQuantity: function(){
        let  cartQuantity = 0;
        this.cartItems.forEach((cartItem) =>{
            cartQuantity+=cartItem.quantity;
        });

        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    },


    calculateCartQuantity: function(){
        let  cartQuantity = 0;
        this.cartItems.forEach((cartItem) =>{
            cartQuantity+=cartItem.quantity;
        });

        return cartQuantity;
    },


    updateQuantity(productId, newQuantity){
        this.cartItems.forEach((item) =>{
            if(productId === item.productId){
                item.quantity = newQuantity;
                this.saveToStorage();
            }
        });
    }

    };

    return cart;
}

const cart = Cart('cart-oop');
const bussinessCart = Cart('cart-bussiness');

cart.loadFromStorage();
bussinessCart.loadFromStorage();

console.log(cart);
console.log(bussinessCart);
