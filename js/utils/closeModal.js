const closeModal = (modal) => {
    document.addEventListener('click', (e) => {
        const target = e.target
        const modalButton = document.getElementById('modal-button')
        if (target === modalButton) {
            modal.classList.toggle('show-modal')
        }
    }) 
}

export default closeModal
