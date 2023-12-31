function afficherPopup() {
    let popupBackground = document.getElementById("popupBackground");
    popupBackground.classList.add("open");
}
function cacherPopup() {
    let popupBackground = document.getElementById("popupBackground");
    popupBackground.classList.remove("open");
}
function initEventPopup() {
    let partager = document.getElementById("partager");
    let popupBackground = document.getElementById("popupBackground");
    partager.addEventListener("click", () => {
        afficherPopup();
    })
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            cacherPopup();
        }
    })
}
