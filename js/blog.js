import setPaginate from './utils/setPaginate'
import getData from './utils/getData'
import setStatus from './utils/setStatus'

window.addEventListener('DOMContentLoaded', async () => {
    const state = JSON.parse(localStorage.getItem('products'))
    const blogSection = document.getElementById('blog-section')
    let activePage = 1
    const createBlogCard = (article) => {
        const blogTemplate = document.getElementById('blog-card').content 
        const blogImage = blogTemplate.querySelector('.image')
        const blogDate = blogTemplate.querySelector('.date')
        const blogTitle = blogTemplate.querySelector('.title')
        const blogDescription = blogTemplate.querySelector('.description')
        blogImage.style.backgroundImage = `url(${new URL(`/img/${article.url}`, import.meta.url).href})`
        blogDate.textContent = article.date
        blogTitle.textContent = article.title 
        blogDescription.textContent = article.description
        const templateClon = blogTemplate.cloneNode(true)
        return templateClon
    }
    const renderBlogs = (container, { articles }) => {
        const buttonsTemplate = document.getElementById('buttons-container').content
        const buttonsClon = buttonsTemplate.cloneNode(true)
        const fragment = document.createDocumentFragment()
        const blogGrid = document.createElement('div')
        blogGrid.className = 'flex flex-col gap-20 mb-6 md:mb-12'
        blogGrid.id = 'data-grid'
        articles.slice(0, Math.round(articles.length / 2)).forEach((article) => {
            const card = createBlogCard(article)
            fragment.appendChild(card)
        })
        blogGrid.appendChild(fragment)
        container.appendChild(blogGrid)
        container.appendChild(buttonsClon)
    }
    if (state.articles.length > 0) {
        renderBlogs(blogSection, state)
        setPaginate(activePage, state.articles, createBlogCard)
    } else {
        setStatus([ blogSection ], 'loading')
        const response = await getData('articles')
        if (response.error) setStatus([ blogSection ], 'rejected')
        else {
            setStatus([ blogSection ], 'fulfilled')
            const newState = Object.entries(state).map(([ key, value ]) => {
                switch(true) {
                    case key === 'articles':
                        return [ key, value.concat(...response.data) ]
                    default:
                        return [ key, value ]
                }
            })
            renderBlogs(blogSection, Object.fromEntries(newState))
            setPaginate(activePage, Object.fromEntries(newState).articles, createBlogCard)
            localStorage.setItem('products', JSON.stringify(Object.fromEntries(newState)))
        }
    }
})
