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
    offCanvasModal.addEventListener('click', (e) => {
        const nav = offCanvasModal.querySelector('nav')
        const target = e.target
        if (target.classList.contains('active-modal')) {
            if (!(nav.contains(target))) target.classList.remove('active-modal')
        }
    })
    window.addEventListener('resize', () => {
        const mediumBp = matchMedia('(min-width: 768px)')
        if (mediumBp.matches){
            if (offCanvasModal.classList.contains('active-modal')){
                offCanvasModal.classList.remove('active-modal')
            }
        }
    })
})
