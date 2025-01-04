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
            <div class='contCard'>
                <img src='${obj.image}' alt='${obj.title}'>
                <div class='content'>
                    <h4>${obj.title}</h4>
                    <p class='description'>${obj.description}</p>
                </div>
                <hr>
                <p class='price'>$ ${obj.price}</p>
                <hr>
                <div class='contButtons'>
                    <button>Details</button>
                    <button>Add to Cart</button>
                </div>
            </div>
            `)
    })
    container.innerHTML=contData.join(' ');
}

// Fetching All Data
async function fetchAllData(){
    let response=await fetch('https://fakestoreapi.com/products');
    let data=await response.json();
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
        }
    })
}
cartQuant.textContent=count; //Updating when the page reloads
