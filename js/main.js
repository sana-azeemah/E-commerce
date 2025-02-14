import headerFunc from "./header.js"
import productFunc from "./product.js"
import searchFunc from "./search.js"
(async function () {

    const products = await fetch("js/data.json") //get data
    const data = await products.json() // to json


    data ? localStorage.setItem("products", JSON.stringify(data)) : [] // json to string
    productFunc(data)
    searchFunc(data)

}
)()


const cartItem = document.querySelector(".header-cart-count")

cartItem.innerHTML = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).length
    : "0"


const modal = document.querySelector(".modal-dialog")
const modalContent = document.querySelector(".modal-dialog .modal-content")
const btnModalClose = document.querySelector(".modal-dialog .modal-close")


if (btnModalClose) {
    btnModalClose.addEventListener("click", () => {
        modal.classList.remove("show")
    })
}


if (modal) {
    document.addEventListener("click", (e) => {
        if (!e.composedPath().includes(modalContent)) {
            modal.classList.remove("show")
        }
    })
}


if (modal) {
    setTimeout(() => {
        modal.classList.add("show")
    }, 3000)
}

