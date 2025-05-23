
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    // will add the order to the front of array
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}