import {cart, removeFromCart, calculateCartQuantity,
    updateQuantity, updateDeliveryOption} from "../../data/cart.js";
//to have access to products array
import {products, getProduct} from "../../data/products.js";
import { formatCurrency } from ".././utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
// Default Export - we can use it we only want to export 1 thing
// Named Export - export syntax we used all the time
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption,
  isWeekendDelivery, calculateDeliveryDate} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

//external libraries
//hello();
// Use DayJS to make choose del option feature work
//(get today's date, do calculation, display the date)
/* const today = dayjs();
const deliveryDate = today.add(7, 'days');

console.log(deliveryDate.format('dddd, MMMM D')); */

//put all the code inside the function so we could re-use it
 export function renderOrderSummary(){

  let cartSummaryHTML = '';

  //for each cartItem generete a HTML
  cart.forEach((cartItem) =>{
      // search the products array for full product details
      // this example of normalizing data technique
      const productId = cartItem.productId;
      const matchingProduct = getProduct(productId);

      // use this id to get full delivery option
      // from devilveryOptions[{}] - Normalizing data
      const deliveryOptionId = cartItem.deliveryOptionId;
      let pomocna = 0;
      // var in which we are saving option that is connected to
      // given deliveryOptionId
      // so we can use it to get delivery days and calculate
      const deliveryOption = getDeliveryOption(deliveryOptionId);
      //console.log(deliveryOption);
      // napravili smo funkciju calculateDeliveryDate(deliveryOption)
      // koja vraca formatiran dateString

      cartSummaryHTML +=
      `
      <div class="cart-item-container js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${calculateDeliveryDate(deliveryOption)[0]}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name js-product-name-${
                    matchingProduct.id}">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price js-product-price-${
                    matchingProduct.id}">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${
                    matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${
                          matchingProduct.id}">
                          ${cartItem.quantity}
                      </span>
                    </span>
                    <span class="update-quantity-link link-primary
                    js-update-quantity-link" 
                    data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input 
                    js-quantity-input-${
                      matchingProduct.id}"
                      data-product-id="${matchingProduct.id}">
                    <span class="save-quantity-link link-primary
                    js-save-quantity-link" 
                    data-product-id="${matchingProduct.id}">
                      Save
                    </span>
                    <span class="delete-quantity-link link-primary 
                    js-delete-link js-delete-link-${matchingProduct.id}"
                     data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;
  });

  //f for generating delivery opt HTML
  /* 1. Loop trough deliveryOptions
    2. For each option generate some HTML
    3. Generate the HTML together */
  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption) =>{
      
      const dateString = calculateDeliveryDate(deliveryOption)[0];

      const price = deliveryOption.priceCents;
      let priceString = '';

      if(price === 0){
        priceString = 'FREE';
      } else{
        priceString = formatCurrency(deliveryOption.priceCents) + ' -';
      };

      // we only want del inpit to be checked if this del opt id
      //  matches the deliveryOptions.id that is saved in cart

      //turnary operator = if true than isChecked is equal to that id
      // if not that it is empty which means nul which means falsy value
      // in HTML ${isChecked ? 'checked' : ''} - it means if isChecked is
      //truthy than return 'checked' else ''
      const isChecked = deliveryOption.id ===
      cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
              <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input 
                js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  $${priceString} Shipping
                </div>
              </div>
          </div>
      `
    });

    return html;
  }

  document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach((link) =>{
      link.addEventListener('click', () =>{
          const productId = link.dataset.productId;
          //update data
          removeFromCart(productId);

          //when click remove product from page
              // 1. Use the DOM to get the element to remove
              // 2. Use .remove();

         /* COMMENTED BECAUSE // 15.h -------------------
           const container = document.querySelector(
              `.js-cart-item-container-${productId}`);

          container.remove();
          -----------------------------*/

        // 15.h Improve code - instead of DOM use MVC
        // for updating the page
        renderOrderSummary();

        //update payment summary
          renderPaymentSummary();
        //update home-link quantity
        // updateCartQuantity() je sada renderCheckoutHeader(); 
         renderCheckoutHeader(); 
      });
  });


  //14.a - 14.e
  /* update home-link koji je na headeru gre koji govori ukpuan broj item-a u cart-u */
  /* Ovu funkciju mjenjamo s checkoutHeader.js ------------------------------
   (prelazimo s DOM na MVC)
   function updateCartQuantity(){
      let cartQuantity = calculateCartQuantity();
      document.querySelector('.js-return-to-home-link')
      .innerHTML = cartQuantity;
  } 
    ------------------------------------------  */

  //14f. - 14.n - Make Update interactive
  document.querySelectorAll('.js-update-quantity-link')
  .forEach((link) =>{
      link.addEventListener('click', ()=>{
          const productId = link.dataset.productId; 
          const container = document.querySelector(
              `.js-cart-item-container-${productId}`);
          
          container.classList.add('is-editing-quantity');
      });

  });

  /* get list of all elements with class .js-save-quantity-link, go trough
      that list (.foreach) and in every round of loop save the each item 
      of loop in link = element, add event listener for each link and get
      the productId which we attached to element in HTML with dataset
      attribute, then we will use that id to know for which element 
      we are going to code for */
  document.querySelectorAll('.js-save-quantity-link')
  .forEach((link) =>{
      link.addEventListener('click',() =>{
          const productId = link.dataset.productId; 
          //14.k

          handleSaveQuantity(productId);
      });

  });

  //14.n on keydown do Save
  document.querySelectorAll('.js-quantity-input')
  .forEach((input) =>{
      input.addEventListener('keydown', (event) =>{
          const productId = input.dataset.productId;
          
          if(event.key === 'Enter'){
              handleSaveQuantity(productId);
          }
      });
      
  });
  //This f is called when clicking save button or Enter on .js-quantity input
  /* productId is passed, then get the value we inputed to .js-quantity input
      in var quantityInput - use product id to know from which input to get
      value from (we attached productID to class name so every .js-input 
      has different class name)
      If that value satisfies conditions update array with data ->
      cart Array, update HTML -> .js-quantity-label which is also recognised
      with attached productId to its class name, update HTML home-link*/
  function handleSaveQuantity(productId){
      let quantityInput = parseInt(document.querySelector(`
          .js-quantity-input-${productId}`)
      .value); 

      if(quantityInput >=0 && quantityInput < 1000){
          // update the cart Array with new data for that inputId
          updateQuantity(productId, quantityInput);

          //update HTML quantity label
           document.querySelector(`.js-quantity-label-${productId}`)
          .innerHTML = quantityInput.toString();

          /* update home-link koji je na headeru gre koji
          govori ukpuan broj item-a u cart-u */
          //updateCartQuantity();
          renderCheckoutHeader(); //nista DOM direktno samo MVC
          renderPaymentSummary();
          // ukloni vidljivost inputa i save gumba, vrati vidljivost update gumba
          const container = document.querySelector(
              `.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');
      }
  }
  //------------------------------

  //add eventListeners to delivery-option-input
  document.querySelectorAll(`.js-delivery-option`)
  .forEach((element) =>{
      element.addEventListener('click', () =>{
        // use data attributes to attach productId and deliveryOptionId
        // so we can get these values in function
        const productId = element.dataset.productId;
        const deliveryOptionId = element.dataset.deliveryOptionId;

        updateDeliveryOption(productId, deliveryOptionId);
        //re run all the code so all the updates we made
        // will be updated on the page, this way we avoid making DOM
        // for each element we want to update one-by-one
        renderOrderSummary();
        //update payment summary
        renderPaymentSummary();
        
      });
  });

}
