// TODO: THIS DOES NOT WORK WITH null values! It turns them into empty objects.

// NOTE: there's a new way to make a deep copy of an object:
// const myDeepCopy = structuredClone(myOriginal);
// Maybe try dpeloying this? There's some weirdness with the cloneObject function



const cloneObject = function (source) {
  if (Object.prototype.toString.call(source) === "[object Array]") {
    let clone = [];
    for (var i = 0; i < source.length; i++) {
      clone[i] = cloneObject(source[i]);
    }
    return clone;
  } else if (typeof source == "object") {
    let clone = {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        clone[prop] = cloneObject(source[prop]);
      }
    }
    return clone;
  } else {
    return source;
  }
};

export default cloneObject;
