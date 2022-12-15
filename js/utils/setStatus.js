const setStatus = (messageContainers, status) => {
    const STATUS_CLASSNAME = 'status'
    switch(status) {
        case 'loading':
            messageContainers.forEach((container) => {
                const statusMessage = document.createElement('p')
                statusMessage.textContent = 'Loading data...'
                statusMessage.className = `text-left font-normal ${STATUS_CLASSNAME}`
                container.insertAdjacentElement('beforeend', statusMessage)
            })
            break
        case 'fulfilled':
            messageContainers.forEach((container) => {
                const statusMessage = container.querySelector(`.${STATUS_CLASSNAME}`)
                if (statusMessage) container.removeChild(statusMessage)
            })
            break
        case 'rejected':
            messageContainers.forEach((container) => {
                const statusMessage = container.querySelector(`.${STATUS_CLASSNAME}`)
                if (statusMessage) statusMessage.textContent = 'An error occurred. Please try it again.'
            })
            break
        default:
            return
    }
}

export default setStatus
