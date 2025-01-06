let cartDefaultContainer = document.getElementById('cart-default-container');
let cartContainer = document.getElementById('cart-container');

let itemList = document.getElementById('item-list');
let orderSummary = document.getElementById('order-sum');

document.getElementById('prod-quant').textContent=JSON.parse(localStorage.getItem('cartcount'));
let amount = Number(document.getElementById('amount').textContent);

let cartArr = JSON.parse(localStorage.getItem('cart'));
let products = JSON.parse(localStorage.getItem('products'));

//displaying containers
if(cartArr){
    cartDefaultContainer.style.display='none';
    cartContainer.style.setProperty('display','flex','important');
}else{
    cartDefaultContainer.style.display='block';
    cartContainer.style.setProperty('display','none','important');
}

//map the array
let cartData=cartArr.map(function(obj){
    //we need to get the details of the product in products array by using product_id 
    let index=products.findIndex((data)=>data.id==obj.product_id);
    let product=products[index];

    amount+=obj.quantity*product.price;
    document.getElementById('amount').textContent=`$${Math.round(amount)}`;
    document.getElementById('total-amount').textContent=`$${Math.round(amount+30)}`;
    return (`
        <div class='productData'>
            <img src='${product.image}' alt='${product.title}'>
            <h5>${product.title}</h5>
            <div>
                <div class='buttons'>
                    <button>-</button>
                    <p>${obj.quantity}</p>
                    <button>+</button>
                </div>
                <p class='fw-bold fs-5 pt-4 ps-5'>${obj.quantity} x $${product.price}</p>
            </div>
        </div>
        `)
})
itemList.innerHTML=cartData.join(' ');


