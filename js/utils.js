if (typeof $ == 'undefined') {
  $ = function() {};
  $.slice = [].slice;
  $.guid = 1; 
  $.proxy = function(fn, context) {
	var args, proxy;
	args = $.slice.call(arguments, 2);
	proxy = function() {
 	  return fn.apply(context || this, args.concat($.slice.call(arguments)));
	};
	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || $.guid++;
	return proxy;
  };
}