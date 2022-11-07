import createProductCard from './utils/createProductCard'
import setCart from './utils/setCart'

window.addEventListener('DOMContentLoaded', () => {
    const state = JSON.parse(sessionStorage.getItem('products'))
    const URLParams = new URLSearchParams(window.location.search)
    const idParam = URLParams.get('id')
    const actualProduct = state.products.find((product) => product.id === idParam)
    const renderProducts = ({ products }) => {
        const productsGrid = document.getElementById('products')
        const fragment = document.createDocumentFragment()
        products.slice(0, 4).forEach((product) => {
            const card = createProductCard(product)
            fragment.appendChild(card)
        })
        productsGrid.appendChild(fragment)
    }
    const renderDetails = (product, element) => {
        const detailsBanner = document.createElement('div')
        detailsBanner.className = 'grid lg:grid-cols-[repeat(2,1fr)] content-center gap-12 h-full sm:w-[80%] mx-auto'
        const detailsTemplate = document.getElementById('product-details').content
        const detailsMainImage = detailsTemplate.querySelector('.image')
        detailsMainImage.src = product.url
        const detailsAltImages = detailsTemplate.querySelectorAll('.alt-image')
        for (let i = 0; i < 4; i++) {
            if (i !== 0) {
                detailsAltImages[i].src = `${new URL(`../img/c${i + 1}.jpg`, import.meta.url).href}`
            } else {
                detailsAltImages[0].src = product.url
            }
        }
        const detailsDescription = detailsTemplate.querySelector('.description')
        detailsDescription.textContent = product.description
        const detailsName = detailsTemplate.querySelector('.name')
        detailsName.textContent = product.name
        const detailsPrice = detailsTemplate.querySelector('.price')
        detailsPrice.textContent = `$${product.price.toFixed(2)}`
        const templateClon = detailsTemplate.cloneNode(true)
        detailsBanner.appendChild(templateClon)
        element.appendChild(detailsBanner)
    }
    const detailsSection = document.getElementById('details-section')
    if (actualProduct) {
        renderDetails(actualProduct, detailsSection)
    } else {
        detailsSection.insertAdjacentHTML(
            'beforeend', `${
                idParam !== ""
                    ? `<p>The article "${idParam}" was not found.</p>`
                    : '<p>The searched article was not found.</p>'
            }`
        )
    }
    renderProducts(state)
    const altImages = document.getElementsByClassName('alt-image')
    for (let image of altImages) {
        image.addEventListener('click', (e) => {
            const mainImage = document.getElementById('main-image')
            mainImage.src = e.target.src
        })
    }

    const detailsForm = document.getElementById('details-form')
    if (detailsForm) {
        detailsForm.addEventListener('submit', (e) => {
            const updatedState = JSON.parse(sessionStorage.getItem('products'))
            e.preventDefault()
            const target = e.target
            const productSize = parseInt(target.size.value) 
            const productQuantity = parseInt(target.quantity.value) 
            const soldProduct = Object.defineProperties(actualProduct, {
                size: {
                    value: productSize,
                    writable: true,
                    enumerable: true
                },
                quantity: {
                    value: productQuantity,
                    writable: true,
                    enumerable: true
                }
            })
            const newState = Object.entries(updatedState).map(([ key, value ]) => {
                switch(true) {
                    case key === 'sales':
                        if (!(value.find((sale) => sale.id === soldProduct.id && sale.size === soldProduct.size))) {
                            return [ key, value.concat(soldProduct) ]
                        } 
                        return [ key, value.map(
                            (sale) => (sale.id !== soldProduct.id || (sale.id === soldProduct.id && sale.size !== soldProduct.size)
                                ? sale
                                : {
                                    ...sale,
                                    quantity: sale.quantity + soldProduct.quantity
                                }
                        )) ] 
                    default:
                        return [ key, value ]
                }
            })
            setCart(Object.fromEntries(newState))
            sessionStorage.setItem('products', JSON.stringify(Object.fromEntries(newState)))
            detailsForm.reset()
        })
    }
})
