import { cart, calculateCartQuantity, clearCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
    
/* 1. Loop trough the cart
   2.For each product,
        price * quantity
   3. Add everything together */
   let productPriceCents = 0;
   let shippingPriceCents = 0;
   cart.forEach((cartItem) =>{
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

         /* Calculate shipping costs
        1. Loop through the cart
        2. Add all the shipping costs together*/

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
       
   });

   const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
   const taxCents = totalBeforeTaxCents * 0.1;
   const totalCents = totalBeforeTaxCents + taxCents;

   //15i. Improvement - calculate cart quantity for js.payment-quantity to display
   // real and live data
   let cartQuantity = calculateCartQuantity();

   const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-quantity">Items ${cartQuantity}:</div>
            <div class="payment-summary-money">$${formatCurrency(
                productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money
            js-payment-summary-shipping">$${formatCurrency(
                shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
                totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
                taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money
            js-payment-summary-total">$${formatCurrency(
                totalCents)}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
   `;

   document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

    const btnPlaceOrderElement = document.querySelector('.js-place-order');

    if(cart.length === 0){
      btnPlaceOrderElement.classList.add('place-order-disabled');
    } else {
      btnPlaceOrderElement.classList.remove('place-order-disabled');
    }
    
  
    btnPlaceOrderElement.addEventListener('click', async ()=>{
                try{
                    //when we click this button make a request to the backend
                  // to create the order
                  // we need to send some data to the backend
                  //(we need to send our cart) -> use POST request
                  //headers gives the backend more information about our request
                  // and this is needed when we are sending data to the backend
                  // this will wait fetch to get response from backend
                  // and then it will go to bext line
                  const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    // the actual data we are sending
                    body: JSON.stringify({
                      cart: cart
                    })
                  });
                  // this is alo a promise  so we can use await
                  // this will give us the data  that was attached to
                  //  the response which should be order created by backend
                  const order = await response.json();

                  // after we crate an order from backend we are gonna
                  // add it to array and save it to localStorage
                  addOrder(order);

                } catch(error){
                  console.log('Unexpected error. Try again later');
                }

                //3. After we create an order go to the orders page
                // special JS object and lets us control URL of the browser
                clearCart();
                window.location.href = 'orders.html';
                 
                //clear the cart when place order
                
              });

}