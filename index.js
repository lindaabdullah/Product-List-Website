let currentProductID = 0;

let deleteMode = false;

async function loadProducts() {
    
    const res = await fetch('https://fakestoreapi.com/products');
    const json = await res.json();


    for (j of json){
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

        document.getElementById("productList").appendChild(a);
        
        // console.log(j);
    }
    // console.log(json);
}

function Addproduct () {

    const inputName = window.prompt("Enter name of your product");
    const imageLink = window.prompt("Enter image link of your product");
    const price = window.prompt("Enter price of your product");
    
    currentProductID++;
    console.log(currentProductID);

    const a = document.createElement("a");
    a.href = `/product.html?id=${currentProductID}`;
    
    // a.id = currentProductID;

    
    console.log(inputName);
    console.log(imageLink);
    console.log(price);


    const product = document.createElement("div");
        
    const elementImg = document.createElement("img"); 
    
    // name of product
    const productName = document.createElement("p");
    
    const pPrice = document.createElement("p");

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

    document.getElementById("productList").appendChild(a);
}
// function call
loadProducts();


document.getElementById("deleteProduct").addEventListener("click", function() {
    deleteMode = !deleteMode;
    console.log(deleteMode);
    if (deleteMode)
        this.classList.add("red");
    else
        this.classList.remove("red");
});

document.getElementById("addProduct").addEventListener("click", Addproduct);
