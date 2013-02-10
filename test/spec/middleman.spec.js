(function(describe, it, expect, Middleman, undefined) {
    "use strict";
    describe('Middleman', function() {
        var MM = new Middleman();

        describe('map : filter', function() {
            it('can return an array of params to be passed to the original function', function() {
                var originalLib = {
                    add : function(a, b) { return a + b; }
                };

                // control
                expect(originalLib.add(1, 2)).toBe(3);

                MM.map({
                    lib : originalLib,
                    method : 'add',
                    filter : function(args){
                        args[0] = 5;
                        args[1] = 10;
                        return args;
                    }
                });

                // test
                expect(originalLib.add(1, 2)).toBe(15);
            });
            it('can return a new function that will be executed instead of the original method', function() {
                var originalLib = {
                    add : function(a, b) { return a + b; }
                };

                // control
                expect(originalLib.add(2, 3)).toBe(5);

                MM.map({
                    lib : originalLib,
                    method : 'add',
                    filter : function(args) {
                        // change add to multiply :)
                        return function() {
                            return args[0] * args[1];
                        };
                    }
                });

                // test
                expect(originalLib.add(2, 3)).toBe(6);
            });
            it('can return undefined, and Middleman will not try to call the method', function(){
                var someGlobal, originalLib;

                originalLib = {
                    add : function(value) { someGlobal += value; }
                };

                // control
                someGlobal = 0;
                originalLib.add(1);
                originalLib.add(2);
                originalLib.add(3);
                expect(someGlobal).toBe(6);

                MM.map({
                    lib : originalLib,
                    method : 'add',
                    filter : function(args) {
                        // add 1 no matter what
                        someGlobal++;
                    }
                });

                // test
                someGlobal = 0;
                originalLib.add(1);
                originalLib.add(2);
                originalLib.add(3);
                expect(someGlobal).toBe(3);
            });
            it('has access to the original method', function(){
                var someGlobal, originalLib;

                originalLib = {
                    add : function(value) { someGlobal += value; }
                };

                // control
                someGlobal = 0;
                originalLib.add(5);
                expect(someGlobal).toBe(5);

                MM.map({
                    lib : originalLib,
                    method : 'add',
                    filter : function(args, original) {
                        var value = args.pop();
                        original(value);
                        original(value);
                        original(value);
                    }
                });

                // test
                someGlobal = 0;
                originalLib.add(5);
                expect(someGlobal).toBe(15);
            });
        });
        describe('map : context', function() {
            it('changes the context of the executed method', function(){
                var someGlobal, originalLib, newContext;

                originalLib = {
                    blip : function(){
                        this.second();
                    },
                    second : function(){
                        someGlobal = 'Original Context';
                    }
                };
                newContext = {
                    second : function(){
                        someGlobal = 'New Context';
                    }
                };

                // control
                someGlobal = '';
                originalLib.blip();
                expect(someGlobal).toBe('Original Context');

                MM.map({
                    lib : originalLib,
                    method : 'blip',
                    context : newContext
                });

                // test
                someGlobal = '';
                originalLib.blip();
                expect(someGlobal).toBe('New Context');
            });
        });
        describe('map : method', function(){
            it('takes a string and pairs it with lib', function(){
                var lookup, originalLib;

                originalLib = {
                    add : function(a, b) { return a + b; }
                };

                MM.map({
                    lib : originalLib,
                    method : 'add',
                    filter : function(args){
                        lookup = true;
                        return args;
                    }
                });

                // test
                lookup = false;
                expect(originalLib.add(1, 2)).toBe(3);
                expect(lookup).toBe(true);
            });
        });
    });
}(describe, it, expect, Middleman));