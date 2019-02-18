String.prototype.format = function(obj) {
  let a = this;
  for (let k in obj) {
    a = a.replace('{' + k + '}', obj[k]).replace(':' + k, obj[k]);
  }
  return a;
};