const getLoader = () => {
    const loader = document.createElement('div')
    loader.className = 'w-28 h-28 rounded-full border-2 border-t-2 border-t-sky-400 border-gray-400 animate-spin'
    return loader
}

export default getLoader
