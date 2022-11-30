import createProductCard from './utils/createProductCard'
import getData from './utils/getData'
import setStatus from './utils/setStatus'

window.addEventListener('DOMContentLoaded', async () => {
    const state = JSON.parse(localStorage.getItem('products'))
    const featuredProducts = document.getElementById('featured-products')
    const arrivedProducts = document.getElementById('arrived-products')
    const renderFilteredProducts = (container, filter, { products }) => {
        const productsGrid = document.createElement('div')
        const fragment = document.createDocumentFragment()
        productsGrid.className = 'grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8'
        products.filter((product) => product.type === filter).forEach((product) => {
            const card = createProductCard(product)
            fragment.appendChild(card)
        }) 
        productsGrid.appendChild(fragment)
        container.appendChild(productsGrid)
    }
    if (state.products.length > 0) {
        renderFilteredProducts(featuredProducts, 'featured', state)
        renderFilteredProducts(arrivedProducts, 'arrived', state)
    } else {
        setStatus([ featuredProducts, arrivedProducts ], 'loading')
        const response = await getData('products')
        if (response.error) setStatus([ featuredProducts, arrivedProducts ], 'rejected') 
        else {
            setStatus([ featuredProducts, arrivedProducts ], 'fulfilled')
            const newState = Object.entries(state).map(([ key, value ]) => {
                switch(true) {
                    case key === 'products':
                        return [ key, value.concat(...response.data) ]
                    default:
                        return [ key, value ]
                }
            })
            renderFilteredProducts(featuredProducts, 'featured', Object.fromEntries(newState))
            renderFilteredProducts(arrivedProducts, 'arrived', Object.fromEntries(newState))
            localStorage.setItem('products', JSON.stringify(Object.fromEntries(newState)))
        }
    }
})
