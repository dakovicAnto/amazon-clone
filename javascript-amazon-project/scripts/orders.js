import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import formatCurrency from "./utils/money.js";
import { products, getProduct, loadProductsFetch } from "../data/products.js";
import { cart, calculateCartQuantity, addToCart } from "../data/cart.js";

async function loadPage(){
    await loadProductsFetch();
    renderOrders();
}

loadPage();

function renderOrders(){
    let ordersHTML = '';

    document.querySelector('.js-cart-quantity')
    .innerHTML = calculateCartQuantity();

    orders.forEach((orderItem) =>{

        ordersHTML+= `
            <div class="order-container">
            
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${formatDateForOrders(orderItem.orderTime)}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(orderItem.totalCostCents)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderItem.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                        ${generateOrderDetailGrid(orderItem.products, orderItem.id)}
                </div>
            </div>
        `;
    });

    document.querySelector('.js-orders-grid')
    .innerHTML = ordersHTML;

    function generateOrderDetailGrid(productsArray, ordersId){
        let html = '';
        productsArray.forEach((product) =>{
            const currentProduct = getProduct(product.productId)
            const currentQuantity = product.quantity;

            html+= `
                <div class="product-image-container">
                    <img src="${currentProduct.image}">
                </div>

                <div class="product-details">
                <div class="product-name">
                    ${currentProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${formatDateForOrders(product.estimatedDeliveryTime)}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button js-buy-again-button button-primary"
                data-product-id="${currentProduct.id}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                <a href="tracking.html?orderId=${ordersId}&productId=${product.productId}">
                    <button class="track-package-button
                    js-track-package-button button-secondary">
                    Track package
                    </button>
                </a>
                </div>

            `;
        });

        return html;
    }

    console.log(orders);

    // Buy it again should add product to the cart
    document.querySelectorAll('.js-buy-again-button')
    .forEach((btn) =>{
        btn.addEventListener('click', () =>{
            const productId = btn.dataset.productId;
            addToCart(productId, 1);
            document.querySelector('.js-cart-quantity')
            .innerHTML = calculateCartQuantity();

            btn.innerHTML = 'Added';
            setTimeout(() =>{
                 btn.innerHTML = `
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                    `;
            }, 1000);
        });
    });


    // Track package button should open tracking page
    document.querySelectorAll('.js-track-package-button')
    .forEach((btn) =>{
        btn.addEventListener('click', () =>{
            window.location.href = 'tracking.html';
        });
    });
};

export function formatDateForOrders(date){
    const resultDate =
        dayjs(date).format(' MMMM D') ;
        return resultDate;
    }
