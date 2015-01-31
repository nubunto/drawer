(function () {
    var merge = function (a, b) {
        if(typeof b != 'object') return b;
        for(var key in b) {
            if(!(key in a)) a[key] = b[key];
        }
        return a;
    };

    function Drawer (args) {
        this._args = args;
        this.canvas = typeof args.canvas === 'string' ? document.querySelector(args.canvas) : document.createElement('canvas');
        this.canvas.width = args.width;
        this.canvas.height = args.height;
        this.context = this.canvas.getContext('2d');
        if(typeof args.canvas !== 'string') {
            document.body.appendChild(this.canvas);
        }
    };
    
    Drawer.prototype.register = function (name, args, drawFn) {
        var defaults = typeof args === 'object' && args.reduce(function (def, cur) {
            if(typeof cur === 'string') {
                def[cur] = 0;
            } else {
                def[cur[0]] = cur[1];
            }
            return def;
        }, {});
        var holder = [];
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
    Drawer.prototype.addEventListener = function (event, fn) {
        return this.canvas.addEventListener(event, fn);
    }
    window.Drawer = Drawer;
})();