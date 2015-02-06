# drawer
Simple drawing library for HTML5 Canvas

For more information, please refer to the **example** folder.
Note: API might change.

# API
`var d = new Drawer(args);`
---------------------------
Creates a new Drawer object, where args is a POJO (Plain Old JS Object) with the following keys:
* `string canvas`: Selector for a HTMLCanvasObject
* `int width` : Width of the canvas
* `int height`: Height of the canvas 

`d.register(name, args, drawFn(compiledArgs))`
--------------------------------
Register, in the current instance, a helper method with name `name` to the current Drawer instance. The args must be in the format `[['argument', defaultValue]]`, and if they do not have a default value, it will be 0. They will be passed as an argument to the `drawFn` callback, compiled according to their name.
Defaults don't override the current argument that was passed, they polyfill it if they don't match with the originally passed in arguments.
The context of drawFn is the 2d context of the Canvas object created up top.
For instance:

    d.register('circle', ['x', 'y', ['radius', 100], 'startAngle', ['endAngle', Math.PI*2]], function(circle) {
      // get the x with circle.x, y with circle.y, etc...
      console.log(circle.x);
      // this is the 2d context of the canvas object.
    });
