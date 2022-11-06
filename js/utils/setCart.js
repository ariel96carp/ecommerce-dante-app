const setCart = ({ sales }) => {
    const cartLink = document.getElementById('cart-link')
    const prevCart = cartLink.querySelector('.quantity')
    if (prevCart) cartLink.removeChild(prevCart) 
    if (sales.length > 0) {
        const cartTemplate = document.getElementById('cart-quantity').content 
        const quantity = cartTemplate.querySelector('.quantity')
        quantity.textContent = sales.length
        const templateClon = cartTemplate.cloneNode(true)
        cartLink.appendChild(templateClon)
    }
}

export default setCart
