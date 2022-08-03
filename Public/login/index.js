// function logInFunction () {
//     // TO DO: get the username and password from user then check the database

// }

document.getElementById("logInButton").addEventListener("click", async function () {
    const user = document.getElementById("username").value;
    const pas = document.getElementById("password").value;
    
    const f = await fetch("/api/login", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: user, password: pas })
    });
    
    const json = await f.json();
    if(json) {
        console.log("authenticated");
        window.location.href = "/";
    }
});

document.getElementById("signUpButton").addEventListener("click", function() {
    window.location.href = "/signup";
});