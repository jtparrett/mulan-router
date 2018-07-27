#Mulan Router
Browser Router for Mulan JS

### Installation
```npm install mulan-router --save```
```yarn add mulan-router```

### Usage
```
import {renderNode} from 'mulan'
import {createRouter} from './router'

const NoMatch = () => () => `<h1>404 Page Not Found</h1>`

const Home = () => (root) => {
  return `<h1>Home</h1>`
}

const ProductsListing = () => (root) => {
  return `<p>Products listing</p>`
}

const ProductsDetail = ({params}) => (root) => {
  return `<p>Product detail ${params.slug}</p>`
}

const Router = createRouter({
  '/': Home,
  '/products': ProductsListing,
  '/products/:slug': ProductsDetail,
  '/404': NoMatch // non match url will default to last defined route
})

const App = (root) => {
  return `
    <h1>page</h1>
    <a data-router-link href="/products">Products</a>
    <a data-router-link href="/products/123123/">Product Detail</a>
    ${Router(root)}
  `
}

renderNode(document.getElementById('app'), App)
```