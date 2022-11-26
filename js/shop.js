import createProductCard from './utils/createProductCard'
import setPaginate from './utils/setPaginate'

window.addEventListener('DOMContentLoaded', () => {
    const products = JSON.parse(localStorage.getItem('products')).products
    const featuredProducts = document.getElementById('featured-products')
    let activePage = 1
    const renderProducts = (element) => {
        const fragment = document.createDocumentFragment()
        products.slice(0, products.length / 2).forEach((product) => {
            const card = createProductCard(product)
            fragment.appendChild(card)
        }) 
        element.appendChild(fragment)
    }
    setPaginate(activePage, products, createProductCard, featuredProducts)
    renderProducts(featuredProducts)
})
