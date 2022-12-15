const getData = (requestedData) => new Promise((resolve) => {
    const API_ENDPOINT = requestedData === 'products' ? '/api/products' : '/api/articles'
    const responseBody = { data: [ ] }
    // EMULATE DELAY IN API CALL
    setTimeout(async () => {
        try {
            const response = await fetch(API_ENDPOINT)
            if (response.status !== 200) {
                responseBody.error = 'The server encountered an unexpected condition that prevented it from fulfilling the request.'  
            } 
            else {
                const data = await response.json()
                responseBody.data.push(...data)
            } 
        } catch(e) {
            responseBody.error = e.message
        } finally {
            resolve(responseBody)
        }
    }, 4000)
})

export default getData
