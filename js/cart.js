import initialState from './utils/initialState'
import closeModal from './utils/closeModal'
import setCart from './utils/setCart'
import updateState from './utils/updateState'
import getLoader from './utils/getLoader'

window.addEventListener('DOMContentLoaded', () => {
    const VALID_COUPONS = [ 'B4sdED', '5Rl8f', 'LFs92', 'R46Ej' ]
    const CLOTHING_SIZES = [ 'XXL', 'XL', 'Small', 'Large' ]
    const state = JSON.parse(localStorage.getItem('ecommerce'))
    const couponForm = document.getElementById('coupon-form')
    const formModal = document.getElementById('form-modal')
    const renderRows = ({ sales }) => {
        const salesBody = document.getElementById('sales-body')
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
            productSize.textContent = CLOTHING_SIZES[sale.size]
            productImage.src = new URL(`/img/${sale.url}`, import.meta.url).href
            productName.textContent = sale.name
            productPrice.textContent = `$${sale.price.toFixed(2)}`
            productQuantity.value = sale.quantity
            saleSubtotal.textContent = `$${(sale.price * sale.quantity).toFixed(2)}`
            const templateClon = rowTemplate.cloneNode(true)
            fragment.appendChild(templateClon)
        })
        salesBody.replaceChildren(fragment)
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
    const renderEmptyButton = ({ sales }) => {
        const BUTTON_ID = 'delete-cart'
        const salesContainer = document.getElementById('sales-container')
        const prevButton = document.getElementById(BUTTON_ID)
        if (sales.length === 0 && prevButton) salesContainer.removeChild(prevButton)
        if (sales.length > 0 && !prevButton) {
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'Empty Cart'
            deleteButton.className = 'bg-red-600 text-white rounded-sm py-2 px-5 cursor-pointer mt-6 mb-12 sm:mb-16 md:mb-20'
            deleteButton.id = BUTTON_ID
            salesContainer.insertBefore(deleteButton, salesContainer.children[1])
        }
    }
    const setMaxTableOnResponsive = () => {
        const tableContainer = document.getElementById('table-container')
        const smallBp = matchMedia('(max-width: 480px)')
        if (smallBp.matches) {
            tableContainer.style.maxWidth = `${document.body.clientWidth}px` 
        } else {
            tableContainer.removeAttribute('style')
        }
    }
    const onDeleteRow = (selector, handler) => {
        document.addEventListener('click', (e) => {
            const elements = document.querySelectorAll(selector)
            const path = e.composedPath()
            path.forEach((node) => {
                elements.forEach((element) => {
                    if (node === element) {
                        handler.call(element, e)
                    }
                })
            })
        }), true
    }
    renderRows(state)
    renderEmptyButton(state)
    renderTotals(state)
    renderCouponSubmit(state)
    setMaxTableOnResponsive()
    closeModal(formModal) 
    onDeleteRow('.remove', (e) => {
        const updatedState = JSON.parse(localStorage.getItem('ecommerce'))
        const idCell = e.target.closest('td').nextElementSibling
        const productSize = idCell.nextElementSibling.textContent
        const productId = idCell.textContent
        const newState = Object.entries(updatedState).map(([ key, value ]) => {
            switch(true) {
                case key === 'sales':
                    return [ key, value.filter(
                        (sale) => !(sale.id === productId && sale.size === CLOTHING_SIZES.indexOf(productSize)))
                    ]
                default:
                    return [ key, value ]
                }
        })
        renderRows(Object.fromEntries(newState))
        renderEmptyButton(Object.fromEntries(newState))
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
            const updatedState = JSON.parse(localStorage.getItem('ecommerce'))
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
    // CLICK LISTENER IN EMPTY BUTTON
    document.addEventListener('click', (e) => {
        const updatedState = JSON.parse(localStorage.getItem('ecommerce'))
        const target = e.target
        const emptyCart = document.getElementById('delete-cart')
        if (target === emptyCart) {
            const newState = Object.entries(updatedState).map(([ key, value ]) => {
                switch(true) {
                    case key === 'sales':
                        return [ key, value = [] ]
                    default: 
                        return [ key, value ]
                }
            })
            renderRows(Object.fromEntries(newState))
            renderEmptyButton(Object.fromEntries(newState))
            renderTotals(Object.fromEntries(newState))
            setCart(Object.fromEntries(newState))
            updateState(Object.fromEntries(newState))
        }
    })
    // CLICK LISTENER IN CHECKOUT BUTTON
    document.addEventListener('click', (e) => {
        const updatedState = JSON.parse(localStorage.getItem('ecommerce'))
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
                    renderRows(initialState)
                    renderEmptyButton(initialState)
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
