// pipe(foo, bar)(1, 2, 3);
// same as
// bar(foo(1, 2, 3));

function pipe() {
  // store funcs
  var funcs = Array.prototype.slice.call(arguments);

  // return function
  return function() {
    // store arguments
    var args = arguments;

    // loop through each function, pass calculated args along
    for (var i=0; i < funcs.length; i++) {
      args = [funcs[i].apply(this, args)];
    }

    // return final value
    return args[0];
  }
}






































function pipe0() {
  // store all functions passed as arguments
  // as array
  var funcs = Array.prototype.slice.call(arguments);

  // return function that runs arguments through each function in pipe
  return function() {
    // store arguments so we can apply them to each function
    var args = arguments;
    for (var i=0; i < funcs.length; i++) {
      // update args for each next function
      args = [funcs[i].apply(this, args)];
    }
    return args[0];
  }
}

function otherWay() {
  var funcs = Array.prototype.slice.call(arguments);

  return function() {
    var args = arguments;
    for (var i=funcs.length-1; i >= 0; i--) {
      args = [funcs[i].apply(this, args)];
    }
    return args[0];
  }
}

console.log(otherWay(timesTwo, sum)(1, 2, 3));


































function pipe2() {
  var funcs = Array.prototype.slice.call(arguments);

  return function() {
    var args = arguments;

    for (var i = 0; i < funcs.length; i++) {
      args = [funcs[i].apply(this, args)];
    }

    return args[0];
  }
}

function sum() {
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function(a, b) {
    return a + b;
  });
}

function timesTwo(a) {
  return a*2;
}

function timesFour(a) {
  return timesTwo(a) + timesTwo(a);
}

console.log(pipe(sum, timesTwo, timesTwo, timesTwo, timesFour)(1, 2, 3, 4, 5, 6));
