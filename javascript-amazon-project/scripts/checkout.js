import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
//import '../data/cart-class.js'; 
//import '../data/backend-practice.js';


//18i.
async function loadPage(){
    try{
        await Promise.all([
        loadProductsFetch(),
        //loadCartFetch()
    ]);
    } catch(error){
        console.log('Unexpected error. Please try again later');
    }

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}


//ASYNC AWAIT  - makes a f return a promise
// What is point od this feature? - Async lets us use Await
// await lets us wait for a promise to finish before going
// to the next line
/* async function loadPage(){
    try{
        //throw 'error1';
        await loadProductsFetch(); // lets us write async code like normal code
        // zamjenjuje
      loadProductsFetch().then(() =>{

        }) 

        //18h. umjesto loadCart()
        await loadCartFetch();

        // with AsyncAwait we can save whatever is resolved
        // inside var
        // reject lets us create an error in the future
         const value = await new Promise((reslove, reject) =>{
            // throw 'error2';
            loadCart(() =>{
                //reject('error3');
                reslove('value3');
            });
     }); 

    } catch(error){
        console.log('Unexpected error. Please try again later');
    }
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

} */

loadPage();

// feature of promises that lets us run multiple promises at the same
// time, we don't have to wait load prod to finish so we could go
// to next step which is loadCart and wait for it to finish also
/* Promise.all([
    /*
    new Promise((resolve) =>{
     loadProducts(() =>{
        resolve('value1');
    });
})  loadProductsFetch zamjenjuje ovaj kod and it helps us
    make our code lot cleaner
    // it will return promise and we can use it with Promise.all
    loadProductsFetch(),

    new Promise((reslove) =>{
         loadCart(() =>{
            reslove();
         });
    })

]).then((values) =>{
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}); */

/* // Promises - a better way to handle async code
// when we cerate promise it runs this inner f immediately
// reslove is a f which changes that
// -simillar to done()f
// -lets us control when to go to the next step
// - promises then dont just go to the next line of code,
// they create seperate line of code - a seperate thread which will
// run at the same time as initial code 
// reason Promise is designed this way is to allow JS to do multiple
// things at the same time
// this promise does the same thing as callback we had before
// promise lets us have as many steps as we want and we can use resolve 
// to wait for each step to finish before going to the next step
new Promise((resolve) =>{
    loadProducts(() =>{
        // when loadP is finished go further with code (resolve())
        resolve('value1');
    });

    //whatever we value we give to reslove it will be saved in this param
}).then((value) =>{
    // we run async code loadProducts, wait for it to finish then run
    // resolve and resolve makes it go to next step

    //inside .then if we want some code to finish (to use resolve)
    // we can return new promise
    return new Promise((reslove) =>{
         loadCart(() =>{
            reslove();
         });
    }); 

}).then(() =>{
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});

// we don't have to create f name to give it as callback to another f
// we can create just a Anonymous f - f without a name
// and again this is gonna save this f inside fun parameter in products.js
// and it will call fun after we  have loaded all the products
 */
 /* loadProducts(() =>{
    loadCart(() =>{
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    });
    
});  */



