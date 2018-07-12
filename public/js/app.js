const myFunction = () => {
    let x = document.getElementById("myNav");
    if (x.className === "links") {
        x.className += "responsive";
    } else {
        x.className = "links";
    }
}
