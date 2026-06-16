const light = document.getElementById("light");
const parallax = document.getElementById("parallax");
const shadow = document.getElementById("shadow");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

const downloadBtn = document.getElementById("downloadBtn");

const platform = (navigator.platform || "").toLowerCase();
const userAgent = (navigator.userAgent || "").toLowerCase();

let downloadUrl = "";
let systemName = "";




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





if (userAgent.includes("linux")) {
    systemName = "Linux";
    downloadUrl = "https://github.com/Lumonafu/eclipseupdates/releases/download/v2.2.4/Eclipse.Launcher-setup-2.2.4.AppImage";
}
else if (platform.includes("win") || userAgent.includes("windows")) {
    systemName = "Windows";
    downloadUrl = "https://github.com/Lumonafu/eclipseupdates/releases/download/v2.2.4/Eclipse.Launcher-setup-2.2.4.exe";
}
else if (platform.includes("mac") || userAgent.includes("mac")) {
    systemName = "macOS";
    downloadUrl = "downloads/EclipseLauncher.dmg";
}
downloadBtn.textContent = `Descargar para ${systemName}`;

downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");

    a.href = downloadUrl;

    a.download = "";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
});

console.log("Platform:", navigator.platform);
console.log("UserAgent:", navigator.userAgent);

console.log(platform.includes("win"));
console.log(userAgent.includes("linux"));