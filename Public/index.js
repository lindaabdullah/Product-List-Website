// console.log(decoded);

let currentProductID = 0;

let deleteMode = false;

const session = [];

async function addToCart (e) {

    const parent = e.target.parentNode;
    const id = parent.id;
    console.log(id);
    const {name} = JSON.parse(atob(document.cookie.split('.')[1]));
    const a = document.getElementById(id);
    const arr = a.childNodes[0].childNodes[0].childNodes;

    const c = {name: name, product:[{id: id, img: arr[0].src, price: arr[2].innerText, title: arr[1].innerText}]};
    if(session.length == 0){
        session.push(c);
        console.log(session);
    }
    else {
        for (const s of session) {
            if (name == s.name){
                s.product.push(c.product[0]);
                console.log(session);
            }
        }
    }
    for(const s of session){
    if(s.name == name){
        window.localStorage.setItem(name, JSON.stringify(s.product));
        }
    }
}

async function loadProducts() {
    
    const res = await fetch('https://fakestoreapi.com/products');
    const json = await res.json();

    for (j of json){
        const productContainer = document.createElement("div");
        productContainer.id = currentProductID;
        
        //--------- button ----
        const button = document.createElement("button");
        button.innerText = "Add To Cart"; 
        button.type = "button";

        
        button.addEventListener("click", addToCart);
        
        currentProductID = j.id;
        const a = document.createElement("a");
        a.href = `product.html?id=${currentProductID}`;
        a.classList.add("product-link");
        
        a.addEventListener("click", function(event) {
            if (deleteMode == true){
                event.preventDefault(); 
                this.remove(); 
            }
        });
        
        productContainer.id = currentProductID;

        // new div
        const product = document.createElement("div");
        
        const elementImg = document.createElement("img"); 
        
        // name of product
        const productName = document.createElement("p");
        
        const pPrice = document.createElement("p");

        const pRating = document.createElement("p");

        pRating.className = "rating";
        pRating.innerText = `\(${j['rating']['rate']}\)`;

        pPrice.className = "price";
        pPrice.innerText = `\$${j['price']}`;
        
        
        elementImg.src = j['image'];
        elementImg.className = "picture";

        product.className = "product";
        
        productName.className = "productName";
        productName.innerText = j['title'];
        
        product.appendChild(elementImg);

        product.appendChild(productName);
        product.appendChild(pPrice);
        product.appendChild(pRating);

        a.appendChild(product);
        productContainer.appendChild(a);
        productContainer.appendChild(button);

        document.getElementById("productList").appendChild(productContainer);
    }
}

function Addproduct () {
    
    const inputName = window.prompt("Enter name of your product");
    const imageLink = window.prompt("Enter image link of your product");
    const price = window.prompt("Enter price of your product");
    
    currentProductID++;

    const productContainer = document.createElement("div");
    productContainer.id = currentProductID;

    const a = document.createElement("a");
    a.href = `/product.html?id=${currentProductID}`;
    
    const product = document.createElement("div");
        
    const elementImg = document.createElement("img"); 
    
    // name of product
    const productName = document.createElement("p");
    
    const pPrice = document.createElement("p");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = "Add To Cart"; 
    btn.addEventListener("click", addToCart);
    
    // const pRating = document.createElement("p");

    // pRating.className = "rating";
    // pRating.innerText = `\(${j['rating']['rate']}\)`;

    pPrice.className = "price";
    pPrice.innerText = `\$${price}`;
    
    
    elementImg.src = imageLink;
    elementImg.className = "picture";

    product.className = "product";
    
    productName.className = "productName";
    productName.innerText = inputName;
    
    product.appendChild(elementImg);

    product.appendChild(productName);
    product.appendChild(pPrice);
    // product.appendChild(pRating);

    a.appendChild(product);

    productContainer.appendChild(a);
    productContainer.appendChild(btn);

    document.getElementById("productList").appendChild(productContainer);
}
// function call
// loadProducts();


document.getElementById("deleteProduct").addEventListener("click", function() {
    deleteMode = !deleteMode;
    console.log(deleteMode);
    if (deleteMode)
        this.classList.add("red");
    else
        this.classList.remove("red");
});

document.getElementById("addProduct").addEventListener("click", Addproduct);


document.getElementById("cart").addEventListener("click", function () {
    // TODO: call api method to get the selected product and the corresponding user
    // TODO: stringyfy the result

    // window.localStorage.setItem("products", stringifiedJSON);
    window.location.href = "/cart/index.html";
    // window.localStorage.getItem("cookie");
});

