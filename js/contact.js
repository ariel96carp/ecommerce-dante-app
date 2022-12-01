import closeModal from './utils/closeModal'

window.addEventListener('DOMContentLoaded', () => {
    const formModal = document.getElementById('form-modal')
    const messageForm = document.getElementById('message-form')
    closeModal(formModal)
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault()
        formModal.classList.toggle('show-modal')
        const status = formModal.querySelector('.status')
        const loaderTemplate = document.getElementById('loader').content
        const loaderClon = loaderTemplate.cloneNode(true)
        status.replaceChildren(loaderClon)
        setTimeout(() => {
            const successTemplate = document.getElementById('success-alert').content
            const successCheck = successTemplate.querySelector('.check-image')
            const successLogo = successTemplate.querySelector('.logo')
            successCheck.src = new URL('/img/404-tick.png', import.meta.url).href
            successLogo.src = new URL('/img/logo.png', import.meta.url).href
            const successClon = successTemplate.cloneNode(true)
            status.replaceChildren(successClon)
            messageForm.reset() 
        }, 2000)
    })
})
