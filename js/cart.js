import onDeleteClick from './utils/onDeleteClick'
import initialState from './utils/initialState'
import closeModal from './utils/closeModal'
import setCart from './utils/setCart'
import updateState from './utils/updateState'
import getLoader from './utils/getLoader'

window.addEventListener('DOMContentLoaded', () => {
    const VALID_COUPONS = [ 'B4sdED', '5Rl8f', 'LFs92', 'R46Ej' ]
    const SIZES = [ 'XXL', 'XL', 'Small', 'Large' ]
    const state = JSON.parse(localStorage.getItem('products'))
    const couponForm = document.getElementById('coupon-form')
    const formModal = document.getElementById('form-modal')
    const tableContainer = document.getElementById('table-container')
    const renderTable = ({ sales }) => {
        const salesTable = document.getElementById('sales-table')
        const rowTemplate = document.getElementById('sale-row').content
        const fragment = document.createDocumentFragment()
        sales.forEach((sale) => {
            const productId = rowTemplate.querySelector('.code')
            const productSize = rowTemplate.querySelector('.size')
            const productImage = rowTemplate.querySelector('.image')
            const productName = rowTemplate.querySelector('.name')
            const productPrice = rowTemplate.querySelector('.price')
            const productQuantity = rowTemplate.querySelector('.quantity')
            const saleSubtotal = rowTemplate.querySelector('.subtotal')
            productId.textContent = sale.id
            productSize.textContent = SIZES[sale.size]
            productImage.src = new URL(`/img/${sale.url}`, import.meta.url).href
            productName.textContent = sale.name
            productPrice.textContent = `$${sale.price.toFixed(2)}`
            productQuantity.value = sale.quantity
            saleSubtotal.textContent = `$${(sale.price * sale.quantity).toFixed(2)}`
            const templateClon = rowTemplate.cloneNode(true)
            fragment.appendChild(templateClon)
        })
        salesTable.replaceChildren(fragment)
    }
    const renderTotals = ({ discount, sales }) => {
        const totalsContainer = document.getElementById('totals-container')
        const totalsTemplate = document.getElementById('cart-totals').content
        const coupon = totalsTemplate.querySelector('.coupon')
        if (discount.active) {
            coupon.classList.add('!table-row')
        } else {
            coupon.classList.remove('!table-row')
        }
        const discountRate = parseFloat(discount.rate) / 100
        let saleSubtotal = 0
        sales.forEach((sale) => {
            const subtotal = sale.price * sale.quantity
            saleSubtotal += subtotal
        })
        const subtotal = totalsTemplate.querySelector('.cart-subtotal')
        const total = totalsTemplate.querySelector('.cart-total')
        const totalDiscount = `$${(saleSubtotal - (saleSubtotal * discountRate)).toFixed(2)}` 
        subtotal.textContent = `$${saleSubtotal.toFixed(2)}`
        total.textContent = discount.active ? totalDiscount : `$${saleSubtotal.toFixed(2)}`
        const templateClon = totalsTemplate.cloneNode(true)
        totalsContainer.replaceChildren(templateClon)
    }
    const renderCouponSubmit = ({ discount }) => {
        const couponSubmit = document.querySelector('.coupon-submit')
        if (discount.active && !couponSubmit.disabled) {
            couponSubmit.disabled = true
            couponSubmit.classList.add('opacity-50', 'cursor-auto')
        } else {
            couponSubmit.disabled = false
            couponSubmit.classList.remove('opacity-50', 'cursor-auto')
        }
    }
    const setMaxTableOnResponsive = () => {
        const smallBp = matchMedia('(max-width: 480px)')
        if (smallBp.matches) {
            tableContainer.style.maxWidth = `${document.body.clientWidth}px` 
        } else {
            tableContainer.removeAttribute('style')
        }
    }
    renderTable(state)
    renderTotals(state)
    renderCouponSubmit(state)
    setMaxTableOnResponsive()
    closeModal(formModal) 
    onDeleteClick('.remove', (e) => {
        const updatedState = JSON.parse(localStorage.getItem('products'))
        const idCell = e.target.closest('td').nextElementSibling
        const productSize = idCell.nextElementSibling.textContent
        const productId = idCell.textContent
        const newState = Object.entries(updatedState).map(([ key, value ]) => {
            switch(true) {
                case key === 'sales':
                    return [ key, value.filter(
                        (sale) => !(sale.id === productId && sale.size === SIZES.indexOf(productSize)))
                    ]
                default:
                    return [ key, value ]
                }
        })
        renderTable(Object.fromEntries(newState))
        renderTotals(Object.fromEntries(newState))
        setCart(Object.fromEntries(newState))
        updateState(Object.fromEntries(newState))
    })
    couponForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const statusDiv = document.getElementById('error-coupon')
        const target = e.target
        const givenCoupon = target.coupon.value
        if (VALID_COUPONS.find((coupon) => coupon === givenCoupon.trim())) {
            const updatedState = JSON.parse(localStorage.getItem('products'))
            const newState = Object.entries(updatedState).map(([ key, value ]) => {
                switch(true) {
                    case key === 'discount':
                        return [ key, Object.fromEntries(Object.entries(value).map(([ discountKey, discountValue ]) => {
                            if (discountKey === 'active') {
                                return [ discountKey, discountValue = true ]
                            } else {
                                return [ discountKey, discountValue ]
                            }
                        })) ]
                    default:
                        return [ key, value ]
                }
            })
            renderTotals(Object.fromEntries(newState))
            renderCouponSubmit(Object.fromEntries(newState))
            updateState(Object.fromEntries(newState))
            couponForm.reset()
        }
        else {
            statusDiv.classList.toggle('!block')
            setTimeout(() => {
                statusDiv.classList.toggle('!block')
                couponForm.reset()
            }, 2000)
        }
    }) 
    document.addEventListener('click', (e) => {
        const updatedState = JSON.parse(localStorage.getItem('products'))
        const target = e.target
        const salesButton = document.getElementById('sales-button')
        const getTotals = ({ sales, discount }) => {
            let saleTotals = 0
            sales.forEach((sale) => {
                const subtotal = sale.price * sale.quantity
                saleTotals += subtotal 
            })
            if (discount.active) {
                const rate = parseFloat(discount.rate) / 100
                saleTotals = saleTotals - (saleTotals * rate)
            }
            return saleTotals
        }
        if (target === salesButton) {
            if (updatedState.sales.length > 0) {
                const saleTotals = getTotals(updatedState)
                formModal.classList.toggle('show-modal')
                const status = formModal.querySelector('.status')
                const loader = getLoader()
                status.replaceChildren(loader)
                setTimeout(() => {
                    renderTable(initialState)
                    renderCouponSubmit(initialState)
                    renderTotals(initialState)
                    setCart(initialState)
                    updateState(initialState)
                    const successTemplate = document.getElementById('success-alert').content
                    const successLogo = successTemplate.querySelector('.logo')
                    const successPayment = successTemplate.querySelector('.payment')
                    successLogo.src = new URL('../img/logo2.png', import.meta.url).href
                    successPayment.textContent = `You paid $${saleTotals} in an installment of: $${saleTotals.toFixed(2)}`
                    const successClon = successTemplate.cloneNode(true)
                    status.replaceChildren(successClon)
                }, 2000)
            } else {
                const emptyCart = document.getElementById('empty-cart')
                emptyCart.classList.remove('hidden')
                setTimeout(() => {
                    emptyCart.classList.add('hidden')
                }, 2000)
            }
        }
    })
    window.addEventListener('resize', setMaxTableOnResponsive)
})
