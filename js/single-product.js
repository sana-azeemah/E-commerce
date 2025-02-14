import { product3 } from "./glide.js"
import { thumbsActiveFunc } from "./single-product/thumbsActive.js"
import zoomFunc from "./single-product/zoom.js"
import colorsFunc from "./single-product/colors.js"
import valuesFunc from "./single-product/values.js"
import tabsFunc from "./single-product/tabs.js"
import commentsfunc from "./single-product/comments.js"

const productId = localStorage.getItem("productId")
    ? JSON.parse(localStorage.getItem("productId"))
    : localStorage.setItem("productId", JSON.stringify(1))

const products = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : localStorage.setItem("products", JSON.stringify([]))

const findProduct = products.find((item) => item.id === Number(productId))

const productTitle = document.querySelector(".product-title")
productTitle.innerHTML = findProduct.name

const productOldPrice = document.querySelector(".old-price")
productOldPrice.innerHTML = `$${findProduct.price.oldPrice.toFixed(2)}`

const productNewPrice = document.querySelector(".new-price")
productNewPrice.innerHTML = `$${findProduct.price.newPrice.toFixed(2)}`


const singleImage = document.getElementById("single-image")
singleImage.src = findProduct.img.singleImage


const galleryThumbs = document.querySelector(".gallery-thumbs")
let result = ""

findProduct.img.thumbs.forEach((item) => {
    result += `
        <li class="glide__slide">
            <img src="${item}" class="img-fluid" alt="">
        </li>
    `
})

galleryThumbs.innerHTML = result

thumbsActiveFunc()
product3()

const productThumbs = document.querySelectorAll(".product-thumb .glide__slide img")
productThumbs[0].classList.add("active")

const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")) : []

const btnAddCart = document.getElementById("add-to-cart")
const quantity = document.getElementById("quantity")
const cartItem = document.querySelector(".header-cart-count")

const findCart = cart.find((item) => item.id === findProduct.id)

if (findCart) {
    btnAddCart.setAttribute("disabled", "disabled")
    btnAddCart.style.opacity = 0.4
    btnAddCart.style.cursor = "no-drop"
} else {
    btnAddCart.addEventListener("click", function () {
        cart.push({ ...findProduct, quantity: Number(quantity.value) })
        btnAddCart.setAttribute("disabled", "disabled")
        btnAddCart.style.opacity = 0.4
        btnAddCart.style.cursor = "no-drop"
        localStorage.setItem("cart", JSON.stringify(cart))
        cartItem.innerHTML = cart.length
    })
}
