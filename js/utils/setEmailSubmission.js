import getLoader from './getLoader'
import closeModal from './closeModal'
import updateState from './updateState'
import Timeout from 'smart-timeout'

const setEmailSubmission = () => {
    const emailForm = document.getElementById('email-form')
    const formModal = document.getElementById('form-modal')
    const status = formModal.querySelector('.status')
    const createEmailAlert = ({ email }) => {
        const TIMEOUT_ID = 'emailTimeout'
        if (Timeout.exists(TIMEOUT_ID)) Timeout.clear(TIMEOUT_ID)
        const message = document.createElement('div')
        const mainSection = document.querySelector('main')
        const prevAlert = document.getElementById('email-alert')
        message.className = 'bg-red-400 p-3 fixed top-3 right-3 rounded-md z-40 md:text-sm max-w-[200px] sm:max-w-[300px] animate-alert-translate break-words'
        message.textContent = `The email ${email} has already been subscribed.`
        message.id = 'email-alert'
        if (prevAlert) mainSection.removeChild(prevAlert)
        mainSection.appendChild(message)
        Timeout.create(TIMEOUT_ID, () => {
            mainSection.removeChild(mainSection.lastElementChild)
        }, 4000)
    }
    emailForm.addEventListener('submit', (e) => {
        const updatedState = JSON.parse(localStorage.getItem('ecommerce'))
        const submittedEmails = updatedState.emails
        const target = e.target
        const email = target.email.value
        e.preventDefault()
        if (!(submittedEmails.find((submittedEmail) => submittedEmail === email.trim()))) {
            const newState = Object.entries(updatedState).map(([ key, value ]) => {
                switch(true) {
                    case key === 'emails':
                        return [ key, value.concat(email) ]
                    default:
                        return [ key, value ]
                }
            })
            const submissionTemplate = document.getElementById('email-submission').content
            const submissionClon = submissionTemplate.cloneNode(true)
            const loader = getLoader()
            formModal.classList.toggle('show-modal')
            status.replaceChildren(loader)
            setTimeout(() => {
                updateState(Object.fromEntries(newState))
                status.replaceChild(submissionClon, loader)
                emailForm.reset()
            }, 3000)
        } else {
            createEmailAlert({ email })
            emailForm.reset()
        }
    })
    closeModal(formModal)
}

export default setEmailSubmission
