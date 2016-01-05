var Util = {
  extend: function (object) {
    var sources = Array.prototype.slice.call(arguments, 1);
    sources.forEach(function (source) {
      if (Object.prototype.toString.call(source) !== '[object Object]') {
        return;
      }

      Object.keys(source).forEach(function (key) {
        object[key] = source[key];
      });
    });

    return object;
  },

  /**
   * Excludes given properties from object
   *
   * @param  {Object} object
   * @param  {Array} props Array of properties to remove
   * @return {Object} New object without given props
   */
  exclude: function (object, props) {
    var newObject = {};

    Object.keys(object).forEach(function (prop) {
      if (props.indexOf(prop) === -1) {
        newObject[prop] = object[prop];
      }
    });

    return newObject;
  }
}

module.exports = Util;
