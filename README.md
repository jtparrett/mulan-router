# Mulan Router
Browser Router for Mulan JS

### Installation
```npm install mulan-router --save```
```yarn add mulan-router```

### Usage
```
import {createRenderer} from 'mulan'
import {createRouter} from 'mulan-router'

const NoMatch = () => (render) => {
  render(`<h1>404 Page Not Found</h1>`)
}

const Home = () => (render) => {
  render(`<h1>Home</h1>`)
}

const ProductsListing = () => (render) => {
  render(`<p>Products listing</p>`)
}

const ProductsDetail = ({params}) => (render) => {
  render(`<p>Product detail ${params.slug}</p>`)
}

const Router = createRouter({
  '/': Home,
  '/products': ProductsListing,
  '/products/:slug': ProductsDetail,
  '/404': NoMatch // non match url will default to last defined route
})

const App = (render) => {
  render(`
    <h1>Page</h1>
    <a data-router-link href="/products">Products</a>
    <a data-router-link href="/products/123123/">Product Detail</a>
    <div id="router"></div>
  `)

  createRenderer(document.getElementById('router'), Router)  
}

createRenderer(document.getElementById('app'), App)
```