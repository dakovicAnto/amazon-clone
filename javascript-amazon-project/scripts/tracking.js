import { getProduct, loadProductsFetch } from "../data/products.js";
import { getOrder, orders } from "../data/orders.js";
import { formatDateForOrders } from "./orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


async function loadPage(){
    await loadProductsFetch();
    renderTracking();
}

loadPage();

function renderTracking(){
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId')


    const product = getProduct(productId);
    const order = getOrder(orderId);

    const deliveryPercent = calculateDeliveryProgress(
        order.orderTime, getEstDeliveryTime(order, productId));
    const deliveryPercentInt = parseInt(deliveryPercent);

    let trackingHTML = '';
    trackingHTML = `
         <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on${formatDateForOrders(getEstDeliveryTime(order, productId))} 
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${generateTrackingProductQuantity(order, productId)}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${
        deliveryPercentInt < 50 ? 'current-status' : ''
      }">
            Preparing
          </div>
          <div class="progress-label ${
        deliveryPercentInt >= 50 && deliveryPercentInt <100 ? 'current-status' : ''
      }">
            Shipped
          </div>
          <div class="progress-label ${
        deliveryPercentInt >= 100 ? 'current-status' : ''
      }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"
          style="width:${deliveryPercent}"></div>
        </div>
      </div>
    `;

    document.querySelector('.js-main')
    .innerHTML = trackingHTML;

    // 18o.
    console.log(order);

}

function generateTrackingProductQuantity(order, productId){
    let resultQuantity = 0;

    order.products.forEach((product) => {
        if(product.productId === productId){
            resultQuantity = product.quantity;
        }
        
    });

    return resultQuantity;
}

function getEstDeliveryTime(order, productId){
    let estimatedDeliveryTime;

    order.products.forEach((product) => {
        if(product.productId === productId){
            estimatedDeliveryTime = product.estimatedDeliveryTime;
        }
        
    });

    return estimatedDeliveryTime;
}


function calculateDeliveryProgress(orderTime, deliveryTime){
    const today = dayjs();
    const orderTimeThis = dayjs(orderTime);
    const deliveryTimeThis = dayjs(deliveryTime);
    
    let percentDone;
    percentDone = ((today.diff(orderTimeThis)) /
     (deliveryTimeThis.diff(orderTimeThis)) * 100).toFixed(2);
    
    let percentDoneString = percentDone.toString() + '%';

    return percentDoneString;
}



