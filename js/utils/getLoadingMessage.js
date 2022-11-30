const getLoadingMessage = () => {
    const loadingMessage = document.createElement('p')
    loadingMessage.textContent = 'Loading data...'
    loadingMessage.className = 'text-left status'
    return loadingMessage
}

export default getLoadingMessage
