const Router = {
    init : () => {
        document.querySelectorAll("a.navlink").forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault()
                // const url = event.target.href : one way of getting href
                const url = event.target.getAttribute('href')
                Router.go(url)
            })
        })

        //Event Handler for URL Changes(syncing content with forward and backward button)
        window.addEventListener('popstate', event => {
            // console.log(event)
            Router.go(event.state.route, false)
        })

        //Checking the initial route/path
        Router.go(location.pathname)
    },
    go : (route, addToHistory = true) => {
        console.log(`Going to ${route}`)

        if(addToHistory){
            history.pushState({route}, '', route)
        }

        let pageElement = null
        switch(route){
            case "/" :
                pageElement = document.createElement("menu-page")
                break

            case "/order":
                pageElement = document.createElement("order-page")
                break
            default :
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    pageElement.dataset.productId = route.substring(route.lastIndexOf("-")+1);
                }
                break;
        }

        if(pageElement){ //if pageElement is not null
            let cache = document.querySelector("main")
            // cache.children[0].remove() // when adding, remember to remove the previous page, this is one way
            cache.innerHTML = '' //other way of removing things
            cache.appendChild(pageElement)
            window.scrollX = 0
            window.scrollY = 0
        }
        else{
            //404
            document.querySelector("main").innerHTML = 'Oops, 404!' //works only if we try to go using client-side
        }
    },
}

export default Router