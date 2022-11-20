const setPaginate = (activePage, items, createCard, mainElement) => {
    const paginateButtons = document.querySelectorAll('.paginate')
    const sectionElement = mainElement.parentElement.parentElement
    const header = document.querySelector('header')
    const headerStyles = getComputedStyle(header)
    for (let button of paginateButtons) {
        button.addEventListener('click', async (e) => {
            const buttonNumber = parseInt(e.target.textContent)
            if (activePage !== buttonNumber) {
                activePage = buttonNumber
                const sectionTop = sectionElement.getBoundingClientRect().top
                const headerSize = parseFloat(headerStyles.getPropertyValue('height'))
                window.scroll(0, sectionTop + window.scrollY - headerSize)
                const fragment = document.createDocumentFragment()
                const indexStart =  buttonNumber !== 1 ? Math.round(items.length / 2) : 0
                const indexEnd = buttonNumber !== 1 ? items.length : Math.round(items.length / 2)
                items.slice(indexStart, indexEnd).forEach((item) => {
                    const card = createCard(item)
                    fragment.appendChild(card)
                }) 
                mainElement.replaceChildren(fragment)
            }
        })
    }
}

export default setPaginate
