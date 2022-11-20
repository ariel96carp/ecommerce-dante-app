const createProductCard = (product) => {
    const templateHTML = document.getElementById('product-card').content
    const productLink = templateHTML.querySelector('.link')
    const productImage = templateHTML.querySelector('.image')
    const productEnteprise = templateHTML.querySelector('.enteprise')
    const productName = templateHTML.querySelector('.name')
    const productPrice = templateHTML.querySelector('.price')
    const productRating = templateHTML.querySelector('.rating')
    productLink.href = `details.html?id=${product.id}`
    productImage.src = product.url
    productImage.loading = 'lazy'
    productEnteprise.textContent = product.enterprise 
    productName.textContent = product.name
    productPrice.textContent = `$${product.price}`
    productRating.replaceChildren()
    for (let i = 0; i < product.reviews; i++) {
        const star = document.createElement('img')
        star.src = `${new URL('../../img/estrella.png', import.meta.url).href}`
        star.loading = 'lazy'
        star.alt = 'Star'
        star.classList.add('w-3')
        productRating.appendChild(star)
    } 
    const templateClon = templateHTML.cloneNode(true)
    return templateClon
}

export default createProductCard
