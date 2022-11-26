import createProductCard from './utils/createProductCard'

window.addEventListener('DOMContentLoaded', () => {
    const state = JSON.parse(localStorage.getItem('products'))
    const featuredProducts = document.getElementById('featured-products')
    const arrivedProducts = document.getElementById('arrived-products')
    const renderProducts = (element, filter) => {
        const fragment = document.createDocumentFragment()
        state.products.filter((product) => product.type === filter).forEach((product) => {
            const card = createProductCard(product)
            fragment.appendChild(card)
        }) 
        element.appendChild(fragment)
    }
    renderProducts(featuredProducts, 'featured')
    renderProducts(arrivedProducts, 'arrived')
})
