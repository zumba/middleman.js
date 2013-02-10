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
        });
    });
}(describe, it, expect, Middleman));