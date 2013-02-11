# Middleman.js
A small library that lets you inject some code between a third party library and the execution
context.  With **Middleman.js** you can easily:

* filter arguments passed to an original method,
* pass one function's arguments to another function, or
* overload a third party method to change how it works

## Links
* [Development version 0.1.0](https://github.com/zumba/middleman.js/blob/master/dist/middleman-0.1.0.js) **2.27kb** Uncompressed
* [Production version 0.1.0](https://github.com/zumba/middleman.js/blob/master/dist/middleman-0.1.0.min.js) **0.6kb** Minified
* [Unit tests](https://github.com/zumba/middleman.js/blob/master/test/spec/middleman.spec.js)

## Example
Let's say you add a third party library to your application that has a method called `doSomethingCool`.
```javascript
    var ThirdPartyLibrary = {
        doSomethingCool : function(firstParam, isAwesome) {
            // do something cool with firstParam, then:
            if (isAwesome){
                console.log('All up in your app, doing awesome things.');
            }
        };
    };
```

You decide that you want to force the second parameter `isAwesome` to be `true` every time
`doSomethingCool` is called because your application is totally awesome.  You *could* just write a
wrapper method like this:
```javascript
    var AwesomeApplication = {
        doSomethingCool : function(firstParam) {
            return ThirdPartyLibrary.doSomethingCool(firstParam, true);
        }
    };

    AwesomeApplication.doSomethingCool('blah blah blah');
    /**
     * console: All up in your app, doing awesome things.
     */
```

However, now you have to remember to call your method instead of the original method.
What if `ThirdPartyLibrary` is very popular (e.g. jQuery)?  Your colleague Tony has been using
`ThirdPartyLibrary` for years.  He doesn't remember to use your wrapper function when writing new
code for your application.

**Middlman.js** gets between Tony and `ThirdPartyLibrary`, so your application stays awesome. :expressionless:
```javascript
    var MM = new Middleman();

    MM.map({
        lib : ThirdPartyLibrary,
        method : 'doSomethingCool',
        filter : function(args) {
            // make the second parameter true
            args[1] = true;
            return args;
        }
    });

    ThirdPartyLibrary.doSomethingCool("I'm Tony, and the second param is undefined.");
    /**
     * console: All up in your app, doing awesome things.
     */
```

Piece of cake.