const updateState = (newState) => localStorage.setItem('products', JSON.stringify(newState))

export default updateState
