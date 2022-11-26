import setPaginate from './utils/setPaginate'

window.addEventListener('DOMContentLoaded', () => {
    const state = JSON.parse(localStorage.getItem('products'))
    const blogSection = document.getElementById('blog-section')
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
    renderBlogs(blogSection, state)
    setPaginate(activePage, state.articles, createBlogCard, blogSection)
})
