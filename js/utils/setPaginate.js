const setPaginate = (activePage, items, createCard, mainElement) => {
    const paginateButtons = document.querySelectorAll('.paginate')
    for (let button of paginateButtons) {
        button.addEventListener('click', (e) => {
            const buttonNumber = parseInt(e.target.textContent)
            if (activePage !== buttonNumber) {
                activePage = buttonNumber
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
