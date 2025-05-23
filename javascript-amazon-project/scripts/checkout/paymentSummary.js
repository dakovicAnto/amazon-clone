import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

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

          <button class="place-order-button button-primary">
            Place your order
          </button>
   `;

   document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

}