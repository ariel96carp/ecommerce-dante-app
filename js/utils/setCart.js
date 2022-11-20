const setCart = ({ sales }) => {
    const cartLinks = document.querySelectorAll('.cart-link')
    cartLinks.forEach((cartLink) => {
        const prevCart = cartLink.querySelector('.quantity')
        if (prevCart) cartLink.removeChild(prevCart) 
        if (sales.length > 0) {
            const cartTemplate = document.getElementById('cart-quantity').content 
            const quantity = cartTemplate.querySelector('.quantity')
            quantity.textContent = sales.length
            const templateClon = cartTemplate.cloneNode(true)
            cartLink.appendChild(templateClon)
        }
    })
}

export default setCart
