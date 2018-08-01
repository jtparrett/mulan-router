'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouter = undefined;

var _mulan = require('mulan');

var _delegateEvents = require('delegate-events');

var _delegateEvents2 = _interopRequireDefault(_delegateEvents);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var compilePath = function compilePath(pattern) {
  var keys = [];
  var re = (0, _pathToRegexp2.default)(pattern, keys);
  return { re: re, keys: keys };
};

var matchPath = function matchPath(pathname, path) {
  var _compilePath = compilePath(path),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) return null;

  var _match = _toArray(match),
      url = _match[0],
      values = _match.slice(1);

  return {
    path: path,
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

var findComponentFromPath = function findComponentFromPath(routes) {
  var match = void 0,
      component = void 0;
  Object.keys(routes).map(function (path) {
    if (match) return;
    match = matchPath(window.location.pathname, path);
    component = routes[path];
  });
  return { match: match, component: component };
};

var createRouter = exports.createRouter = function createRouter(routes) {
  window.addEventListener('pushstate', function () {
    var _findComponentFromPat = findComponentFromPath(routes),
        match = _findComponentFromPat.match,
        component = _findComponentFromPat.component;

    (0, _mulan.createRenderer)(document.getElementById('router'), component(match));
  });

  window.addEventListener('popstate', function () {
    var _findComponentFromPat2 = findComponentFromPath(routes),
        match = _findComponentFromPat2.match,
        component = _findComponentFromPat2.component;

    (0, _mulan.createRenderer)(document.getElementById('router'), component(match));
  });

  setTimeout(function () {
    var _findComponentFromPat3 = findComponentFromPath(routes),
        match = _findComponentFromPat3.match,
        component = _findComponentFromPat3.component;

    (0, _mulan.createRenderer)(document.getElementById('router'), component(match));
  }, 0);

  return '<div id="router"></div>';
};

_delegateEvents2.default.bind(document.body, '[data-router-link]', 'click', function (e) {
  var href = e.delegateTarget.href;

  e.preventDefault();
  history.pushState(null, null, href);
  var event = new CustomEvent('pushstate');
  window.dispatchEvent(event);
});
