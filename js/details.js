import Timeout from 'smart-timeout'
import createProductCard from './utils/createProductCard'
import setCart from './utils/setCart'

window.addEventListener('DOMContentLoaded', () => {
    const state = JSON.parse(localStorage.getItem('products'))
    const URLParams = new URLSearchParams(window.location.search)
    const idParam = URLParams.get('id')
    const actualProduct = state.products.find((product) => product.id === idParam)
    const detailsSection = document.getElementById('details-section')
    const altImages = document.getElementsByClassName('alt-image')
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
        const detailsTemplate = document.getElementById('product-details').content
        const detailsMainImage = detailsTemplate.querySelector('.image')
        const detailsAltImages = detailsTemplate.querySelectorAll('.alt-image')
        const detailsDescription = detailsTemplate.querySelector('.description')
        const detailsName = detailsTemplate.querySelector('.name')
        const detailsPrice = detailsTemplate.querySelector('.price')
        detailsBanner.className = 'grid lg:grid-cols-[repeat(2,1fr)] content-center gap-12 h-full sm:w-[80%] mx-auto'
        detailsMainImage.src = product.url
        for (let i = 0; i < 4; i++) {
            if (i !== 0) {
                detailsAltImages[i].src = `${new URL(`../img/c${i + 1}.jpg`, import.meta.url).href}`
            } else {
                detailsAltImages[0].src = product.url
            }
            detailsAltImages[i].loading = 'lazy'
        }
        detailsDescription.textContent = product.description
        detailsName.textContent = product.name
        detailsPrice.textContent = `$${product.price.toFixed(2)}`
        const templateClon = detailsTemplate.cloneNode(true)
        detailsBanner.appendChild(templateClon)
        element.appendChild(detailsBanner)
    }
    if (actualProduct) renderDetails(actualProduct, detailsSection)
    else {
        switch(true) {
            case idParam !== null:
                detailsSection.insertAdjacentHTML(
                    'beforeend', `${
                        idParam !== ""
                        ? `<p>The article "${idParam}" was not found.</p>`
                        : '<p>The searched article was not found.</p>'
                    }`
                )
                break
            default:
                detailsSection.insertAdjacentHTML('beforeend', '<p>No article was requested.</p>')
            }
    }
    renderProducts(state)
    for (let image of altImages) {
        image.addEventListener('click', (e) => {
            const mainImage = document.getElementById('main-image')
            mainImage.src = e.target.src
        })
    }
    const detailsForm = document.getElementById('details-form')
    if (detailsForm) {
        detailsForm.addEventListener('submit', (e) => {
            const updatedState = JSON.parse(localStorage.getItem('products'))
            e.preventDefault()
            const target = e.target
            const productSize = parseInt(target.size.value) 
            const productQuantity = parseInt(target.quantity.value) 
            const createBuyAlert = ({ product, price, quantity, img }) => {
                if (Timeout.exists('alertTimeout')) Timeout.clear('alertTimeout')
                const mainSection = document.querySelector('main')
                const alertTemplate = document.getElementById('buy-alert').content
                const productName = alertTemplate.querySelector('.name')
                const subtotal = alertTemplate.querySelector('.subtotal')
                const productImage = alertTemplate.querySelector('.image')
                productName.textContent = product
                subtotal.textContent = `$${(price * quantity).toFixed(2)}`
                productImage.src = img
                const alertClon = alertTemplate.cloneNode(true)
                const prevAlert = document.getElementById('alert')
                if (prevAlert) mainSection.removeChild(prevAlert)
                mainSection.appendChild(alertClon)
                Timeout.create('alertTimeout', () => {
                    mainSection.removeChild(mainSection.lastElementChild)
                }, 4000)
            }
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
            createBuyAlert({ 
                product: actualProduct.name, 
                price: actualProduct.price, 
                quantity: productQuantity, 
                img: actualProduct.url
            })
            setCart(Object.fromEntries(newState))
            localStorage.setItem('products', JSON.stringify(Object.fromEntries(newState)))
            detailsForm.reset()
        })
    }
})
