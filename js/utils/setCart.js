const setCart = ({ sales }) => {
    const CART_CLASSNAME = 'quantity'
    const cartLinks = document.querySelectorAll('.cart-link')
    cartLinks.forEach((cartLink) => {
        const prevCart = cartLink.querySelector(`.${CART_CLASSNAME}`)
        if (prevCart) cartLink.removeChild(prevCart) 
        if (sales.length > 0) {
            const cartQuantity = document.createElement('div')
            cartQuantity.className = `absolute bottom-[70%] left-[80%] bg-red-400 w-4 h-4 text-xs text-white rounded-full text-center ${CART_CLASSNAME}`
            cartQuantity.textContent = sales.length
            cartLink.appendChild(cartQuantity)
        }
    })
}

export default setCart
