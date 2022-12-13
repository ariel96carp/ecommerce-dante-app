const setStatus = (messageContainers, status) => {
    switch(status) {
        case 'loading':
            messageContainers.forEach((container) => {
                const statusMessage = document.createElement('p')
                statusMessage.textContent = 'Loading data...'
                statusMessage.className = 'text-left font-normal status'
                container.insertAdjacentElement('beforeend', statusMessage)
            })
            break
        case 'fulfilled':
            messageContainers.forEach((container) => {
                const statusMessage = container.querySelector('.status')
                if (statusMessage) container.removeChild(statusMessage)
            })
            break
        case 'rejected':
            messageContainers.forEach((container) => {
                const statusMessage = container.querySelector('.status')
                if (statusMessage) statusMessage.textContent = 'An error occurred. Please try it again.'
            })
            break
        default:
            return
    }
}

export default setStatus
