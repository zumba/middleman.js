# middleman.js
A small library that lets you inject some code between a third party library and the execution
context.  With **Middleman.js** you can easily:

* filter arguments passed to an original method,
* pipe one function's arguments to another function,
* Overload a method to change how it works

## Links
* [Development version 0.1.0](https://github.com/zumba/middleman.js/blob/master/dist/middleman-0.1.0.js) 2.27kb Uncompressed
* [Production version 0.1.0](https://github.com/zumba/middleman.js/blob/master/dist/middleman-0.1.0.min.js) 0.6kb Minified
* [Unit tests](https://github.com/zumba/middleman.js/blob/master/test/spec/middleman.spec.js)

## Example
You have added a third party library to your client code that has a method called `doSomethingCool`.
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

You decide that every time `doSomethingCool` is executed, you want to force the second parameter
`isAwesome` to be `true`, because your application is awesome.  You **could** just write a wrapper
method like this:
```javascript
    var AwesomeApplication = {
        doSomethingCool : function(firstParam) {
            ThirdPartyLibrary.doSomethingCool(firstParam, true);
        }
    };

    AwesomeApplication.doSomethingCool('blah blah blah');
    /**
     * console: All up in your app, doing awesome things.
     */
```

But you have to always remember to call your method.  `ThirdPartyLibrary` is very popular
(jQuery maybe?).  Your colleague Tony has been using `ThirdPartyLibrary` for years, and when he
commits to your application he doesn't remember to use your wrapper function.

Middlman gets between Tony and your awesome application. ;)
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