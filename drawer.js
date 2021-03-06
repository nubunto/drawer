(function () {
    //merge function: merges two objects together.
    //if the key exists in A, don't override it.
    var merge = function (a, b) {
        if(typeof b != 'object') return b;
        if(!a) return b;
        for(var key in b) {
            if(!(key in a)) a[key] = b[key];
        }
        return a;
    };

    /* 
        the Drawer constructor
        all it does is set up the properties that will be used later
        It grabs args.canvas,
        args.width,
        args.height
        and that should be it.
        and also, if the args.canvas is a DOM Node, appends to the body
    */
    function Drawer (args) {
        args = merge(args, {canvas: null, width: 100, height: 100});
        this._args = args;
        this.canvas = typeof args.canvas === 'string' ? document.querySelector(args.canvas) : document.createElement('canvas');
        this.canvas.width = args.width;
        this.canvas.height = args.height;
        this.context = this.canvas.getContext('2d');
        if(typeof args.canvas !== 'string' && this.canvas.nodeType) {
            try {
                document.body.appendChild(this.canvas);
            } catch(e) {
                //we didn't fucked up, you did. *insanity wolf*
                throw new Error("ERROR: Cannot append to body.");
            }
        }
    };
    
    // registers a name in the current instance,
    // this name is a object with 'draw' and 'addEventListener' properties
    // the 'draw' method calls up drawFn with the canvas2dcontext as the 'this' of the function
    // the addEventListener, well... it does what you think it does.
    Drawer.prototype.register = function (name, args, drawFn) {
        var defaults = typeof args === 'object' && args.reduce(function (def, cur) {
            if(typeof cur === 'string') {
                def[cur] = 0;
            } else {
                def[cur[0]] = cur[1];
            }
            return def;
        }, {});
        var context = this.context;
        var that = this;
        this[name] = typeof args === 'object' ? {
            draw: function (opt) {
                return drawFn.call(context, merge(opt, defaults));
            },
            addEventListener: function (event, fn) {
                return that.addEventListener(event, fn);
            }
        } : args;
    };
    
    // binds a event onto the canvas element
    Drawer.prototype.addEventListener = function (event, fn) {
        return this.canvas.addEventListener(event, fn);
    };
    
    // expose our hand-crafted helper Drawer
    window.Drawer = Drawer;
})();
