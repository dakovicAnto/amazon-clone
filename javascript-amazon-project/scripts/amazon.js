//14. Import - which var we wanna get from another file
// "as" - feature of Modules that makes cart var called myCart
//  in this file so naming conflicts would be removed 
import {cart, addToCart, updateCartQuantity, calculateCartQuantity } from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);


// L18 move all of this code to f so we can give it to load products
// because load products needs to wait for backend response
// and then it can run this code when it has the products ready
function renderProductsGrid(){

    //move data from HTML to JS (creating list of products)
    // make something  that closely mathches the data - Object

    // Generate HTML
    // loop trough array and create HTML for each of these objects

    //var for combining this HTML together - accumulator pattern
    let productsHTML ='';

    //18p.
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');
    let filteredProducts = products;

    // If a search exists in the URL parameters,
    // filter the products that match the search.
    if (search) {
        filteredProducts = products.filter((product) => {
        let matchingKeyword = false;
        product.keywords.forEach((keyword) =>{
            if(keyword.toLowerCase().includes(search.toLowerCase())){
                matchingKeyword = true;
            }
        });

        return matchingKeyword ||
         product.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    filteredProducts.forEach((product) =>{
        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                ${product.extraInfoHTML()}

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary
                js-add-to-cart"
                data-product-id="${product.id}">
                    Add to Cart
                </button>
                </div>
        `;
    });

    document.querySelector('.js-products-grid').
    innerHTML = productsHTML;


    //Make it interactive
    document.querySelectorAll('.js-add-to-cart').
    forEach((button) =>{
        let addedMessageTimeoutId; //13.m
        button.addEventListener('click', () =>{
            // dataset - gives us all data attributes that are attached to this button
            // data-product-name gets converted to productName
            // instead of product-name we used product-id
            const productId = button.dataset.productId;

            //13.c - 13.f -----------------------------------
            const selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
            let selectValue = parseInt(selectElement.value);
            //--------------------------------------

            //13.i - 13.k -----------------------------------
            const addedMessageElement = document.querySelector(`.js-added-to-cart-${productId}`);
            addedMessageElement.classList.add("added-to-cart-visible");

            // 13l. - 13m.
                // Check if a previous timeoutId exists. If it does,
                // we will stop it.
            if(addedMessageTimeoutId){
                clearTimeout(addedMessageTimeoutId);
            }
            const timeoutId = setTimeout(() =>{
                addedMessageElement.classList.remove("added-to-cart-visible");
            }, 2000);
            // Save the timeoutId so we can stop it later.
            addedMessageTimeoutId = timeoutId;


            //----------------------------------------------------------
            addToCart(productId, selectValue);
            updateCartQuantity();
            
    
        });
    });

    //18p.
    
    document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });


    updateCartQuantity();
};
