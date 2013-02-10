    var Middleman, toString, slice, arrayify, isArray, inject;

    /**
     * Shorthand
     */
    toString = Object.prototype.toString;
    slice = Array.prototype.slice;

    Middleman = function(){};

    /**
     * Map one or several methods
     *
     * @param Object|Array options
     * @return Middleman
     */
    Middleman.prototype.map = function(options) {
        var i;

        options = arrayify(options);
        i = options.length;

        if (i) {
            while(i--) {
                inject(options[i]);
            }
        }
    };

    /**
     * Check if an object is an instace of Array
     */
    isArray = function(obj){
        return toString.call(obj) === '[object Array]';
    };

    /**
     * Take any value and make it into an array if it is not already one.
     *
     * @param mixed list
     * @return Array
     */
    arrayify = function(list) {
        return isArray(list) ? list : slice.call(arguments);
    };

    /**
     * Here's the magic.
     *
     * @param Object options
     * @return void
     */
    inject = function(options) {
        var lib, method, context, filter, original;

        lib = options.lib;
        method = options.method;
        context = options.context || lib;
        filter = options.filter;

        original = lib[method];

        lib[method] = function() {
            var result, args, response;

            args = slice.call(arguments);

            if (filter) {
                response = filter.call(context, args, original);
                if (isArray(response)) {
                    result = original.apply(context, response);
                } else if (typeof response === 'function') {
                    result = response.call(context, args);
                }
            } else {
                result = original.apply(context, args);
            }
            return result;
        };
    };