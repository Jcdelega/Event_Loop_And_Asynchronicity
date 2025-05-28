const orderList = document.querySelector('#orderList');
const addOrderBtn = document.querySelectorAll('.addOrderBtn');
const preparationTimes = {
    "Coffee": 15,
    "Croissant": 20,
    "Bagel": 21,
    "Panini": 23,
    "Caesar Salad": 17,
    "Smoothie": 13,
    "Sandwich": 18,
    "Pastries": 19,
    "Water Glass": 3
};



let orderId = 1; 
console.log(addOrderBtn[0].value);
console.log(addOrderBtn.length)

addOrderBtn.forEach(button=>button.addEventListener('click', () => {
    const order = { id: orderId++, item:`${button.value}`, status: 'In progress' };
    const seconds = preparationTimes[button.value] || 10;
    addOrder(order, seconds);
    processOrder(order, preparationTimes);
}));

const addOrder = (order, timeLeft)=> {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.innerHTML = `⏳ Order #${order.id} ${order.item}: ${order.status} (<span id="countdown-${order.id}">${timeLeft}</span>s)`;
    orderList.appendChild(listItem);
}

const updateOrderStatus=(order, status)=> {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `✅ Order #${order.id} ${order.item}: ${status}`;
    }
}

async function processOrder(order, times) {

    const seconds = times[order.item] || 10;
    const countdownSpan = document.querySelector(`#countdown-${order.id}`);

    let remaining = seconds;
    const interval = setInterval(() => {
        remaining--;
        if (countdownSpan) countdownSpan.textContent = remaining;
    }, 1000);

    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    clearInterval(interval);

    updateOrderStatus(order, 'Done');
}