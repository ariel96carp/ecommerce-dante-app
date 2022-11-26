const closeModal = (modal) => {
    document.addEventListener('click', (e) => {
        const target = e.target
        const modalButton = document.getElementById('modal-button')
        if (target === modalButton) {
            modal.classList.toggle('show-modal')
            if (modal.classList.contains('cart')) window.location.href = '/'
        }
    }) 
}

export default closeModal
