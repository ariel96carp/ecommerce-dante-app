const getData = (dataRequested) => new Promise((resolve) => {
    const API_ENDPOINT = dataRequested === 'products' ? '/api/products' : '/api/articles'
    const responseBody = { data: [ ] }
    // EMULATE DELAY IN API CALL
    setTimeout(async () => {
        try {
            const response = await fetch(API_ENDPOINT)
            const data = await response.json()
            responseBody.data.push(...data)
        } catch (e) {
            responseBody.error = e
        } finally {
            resolve(responseBody)
        }
    }, 4000)
})

export default getData
