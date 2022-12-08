import setEmailSubmission from './utils/setEmailSubmission'
import getLoader from './utils/getLoader'

window.addEventListener('DOMContentLoaded', () => {
    const formModal = document.getElementById('form-modal')
    const messageForm = document.getElementById('message-form')
    setEmailSubmission()
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault()
        formModal.classList.toggle('show-modal')
        const status = formModal.querySelector('.status')
        const loader = getLoader()
        status.replaceChildren(loader)
        setTimeout(() => {
            const successTemplate = document.getElementById('success-alert').content
            const successClon = successTemplate.cloneNode(true)
            status.replaceChildren(successClon)
            messageForm.reset() 
        }, 2000)
    })
})
