import initialState from './utils/initialState'
import setCart from './utils/setCart'

window.addEventListener('DOMContentLoaded', () => {
    if (!(sessionStorage.getItem('products'))) sessionStorage.setItem('products', `${JSON.stringify(initialState)}`)
    const state = JSON.parse(sessionStorage.getItem('products'))
    setCart(state)

    const offCanvasModal = document.getElementById('off-canvas')
    const menuButtons = document.getElementsByClassName('menu-button')
    for (let button of menuButtons){
        button.addEventListener('click', () => {
            offCanvasModal.classList.toggle('active-modal')
        })
    }
    window.addEventListener('resize', () => {
        const mediumBp = matchMedia('(min-width: 768px)')
        if (mediumBp.matches){
            if (offCanvasModal.classList.contains('active-modal')){
                offCanvasModal.classList.remove('active-modal')
            }
        }
    })
})
