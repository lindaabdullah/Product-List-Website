// console.log(decoded);

let currentProductID = 0;

let deleteMode = false;

let hide = false;

const session = [];

async function Addproduct () {
    const arr = [];
    const inputName = window.prompt("Enter name of your product");
    const imageLink = window.prompt("Enter image link of your product");
    const price = window.prompt("Enter price of your product");
    const description = window.prompt("Enter description of your product");
    const rate = window.prompt("Enter rating of your product");
    
    currentProductID++;

    const prod = {
        id: currentProductID,
        title: inputName,
        image: imageLink,
        price: parseFloat(price),
        description: description,
        rating: parseFloat(rate)
    }
    arr.push(prod);

    await fetch("/api/addPosts", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(arr)
    })
    console.log(arr);
    displayProducts(arr);
}

async function addToCart (e) {

    const parent = e.target.parentNode;
    const id = parent.id;
    console.log(id);
    const name = document.cookie.match(/(?<=loginCookie=).*/)[0];
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
    for (const s of session){
        if(s.name == name){
            window.localStorage.setItem(name, JSON.stringify(s.product));
        }
    }
}

function displayProducts (json) {
    for (j of json){

        const productContainer = document.createElement("div");
        productContainer.id = currentProductID;
        
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
                this.parentNode.remove(); 
            }
        });
        
        productContainer.id = currentProductID;

        const product = document.createElement("div");
        
        const elementImg = document.createElement("img"); 
        
        const productName = document.createElement("p");
        
        const pPrice = document.createElement("p");

        const pRating = document.createElement("p");

        pRating.className = "rating";
        pRating.innerText = `\(${j['rating']}\)`;

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

// display all products stored in db
async function loadProducts() {
    // currentProductID = document.getElementById("productList").lastElementChild.innerText;
    const allres = await fetch("/api/getAll");
    
    if(allres.status == 403){
        window.location.href = "/error.html";
    }
    else {
        const json = await allres.json();
        displayProducts(json);
        console.log(currentProductID);
    }
}

document.getElementById("loadProducts").addEventListener("click", async function (e) {
    
        if (hide == true) {
            e.target.style.display = "none";
        }
        else {
            hide = true;
        
            const res = await fetch('https://fakestoreapi.com/products');
            const result = await res.json();
            const arr = [];
            
            for (const x of result) {
                const {id, title, price, description, image, rating} = x;
                const {rate} = rating;
                const json = {
                    id,
                    title,
                    price,
                    description,
                    image,
                    rating
                };
                arr.push(json);
            }
    
            const addReq = await fetch('/api/addPosts', {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(arr)
            });
            const response = await addReq.json();
            displayProducts(arr);
            console.log(response);
        }
    
});

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

