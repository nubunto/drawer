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

`d.[name].draw(obj)`
--------------------
The name you passed to `d.register` will be available as a method on that particular instance. With it, you can pass an POJO and it will call the previous defined `drawFn` with any default arguments you provided back in the `d.register` call.

`d.[name].addEventListener(event, fn)`
--------------------------------------
Will register the `event` with the `fn` as callback in the `canvas` element of the Drawer object.


# TODO
* Make an proxy for an easy-to-work-with object for drawing
* Stop pretending we live a standards complying world and add more checks and polyfills
