/*
 * From: https://raw.githubusercontent.com/angus-c/es6-react-mixins/master/src/mixin.js
 * Based on: https://gist.github.com/sebmarkbage/fac0830dbb13ccbff596
 * by Sebastian Markbåge
 *
 * This is not the original file, and has been modified
 */

var React = require("react");

var Util = require("./Util");

var lifecycleFunctions = [
  "componentWillMount", "componentDidMount",
  "componentWillReceiveProps", "componentWillUpdate", "componentDidUpdate",
  "componentWillUnmount", "render"
];

function noop() {
  return null;
}
function trueNoop() {
  return true;
}

function es6ify(mixin) {
  if (typeof mixin === "function") {
    // mixin is already es6 style
    return mixin;
  }

  return function (Base) {
    // mixin is old-react style plain object
    // convert to ES6 class
    function MixinClass() {}
    MixinClass.prototype = Object.create(Base.prototype);
    MixinClass.prototype.constructor = MixinClass;

    var clonedMixin = Util.extend({}, mixin);
    // These React properties are defined as ES7 class static properties
    var staticProps = [
      "childContextTypes", "contextTypes",
      "defaultProps", "propTypes"
    ];
    staticProps.forEach(function (staticProp) {
      MixinClass[staticProp] = clonedMixin[staticProp];
      delete clonedMixin[staticProp];
    });

    // Omit lifecycle functions because we are already storing them elsewhere
    Util.extend(MixinClass.prototype, Util.omit(clonedMixin, lifecycleFunctions));

    return MixinClass;
  };
}

function setLifecycleMixinHandler(proto, lifecycleFn, mixins) {
  if (mixins == null || mixins.length === 0) {
    // No-ops so we need not check before calling super()
    proto[lifecycleFn] = noop;
    return;
  }

  proto[lifecycleFn] = function () {
    var args = Array.prototype.slice.call(arguments);
    mixins.forEach(function (mixin) {
      mixin.apply(this, args);
    }.bind(this));
  };
}

function addLifeCycleFunctions(proto, mixins) {
  var mixinLifecycleFnMap = {};
  mixins.forEach(function (mixin) {
    lifecycleFunctions.forEach(function (lifecycleFn) {
      if (mixin[lifecycleFn] == null) {
        return;
      }

      if (mixinLifecycleFnMap[lifecycleFn] == null) {
        mixinLifecycleFnMap[lifecycleFn] = [];
      }

      // Use push as we want to preserve order
      mixinLifecycleFnMap[lifecycleFn].push(mixin[lifecycleFn]);
    });
  });

  lifecycleFunctions.forEach(function (lifecycleFn) {
    setLifecycleMixinHandler(
      proto, lifecycleFn, mixinLifecycleFnMap[lifecycleFn]
    );
  });
}

function mixin() {
  var mixins = Array.prototype.slice.call(arguments);

  // Creates base class
  function Base() {}
  Base.prototype = Object.create(React.Component.prototype);
  Base.prototype.constructor = Base;
  Base.prototype.shouldComponentUpdate = trueNoop;

  addLifeCycleFunctions(Base.prototype, mixins);

  mixins.reverse();

  mixins.forEach(function (mixin) {
    Base = es6ify(mixin)(Base);
  });

  return Base;
}

module.exports = mixin;
