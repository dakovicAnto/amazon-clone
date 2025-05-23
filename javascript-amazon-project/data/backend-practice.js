// to send HHTP message we ll use built-in class XMLHttpRequest

// creates new HTTP message or (request) to send to the backend
const xhr = new XMLHttpRequest();

//to wait for response
// we re going to wait for response to load (comeback)
xhr.addEventListener('load',() =>{
    console.log(xhr.response);
});

// setup this request
/* 2 params:
    1. Type of HTTP mesage to send 
        GET - get some info from the backend
    
    2. Where to send this HTTP mesage (which backend comp) (URL = Uniform Resource Locator)
    */

// profa set up this (his) backend comp in advance
xhr.open('GET', 'http://supersimplebackend.dev');
// send message
xhr.send();


// we can get response backend sent us
/* there s a problem - i takes time for the request
    to travel across the internet so response will be
    unaveliable right away because .send is asynchronous code
        - so we will wait (xhr.addEventListener('load',() =>{)
    */
