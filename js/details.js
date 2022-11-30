import Timeout from 'smart-timeout'
import createProductCard from './utils/createProductCard'
import setCart from './utils/setCart'
import setStatus from './utils/setStatus'
import getData from './utils/getData'

window.addEventListener('DOMContentLoaded', async () => {
    const state = JSON.parse(localStorage.getItem('products'))
    const URLParams = new URLSearchParams(window.location.search)
    const idParam = URLParams.get('id')
    const detailsSection = document.getElementById('details-section')
    const featuredProducts = document.getElementById('products')
    const renderProducts = (container, { products }) => {
        const productsGrid = document.createElement('div')
        productsGrid.className = 'grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8'
        const fragment = document.createDocumentFragment()
        products.slice(0, 4).forEach((product) => {
            const card = createProductCard(product)
            fragment.appendChild(card)
        })
        productsGrid.appendChild(fragment)
        container.appendChild(productsGrid)
    }
    const getProductAndRender = (idParam, state, container) => {
        const requestedProduct = state.products.find((product) => product.id === idParam)
        const renderDetails = (product, container) => {
            const detailsBanner = document.createElement('div')
            const detailsTemplate = document.getElementById('product-details').content
            const detailsMainImage = detailsTemplate.querySelector('.image')
            const detailsAltImages = detailsTemplate.querySelectorAll('.alt-image')
            const detailsDescription = detailsTemplate.querySelector('.description')
            const detailsName = detailsTemplate.querySelector('.name')
            const detailsPrice = detailsTemplate.querySelector('.price')
            const showAltImagesOnClick = () => {
                const altImages = document.querySelectorAll('.alt-image')
                altImages.forEach((image) => {
                    image.addEventListener('click', (e) => {
                        const mainImage = document.getElementById('main-image')
                        mainImage.src = e.target.src
                    })
                })
            }
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
            container.appendChild(detailsBanner)
            showAltImagesOnClick()
        }
        if (requestedProduct) {
            renderDetails(requestedProduct, container)
            const detailsForm = document.getElementById('details-form')
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
                const soldProduct = Object.defineProperties(requestedProduct, {
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
                    product: requestedProduct.name, 
                    price: requestedProduct.price, 
                    quantity: productQuantity, 
                    img: requestedProduct.url
                })
                setCart(Object.fromEntries(newState))
                localStorage.setItem('products', JSON.stringify(Object.fromEntries(newState)))
                detailsForm.reset()
            })
        } 
        else {
            switch(true) {
                case idParam !== null:
                    container.insertAdjacentHTML(
                        'beforeend', `${
                            idParam !== ""
                            ? `<p>The article "${idParam}" was not found.</p>`
                            : '<p>The searched article was not found.</p>'
                        }`
                    )
                    break
                default:
                    container.insertAdjacentHTML('beforeend', '<p>No article was requested.</p>')
                }
        }
    }
    if (state.products.length > 0) {
        getProductAndRender(idParam, state, detailsSection)
        renderProducts(featuredProducts, state)
    } else {
        setStatus([ detailsSection, featuredProducts ], 'loading')
        const response = await getData('products')
        if (response.error) setStatus([ detailsSection, featuredProducts ], 'rejected')
        else {
            setStatus([ detailsSection, featuredProducts ], 'fulfilled')
            const newState = Object.entries(state).map(([ key, value ]) => {
                switch(true) {
                    case key === 'products':
                        return [ key, value.concat(...response.data) ]
                    default:
                        return [ key, value ]
                }
            })
            getProductAndRender(idParam, Object.fromEntries(newState), detailsSection)
            renderProducts(featuredProducts, Object.fromEntries(newState))
            localStorage.setItem('products', JSON.stringify(Object.fromEntries(newState)))
        }
    }
})
