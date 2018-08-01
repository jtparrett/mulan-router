import {createRenderer} from 'mulan'
import delegate from 'delegate-events'
import pathToRegexp from 'path-to-regexp'

const compilePath = (pattern) => {
  const keys = []
  const re = pathToRegexp(pattern, keys)
  return { re, keys }
}

const matchPath = (pathname, path) => {
  const { re, keys } = compilePath(path)
  const match = re.exec(pathname)

  if (!match) return null

  const [url, ...values] = match

  return {
    path,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index]
      return memo
    }, {})
  }
}

const findComponentFromPath = (routes) => {
  let match, component
  Object.keys(routes).map(path => {
    if(match) return
    match = matchPath(window.location.pathname, path)
    component = routes[path]
  })
  return {match, component}
}

export const createRouter = (routes) => {
  window.addEventListener('pushstate', () => {
    const {match, component} = findComponentFromPath(routes)
    createRenderer(document.getElementById('router'), component(match))
  })

  window.addEventListener('popstate', () => {
    const {match, component} = findComponentFromPath(routes)
    createRenderer(document.getElementById('router'), component(match))
  })

  setTimeout(() => {
    const {match, component} = findComponentFromPath(routes)
    createRenderer(document.getElementById('router'), component(match))
  }, 0)

  return `<div id="router"></div>`
}

delegate.bind(document.body, `[data-router-link]`, 'click', (e) => {
  const {href} = e.delegateTarget
  e.preventDefault()
  history.pushState(null, null, href)
  const event = new CustomEvent('pushstate')
  window.dispatchEvent(event)
})