"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('my-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'my-app/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _myAppConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _myAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _myAppConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _myAppConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('my-app/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'my-app/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _myAppConfigEnvironment) {

  var name = _myAppConfigEnvironment['default'].APP.name;
  var version = _myAppConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('my-app/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('my-app/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('my-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'my-app/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _myAppConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_myAppConfigEnvironment['default'].APP.name, _myAppConfigEnvironment['default'].APP.version)
  };
});
define('my-app/initializers/export-application-global', ['exports', 'ember', 'my-app/config/environment'], function (exports, _ember, _myAppConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_myAppConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _myAppConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_myAppConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('my-app/router', ['exports', 'ember', 'my-app/config/environment'], function (exports, _ember, _myAppConfigEnvironment) {

	var Router = _ember['default'].Router.extend({
		location: _myAppConfigEnvironment['default'].locationType
	});

	Router.map(function () {
		this.route("createGroup");
		this.route("expenses");
	});

	exports['default'] = Router;
});
define("my-app/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 38
            }
          },
          "moduleName": "my-app/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Create Group");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 31
            }
          },
          "moduleName": "my-app/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Expenses");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "my-app/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "id", "title");
        var el3 = dom.createTextNode("Expense-Tracker");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 3, 3);
        morphs[1] = dom.createMorphAt(element0, 5, 5);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["createGroup"], [], 0, null, ["loc", [null, [3, 0], [3, 50]]]], ["block", "link-to", ["expenses"], [], 1, null, ["loc", [null, [4, 0], [4, 43]]]], ["content", "outlet", ["loc", [null, [7, 0], [7, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("my-app/templates/create-group", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 21
          }
        },
        "moduleName": "my-app/templates/create-group.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("Add Member");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('my-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'my-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("my-app/app")["default"].create({"name":"my-app","version":"0.0.0+85ce5b2f"});
}

/* jshint ignore:end */
//# sourceMappingURL=my-app.map