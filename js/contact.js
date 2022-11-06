import closeModal from './utils/closeModal'

window.addEventListener('DOMContentLoaded', () => {
    const formModal = document.getElementById('form-modal')
    const messageForm = document.getElementById('message-form')
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault()
        formModal.classList.toggle('show-modal')
        const status = formModal.querySelector('.status')
        const loaderTemplate = document.getElementById('loader').content
        const loaderClon = loaderTemplate.cloneNode(true)
        status.replaceChildren(loaderClon)
        setTimeout(() => {
            const successTemplate = document.getElementById('success-alert').content
            const successClon = successTemplate.cloneNode(true)
            status.replaceChildren(successClon)
            messageForm.reset() 
        }, 2000)
    })
    closeModal(formModal)
})