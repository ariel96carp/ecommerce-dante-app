const createProductCard = (product) => {
    const templateHTML = document.getElementById('product-card').content
    const productLink = templateHTML.querySelector('.link')
    productLink.href = `details.html?id=${product.id}`
    const productImage = templateHTML.querySelector('.image')
    productImage.src = product.url
    const productEnteprise = templateHTML.querySelector('.enteprise')
    productEnteprise.textContent = product.enterprise 
    const productName = templateHTML.querySelector('.name')
    productName.textContent = product.name
    const productPrice = templateHTML.querySelector('.price')
    productPrice.textContent = `$${product.price}`
    const productRating = templateHTML.querySelector('.rating')
    productRating.replaceChildren()
    for (let i = 0; i < product.reviews; i++) {
        const star = document.createElement('img')
        star.src = 'img/estrella.png'
        star.alt = 'Star'
        star.classList.add('w-3')
        productRating.appendChild(star)
    } 
    const templateClon = templateHTML.cloneNode(true)
    return templateClon
}

export default createProductCard
