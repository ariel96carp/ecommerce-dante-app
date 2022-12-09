import createProductCard from './utils/createProductCard'
import setPaginate from './utils/setPaginate'
import setStatus from './utils/setStatus'
import getData from './utils/getData'
import updateState from './utils/updateState'
import setEmailSubmission from './utils/setEmailSubmission'

window.addEventListener('DOMContentLoaded', async () => {
    const state = JSON.parse(localStorage.getItem('ecommerce'))
    const featuredProducts = document.getElementById('featured-products')
    let activePage = 1
    const renderProducts = (container, { products }) => {
        const buttonsTemplate = document.getElementById('buttons-container').content
        const buttonsClon = buttonsTemplate.cloneNode(true)
        const fragment = document.createDocumentFragment()
        const productsGrid = document.createElement('div')
        productsGrid.className = 'grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8 mb-8 md:mb-12'
        productsGrid.id = 'data-grid'
        products.slice(0, products.length / 2).forEach((product) => {
            const card = createProductCard(product)
            fragment.appendChild(card)
        }) 
        productsGrid.appendChild(fragment)
        container.appendChild(productsGrid)
        container.appendChild(buttonsClon)
    }
    if (state.products.length > 0) {
        renderProducts(featuredProducts, state)
        setPaginate(activePage, state.products, createProductCard)
    } else {
        setStatus([ featuredProducts ], 'loading')
        const response = await getData('products')
        if (response.error) setStatus([ featuredProducts ], 'rejected')
        else {
            setStatus([ featuredProducts ], 'fulfilled')
            const newState = Object.entries(state).map(([ key, value ]) => {
                switch(true) {
                    case key === 'products':
                        return [ key, value.concat(...response.data) ]
                    default:
                        return [ key, value ]
                }
            })
            renderProducts(featuredProducts, Object.fromEntries(newState))
            setPaginate(activePage, Object.fromEntries(newState).products, createProductCard)
            updateState(Object.fromEntries(newState))
        }
    }
    setEmailSubmission()
})
