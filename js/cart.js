import onDeleteClick from './utils/onDeleteClick'
import initialState from './utils/initialState'
import closeModal from './utils/closeModal'
import setCart from './utils/setCart'

window.addEventListener('DOMContentLoaded', () => {
    const VALID_COUPONS = [ 'B4sdED', '5Rl8f', 'LFs92', 'R46Ej' ]
    const SIZES = [ 'XXL', 'XL', 'Small', 'Large' ]
    const state = JSON.parse(sessionStorage.getItem('products'))
    const renderTable = ({ sales }) => {
        const salesTable = document.getElementById('sales-table')
        const rowTemplate = document.getElementById('sale-row').content
        const fragment = document.createDocumentFragment()
        sales.forEach((sale) => {
            const productId = rowTemplate.querySelector('.code')
            productId.textContent = sale.id
            const productSize = rowTemplate.querySelector('.size')
            productSize.textContent = SIZES[sale.size]
            const productImage = rowTemplate.querySelector('.image')
            productImage.src = sale.url
            const productName = rowTemplate.querySelector('.name')
            productName.textContent = sale.name
            const productPrice = rowTemplate.querySelector('.price')
            productPrice.textContent = `$${sale.price.toFixed(2)}`
            const productQuantity = rowTemplate.querySelector('.quantity')
            productQuantity.value = sale.quantity
            const saleSubtotal = rowTemplate.querySelector('.subtotal')
            saleSubtotal.textContent = `$${(sale.price * sale.quantity).toFixed(2)}`
            const templateClon = rowTemplate.cloneNode(true)
            fragment.appendChild(templateClon)
        })
        salesTable.replaceChildren(fragment)
    }
    renderTable(state)
    const renderTotals = ({ discount, sales }) => {
        const totalsContainer = document.getElementById('totals-container')
        const totalsTemplate = document.getElementById('cart-totals').content
        const coupon = totalsTemplate.querySelector('.coupon')
        if (discount.isActive) {
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
        subtotal.textContent = `$${saleSubtotal.toFixed(2)}`
        const total = totalsTemplate.querySelector('.cart-total')
        const totalDiscount = `$${(saleSubtotal - (saleSubtotal * discountRate)).toFixed(2)}` 
        total.textContent = discount.isActive ? totalDiscount : `$${saleSubtotal.toFixed(2)}`
        const templateClon = totalsTemplate.cloneNode(true)
        totalsContainer.replaceChildren(templateClon)
    }
    renderTotals(state)
    onDeleteClick('.remove', (e) => {
        const updatedState = JSON.parse(sessionStorage.getItem('products'))
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
        sessionStorage.setItem('products', JSON.stringify(Object.fromEntries(newState)))
    })
    const renderCouponSubmit = ({ discount }) => {
        const couponSubmit = document.querySelector('.coupon-submit')
        if (discount.isActive && !couponSubmit.disabled) {
            couponSubmit.disabled = true
            couponSubmit.classList.add('opacity-50', 'cursor-auto')
        } else {
            couponSubmit.disabled = false
            couponSubmit.classList.remove('opacity-50', 'cursor-auto')
        }
    }
    renderCouponSubmit(state)
    const couponForm = document.getElementById('coupon-form')
    couponForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const statusDiv = document.getElementById('error-coupon')
        const target = e.target
        const givenCoupon = target.coupon.value
        if (VALID_COUPONS.find((coupon) => coupon === givenCoupon.trim())) {
            const updatedState = JSON.parse(sessionStorage.getItem('products'))
            const newState = Object.entries(updatedState).map(([ key, value ]) => {
                switch(true) {
                    case key === 'discount':
                        return [ key, Object.fromEntries(Object.entries(value).map(([ discountKey, discountValue ]) => {
                            if (discountKey === 'isActive') {
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
            sessionStorage.setItem('products', JSON.stringify(Object.fromEntries(newState)))
            couponForm.reset()
        }
        else {
            statusDiv.classList.toggle('!block')
            setTimeout(() => {
                statusDiv.classList.toggle('!block')
            }, 2000)
        }
    })
    const formModal = document.getElementById('form-modal')
    closeModal(formModal)   
    document.addEventListener('click', (e) => {
        const getTotals = ({ sales, discount }) => {
            let saleTotals = 0
            sales.forEach((sale) => {
                const subtotal = sale.price * sale.quantity
                saleTotals += subtotal 
            })
            if (discount.isActive) {
                const rate = parseFloat(discount.rate) / 100
                saleTotals = saleTotals - (saleTotals * rate)
            }
            return saleTotals
        }
        const updatedState = JSON.parse(sessionStorage.getItem('products'))
        const target = e.target
        const salesButton = document.getElementById('sales-button')
        if (target === salesButton) {
            if (updatedState.sales.length > 0) {
                const saleTotals = getTotals(updatedState)
                formModal.classList.toggle('show-modal')
                const status = formModal.querySelector('.status')
                const loaderTemplate = document.getElementById('loader').content
                const loaderClon = loaderTemplate.cloneNode(true)
                status.replaceChildren(loaderClon)
                setTimeout(() => {
                    renderTable(initialState)
                    renderCouponSubmit(initialState)
                    renderTotals(initialState)
                    setCart(initialState)
                    sessionStorage.setItem('products', JSON.stringify(initialState))
                    const successTemplate = document.getElementById('success-alert').content
                    const successPayment = successTemplate.querySelector('.payment')
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

    const tableContainer = document.getElementById('table-container')
    const setMaxTableOnResponsive = () => {
        const smallBp = matchMedia('(max-width: 480px)')
        if (smallBp.matches) {
            tableContainer.style.maxWidth = `${document.body.clientWidth}px` 
        } else {
            tableContainer.removeAttribute('style')
        }
    }
    setMaxTableOnResponsive()
    window.addEventListener('resize', setMaxTableOnResponsive)
})
