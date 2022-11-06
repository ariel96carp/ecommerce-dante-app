import setPaginate from './utils/setPaginate'

window.addEventListener('DOMContentLoaded', () => {
    const state = JSON.parse(sessionStorage.getItem('products'))
    let activePage = 1
    const createBlogCard = (article) => {
        const blogTemplate = document.getElementById('blog-card').content 
        const blogImage = blogTemplate.querySelector('.image')
        const blogDate = blogTemplate.querySelector('.date')
        const blogTitle = blogTemplate.querySelector('.title')
        const blogDescription = blogTemplate.querySelector('.description')
        blogImage.style.backgroundImage = `url(${article.url})`
        blogDate.textContent = article.date
        blogTitle.textContent = article.title 
        blogDescription.textContent = article.description
        const templateClon = blogTemplate.cloneNode(true)
        return templateClon
    }
    const renderBlogs = (element, { articles }) => {
        const fragment = document.createDocumentFragment()
        articles.slice(0, Math.round(articles.length / 2)).forEach((article) => {
            const card = createBlogCard(article)
            fragment.appendChild(card)
        })
        element.appendChild(fragment)
    }
    const blogSection = document.getElementById('blog-section')
    renderBlogs(blogSection, state)
    setPaginate(activePage, state.articles, createBlogCard, blogSection)
})
