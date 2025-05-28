import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, updateDeliveryOption, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

// INTEGRATION TEST

//2 things to test:
    // 1.How the page looks
    // 2. How the page behaves
describe('test suite: renderOrderSummary', () =>{

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    //l18 updating tests to load products form backend
    // Jasmine feature - done() f - when we add done parameter beforeAll
    // will not automatically go to the next step
    // it will only go to next step when we call this done f
    beforeAll(async () =>{
        //18j. zamjenjuje 
        await loadProductsFetch();

     /*    loadProductsFetch().then(() =>{
            done();
        }); */
    });
       /*  loadProducts(() =>{
            // when the products load, then go further with code
            done();
        }); */

    // hook - it will run this function before each of our tests -
            // - sharing setup code - remove duplications
    beforeEach(() =>{
        /* one more thing to test - when click delete it uses the f
        removeFromCart(productId) and that f saves cart to localStorage
        and calls .setItem so
        Mock .setItem in this test
      */
        spyOn(localStorage, 'setItem');

         document.querySelector('.js-test-container')
        .innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
            <div class="js-checkout-header"</div>
        `;

        //Mock getItem /mock localStorage
        spyOn(localStorage, 'getItem').and.callFake(() =>{ 
                return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
            });
            // run these functions to test them
            loadFromStorage();

            renderOrderSummary();
    });

    //16f. - afterEach hook
    afterEach(() =>{
         //after all tests are done remove the HTML that tests created
         document.querySelector('.js-test-container')
        .innerHTML = ``;
    });

    // This test checks will renderOrderSummary display the page content
    // correctly
                    // 1.How the page looks
    it('displays the cart', () =>{
        /*   first we make and load container in js so that we don't modify
         body directly because we might have other tests also
         then we create js-order-summary which is Html element whose
        rendering we are testing*/

        //Mock getItem /mock localStorage
       
            // run these functions to test them

            // test if there are two items in cart by testing
            // are there two cart-item-container elements
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2); 

        //test if content quantity is correct
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`)
            .innerText
        ).toContain('Quantity: 2');

         expect(
            document.querySelector(`.js-product-quantity-${productId2}`)
            .innerText
        ).toContain('Quantity: 1');

        // 16g. check if product name is fine
        expect(document.querySelector(`.js-product-name-${productId1}`).
            innerText
        ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

         expect(document.querySelector(`.js-product-name-${productId2}`).
            innerText
        ).toEqual('Intermediate Size Basketball');


        // 16h. check if product prices are displayed correctly
        expect(document.querySelector(`.js-product-price-${productId1}`).
            innerText
        ).toEqual('$10.90');

         expect(document.querySelector(`.js-product-price-${productId2}`).
            innerText
        ).toEqual('$20.95');
    }); 

    // 2. How the page behaves
    // clicking delete link removes product from the page (cleanup)

    it('removes a product', () =>{
            renderOrderSummary();
            /* once we display this on the page 
            we are going to get delete link into our code 
            and click it
            -test delete link for first product in the cart */

            document.querySelector(`.js-delete-link-${productId1}`).click();

             expect(
                document.querySelectorAll('.js-cart-item-container').length
            ).toEqual(1); 
             /* more detailed test - because we removed this product from cart
             we'll test if it is removed from the page */
            
            // we expect
            expect(
                document.querySelector(`.js-cart-item-container-${productId1}`)
            ).toEqual(null);

            // check also if the second product is still on the page because
            // we didn't delete it
            expect(
                document.querySelector(`.js-cart-item-container-${productId2}`)
            ).not.toEqual(null);



            //one more thing to check - is cart array updated after deleting
            expect(cart.length).toEqual(1);
            expect(cart[0].productId).toEqual(productId2);

            // 16g. check if product name is fine
            expect(document.querySelector(`.js-product-name-${productId2}`).
                innerText
            ).toEqual('Intermediate Size Basketball');

            // 16h. check if product prices are displayed correctly
             expect(document.querySelector(`.js-product-price-${productId2}`).
                 innerText
             ).toEqual('$20.95');
            
    });

    //16j. test does input of delivery option get checked when we clik it

    it('updates delivery option', () =>{
        // dovedi del option ovdje u js i klikni ga
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();

        // ako se klikne treći delivery option bi trebao biti checked
        expect(
            document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
            ).toEqual(true);

        // vidi jel cart i dalje uredu
        expect(cart.length).toEqual(2);

        // sad kada je kliknut treći, u kartu bi trebao biti prvi product
        // productId1 sa delivery option 3
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('3');

        //provjeru jesu li su u payment summary-u pri kliku update-ale  cifre
        expect(document.querySelector('.js-payment-summary-shipping').innerText
        ).toEqual('$14.98');

        expect(document.querySelector('.js-payment-summary-total').innerText
        ).toEqual('$63.50');
    });

});