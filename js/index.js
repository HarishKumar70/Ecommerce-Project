let div=document.getElementById('buttons');
let container=document.getElementById('container');

// Global Event Listener for all butons
if(div){
    div.addEventListener('click',function(event){
        fetchCategoryData(event.target.textContent);
    })
}

// Function to display data in the webpage
function displayData(arr){
    let contData=arr.map(function(obj){
        return(`
            <div class='contCard' id=${obj.id}>
                <img src='${obj.image}' alt='${obj.title}'>
                <div class='content'>
                    <h4>${obj.title}</h4>
                    <p class='description'>${obj.description}</p>
                </div>
                <hr>
                <p class='price'>$ ${obj.price}</p>
                <hr>
                <button class='contButtons'>Details</button>
                <button id=${obj.id} class='contButtons'>Add to Cart</button>
            </div>
            `)
    })
    if(container){
        container.innerHTML=contData.join(' ');
    }
}

// Fetching All Data
async function fetchAllData(){
    let response=await fetch('https://fakestoreapi.com/products');
    let data=await response.json();
    localStorage.setItem('products',JSON.stringify(data));
    displayData(data);
}
fetchAllData();

// Fetching Certain Category Data
async function fetchCategoryData(clickedButton){
    let response=await fetch('https://fakestoreapi.com/products');
    let data=await response.json();
    if(clickedButton=='All'){
        fetchAllData();
        return;
    }
    let filteredData=data.filter(function(obj){ 
        if(obj.category==clickedButton.toLowerCase()){
            return true;
        }
    })
    displayData(filteredData);
}

// Add to Cart
let prodContainer=document.getElementById('container');
let cartQuant=document.getElementById('cart-quantity');
let count=localStorage.getItem('cartcount') || 0; //If not present in ls then it should be by default 0 otherwise it returns null

if(prodContainer){
    prodContainer.addEventListener('click',function(event){
        if(event.target.textContent=='Add to Cart'){
            count++;
            cartQuant.textContent=count; //Updating everytime when user adds product
            localStorage.setItem('cartcount',count);
            
            //Adding that selected product id and product quantity to cart array
            let cart=JSON.parse(localStorage.getItem('cart')) || [];
            card_id=event.target.parentNode.id;

            let index=cart.findIndex((obj)=>obj.product_id==card_id);
            if(cart.length==0){
                cart.push({'product_id':card_id,'quantity':1});
            }else if(index<0){
                cart.push({'product_id':card_id,'quantity':1});
            }else{ 
                cart[index].quantity+=1;
            }
            localStorage.setItem('cart',JSON.stringify(cart));
        }
    })
}
cartQuant.textContent=count; //Updating when the page reloads

