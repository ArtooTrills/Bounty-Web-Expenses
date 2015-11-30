define('my-app/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function (assert) {
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('my-app/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('my-app/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/destroy-app.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('my-app/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'my-app/tests/helpers/start-app', 'my-app/tests/helpers/destroy-app'], function (exports, _qunit, _myAppTestsHelpersStartApp, _myAppTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _myAppTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _myAppTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('my-app/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/module-for-acceptance.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('my-app/tests/helpers/resolver', ['exports', 'ember/resolver', 'my-app/config/environment'], function (exports, _emberResolver, _myAppConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _myAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _myAppConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('my-app/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('my-app/tests/helpers/start-app', ['exports', 'ember', 'my-app/app', 'my-app/config/environment'], function (exports, _ember, _myAppApp, _myAppConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _myAppConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _myAppApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('my-app/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('my-app/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function (assert) {
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('my-app/tests/test-helper', ['exports', 'my-app/tests/helpers/resolver', 'ember-qunit'], function (exports, _myAppTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_myAppTestsHelpersResolver['default']);
});
define('my-app/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function (assert) {
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('my-app/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map