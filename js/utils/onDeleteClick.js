const onDeleteClick = (selector, handler) => {
    document.addEventListener('click', (e) => {
        const elements = document.querySelectorAll(selector)
        const path = e.composedPath()
        path.forEach((node) => {
            elements.forEach((element) => {
                if (node === element) {
                    handler.call(element, e)
                }
            })
        })
    }), true
}

export default onDeleteClick
