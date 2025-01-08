let cartDefaultContainer = document.getElementById('cart-default-container');
let cartContainer = document.getElementById('cart-container');

let itemList = document.getElementById('item-list');
let orderSummary = document.getElementById('order-sum');

let cartCount=JSON.parse(localStorage.getItem('cartcount'));
document.getElementById('prod-quant').textContent=cartCount;
let amount = Number(document.getElementById('amount').textContent);

let cartArr = JSON.parse(localStorage.getItem('cart'));.3

let products = JSON.parse(localStorage.getItem('products'));

//displaying containers
function updateContainers(){
    if(!cartArr || cartArr.length==0){
        cartDefaultContainer.style.display='block';
        cartContainer.style.setProperty('display','none','important');
    }else{
        cartDefaultContainer.style.display='none';
        cartContainer.style.setProperty('display','flex','important');
    }
}
updateContainers();

//displaying order summary
function displayOrderSummary(){
    let cartData=cartArr.map(function(obj){
        //we need to get the details of the product in products array by using product_id 
        let index=products.findIndex((data)=>data.id==obj.product_id);
        let product=products[index];
    
        amount+=obj.quantity*product.price;
        document.getElementById('amount').textContent=`$${Math.round(amount)}`;
        document.getElementById('total-amount').textContent=`$${Math.round(amount+30)}`;
    })
}
displayOrderSummary();

//displaying data in cart
function displayCartData(){
    //map the array
    let cartData=cartArr.map(function(obj){
    //we need to get the details of the product in products array by using product_id 
    let index=products.findIndex((data)=>data.id==obj.product_id);
    let product=products[index];
    return (`
        <div class='productData' id=${obj.product_id}>
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
}
displayCartData();

//Global EL for itemList container 
itemList.addEventListener('click',function(event){
    let type=event.target.textContent;
    let ele=event.target.parentNode.parentNode.parentNode;
    let index=cartArr.findIndex((obj)=>obj.product_id==ele.id);
    if(type=='+'){
        cartArr[index].quantity+=1;
        cartCount++;
    }else if(type=='-'){
        let value=cartArr[index].quantity-1;
        cartCount--;
        if(value>0){
            cartArr[index].quantity=value;
        }else{
            cartArr.splice(index,1);
        }
    }
    localStorage.setItem('cart',JSON.stringify(cartArr));
    displayCartData();
    updateOrderSummary(cartArr);
    updateCartCount(cartCount);
})

//To Update Order Summary
function updateOrderSummary(cart){ 
    let sum=0;
    cart.map(function(obj){
        //we need to get the details of the product in products array by using product_id 
        let index=products.findIndex((data)=>data.id==obj.product_id);
        let product=products[index];
        sum+=obj.quantity*product.price;
    })
    document.getElementById('amount').textContent=`$${Math.round(sum)}`;
    document.getElementById('total-amount').textContent=`$${Math.round(sum+30)}`;
}

//To update Cart count number
function updateCartCount(count){
    localStorage.setItem('cartcount',JSON.stringify(count));
    document.getElementById('cart-quantity').textContent=count;
    document.getElementById('prod-quant').textContent=count;
    updateContainers();
}