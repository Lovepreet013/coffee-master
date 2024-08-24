import Store from "./services/Store.js"
import { loadData } from "./services/Menu.js"
import Router from "./services/Router.js"

//Import the web components for usage, it is important to import web components to main script file for usage.
import { MenuPage } from "./components/MenuPage.js"
import { DetailsPage } from "./components/DetailsPage.js"
import { OrderPage } from "./components/OrderPage.js"
import { ProductItem } from "./components/ProductItem.js"
import { CartItem } from "./components/CartItem.js"


window.app = {}
app.store = Store
app.router = Router


window.addEventListener('DOMContentLoaded', async () => {
    app.router.init()
    loadData()
})

window.addEventListener('appcartchange', event => {
    const badge = document.querySelector('#badge')
    const quantity = app.store.cart.reduce((acc, item) => acc + item.quantity, 0)
    badge.textContent = quantity
    badge.hidden = quantity == 0
})