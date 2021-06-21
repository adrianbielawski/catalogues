
/**
 * ES module mock
 *
 * Accessing properties of the default export will return the property name.
 *
 * Useful for testing css modules.
 */

 const handler = {
    get(target, property) {
      if (property in target) {
        return target[property];
      }
      return property;
    },
  };
  
  const proxiedObject = {};
  
  const moduleProxy = new Proxy(proxiedObject, handler);
  
  module.exports = {
    default: moduleProxy,
    __esModule: moduleProxy,
  };