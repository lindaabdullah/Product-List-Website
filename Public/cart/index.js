const {name} = JSON.parse(atob(document.cookie.split('.')[1]));

function loadCart() {

    const arr = window.localStorage.getItem(name);
    const json = JSON.parse(arr);
    const list = document.getElementById("cartList");
    for(const j of json) {
        const li = document.createElement("li");
        
        const p1 = document.createElement("p");
        p1.innerText = j.title;
        
        const img = document.createElement("img");
        img.src = j.img;
        
        const p3 = document.createElement("p");
        p3.innerText = j.price;
        
        li.appendChild(p1);
        li.appendChild(img);
        li.appendChild(p3);

        list.appendChild(li);
    }
}
loadCart();