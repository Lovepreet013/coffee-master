export class MenuPage extends HTMLElement{
    constructor(){
        super()

        this.root =  this.attachShadow({mode : 'open'})

        const style = document.createElement('style')
        this.root.appendChild(style)

        async function loadCSS(){
            const result = await fetch("/components/MenuPage.css")
            const css = await result.text()
            style.textContent = css
        }
        loadCSS()
    }

    //when the component is attached to the DOM
    connectedCallback(){
        const template = document.getElementById("menu-page-template")
        const content = template.content.cloneNode(true)
        console.log(this.root) //this.root is <menu-page></menu-page> i.e. our created custom tag
        this.root.appendChild(content)

        window.addEventListener('appmenuchange', () => {
            this.render()
        })
        this.render()
    }

    render(){
        const menu = this.root.querySelector("#menu")
        // console.log(this.root)
        if(app.store.menu){
            menu.innerHTML = ''
            for(let category of app.store.menu){
                const liCategory = document.createElement("li")
                liCategory.innerHTML = `
                    <h3>${category.name}</h3>
                    <ul class="category"></ul>
                `
                menu.appendChild(liCategory)
                // console.log(menu)

                category.products.forEach(product => {
                    const item = document.createElement("product-item")
                    item.dataset.product = JSON.stringify(product)
                    liCategory.querySelector("ul").appendChild(item)
                })
            }
        }
        else{
            menu.innerHTML = `Loading....`
        }
    }
}

customElements.define("menu-page", MenuPage)