(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("App", function(exports, require, module) {
var App, Page;

Page = require("components/Page");

App = React.createClass({
  displayName: "App",
  render: function() {
    return React.createElement(Page, null);
  }
});

React.render(React.createElement(App, null), document.body);
});

require.register("components/Page", function(exports, require, module) {
var Page, PageStore;

PageStore = require("stores/PageStore");

Page = React.createClass({
  getInitialState: function() {
    var page;
    page = PageStore.getPageFromKey(this.props.page || "/");
    return {
      page: page
    };
  },
  render: function() {
    var page;
    page = this.state.page;
    return React.createElement("div", null, React.createElement("a", {
      "href": page.link
    }, React.createElement("h1", null, page.name), React.createElement("img", {
      "src": page.logo
    })));
  }
});

module.exports = Page;
});

;require.register("stores/PageStore", function(exports, require, module) {
var PageStore, _pages;

_pages = {
  "/": {
    key: "/",
    name: "Hello World",
    link: "http://facebook.github.io/react",
    logo: "images/react.png"
  }
};

PageStore = {
  getPageFromKey: function(key) {
    if (!_pages.hasOwnProperty(key)) {
      return null;
    }
    return _pages[key];
  },
  getAll: function() {
    return _pages;
  }
};

module.exports = PageStore;
});

;
//# sourceMappingURL=app.js.map