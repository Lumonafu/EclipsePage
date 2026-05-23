const light = document.getElementById("light");
const parallax = document.getElementById("parallax");
const shadow = document.getElementById("shadow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    light.style.left = mouseX + "px";
    light.style.top = mouseY + "px";

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = (mouseX - centerX) / 40;
    const offsetY = (mouseY - centerY) / 40;

    parallax.style.transform =
        `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;

    shadow.style.left = e.clientX + "px";
    shadow.style.top = e.clientY + "px";
});