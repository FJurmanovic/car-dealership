export function range(start, end) {
    var myArray = [];
    for (var i = start; i <= end; i += 1) {
      myArray.push(i);
    }
    return myArray;
  };

export function firstUpper(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}