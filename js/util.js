
function with_scope(context, func) {
  return function() {
    if(func)
      func.apply(context, arguments);
  };
}

function lpad(num, size) {
  var s = '000000000' + num;
  return s.substr(s.length-size);
}

