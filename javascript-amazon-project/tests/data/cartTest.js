import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

// test each condition of an if-statement
describe('test suite: addToCart', () =>{

    // 16e.
    beforeEach(() =>{
        // test saving new cart state to storage
        //mock .setItem 
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to the cart', () =>{
        
        //mock only lasts for one test
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            //this f is what we want getItem to do 
            // to setup the test we want to put product into the
            //cart in begining and then we are going to add same product
            //in cart
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1' 
            }]);
        });
        // when we reload the cart this is gonna now be empty array
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.length).toEqual(1);
        // this method check how many times
        // mocked .setItems was called in code above
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        // tests can have multiple expectations and it will only
        // pass if all expectations pass
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //test Quantity
        expect(cart[0].quantity).toEqual(2);


        //16d. - check if localStorage.setItem() recived the correct values
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }]));

    });

     it('adds a new product to the cart', () =>{
        //create first Mock
        // 1.param - Object we want to Mock
        // 2.param - Method we want to Mock

        spyOn(localStorage, 'getItem').and.callFake(() =>{
            //this f is what we want getItem to do - return empty array
            return JSON.stringify([]);
        });
        // when we reload the cart this is gonna now be empty array
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.length).toEqual(1);
        // this method check how many times
        // mocked .setItems was called in code above
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        // tests can have multiple expectations and it will only
        // pass if all expectations pass
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //test Quantity
        expect(cart[0].quantity).toEqual(1);

         //16c. - check if localStorage.setItem() recived the correct values
         expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]));
        
    });
});

// 16i. 
describe('test suite: removeFromCart', () =>{

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';


    beforeEach(() =>{
        //Mock getItem /mock localStorage
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1' 
            },
            {
                productId: productId2,
                quantity: 2,
                deliveryOptionId: '1' 
            }]);
        });

        loadFromStorage();
    });

    it('remove a productId that is in the cart', () =>{
        expect(cart.length).toEqual(2);
        removeFromCart(productId1);
        //check if cart looks correct
        expect(cart.length).toEqual(1);
        //was called once
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        // and with correct values
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            JSON.stringify([{
                productId: productId2,
                quantity: 2,
                deliveryOptionId: '1' 
            }]));
    });

    // does nothing
    it('it does nothing if a productId is NOT in the cart', () =>{
        expect(cart.length).toEqual(2);
        removeFromCart(productId3);
        expect(cart.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            },
        {
                productId: productId2,
                quantity: 2,
                deliveryOptionId: '1' 
        }]));

    });
});


// 16k.
describe('test suite: updateDeliveryOption', () =>{

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

    beforeEach(() =>{ //Mock getItem /mock localStorage
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1' 
            }]);
        });

        loadFromStorage();
    });

    it('updatesDeliveryOption ',() =>{

        // dovedi del option ovdje u js i klikni ga
        updateDeliveryOption(productId1, '3');

        // vidi jel cart i dalje uredu
        expect(cart.length).toEqual(1);

        // sad kada je kliknut treći, u kartu bi trebao biti prvi product
        // productId1 sa delivery option 3
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('3');

        //was .setItem called once
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        // and with correct values
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '3' 
            }]));
        
    });

    // 16l. 
    it('edge - it does nothing if a productId is NOT in the cart', () =>{
        updateDeliveryOption(productId3, '3');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    });

    it('edge - it does nothing if a deliveryOption doesnt exist', () =>{
        updateDeliveryOption(productId1, '5');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});