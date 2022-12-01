import getLoadingMessage from "./getLoadingMessage"

const setStatus = (messageContainers, status) => {
    switch(status) {
        case 'loading':
            messageContainers.forEach((container) => {
                const statusMessage = getLoadingMessage()
                container.insertAdjacentElement('beforeend', statusMessage)
            })
            break
        case 'fulfilled':
            messageContainers.forEach((container) => {
                const statusMessage = container.querySelector('.status')
                container.removeChild(statusMessage)
            })
            break
        case 'rejected':
            messageContainers.forEach((container) => {
                const statusMessage = container.querySelector('.status')
                statusMessage.textContent = 'An error occurred. Please try it again.'
            })
            break
        default:
            return
    }
}

export default setStatus