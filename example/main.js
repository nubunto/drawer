window.onload = function () {
    var drawer = new Drawer({
        canvas: '#squares',
        width: window.innerWidth - 10,
        height: window.innerHeight - 10
    });
    drawer.register('square', Drawer.square, function (square) {
        this.beginPath();
        this.rect(square.x, square.y, square.width, square.height);
        this.stroke();
        this.closePath();
    });
    drawer.register('circle', Drawer.circle, function (circle) {
        this.beginPath();
        this.arc(circle.x, circle.y, circle.radius, circle.startAngle, circle.endAngle);
        this.stroke();
        this.closePath();
    });
    drawer.register('custom-drawing', [Drawer.coordinates, 'width', 'height'], function (custom) {
        this.beginPath();
        this.fillRect(custom.x, custom.y, custom.width, custom.height);
        this.closePath();
    });
    drawer.circle.draw({ x: 200, y: 335, radius: 100 });
    drawer.square.draw({ x: 300, y: 398, width: 100, height: 100 });
    drawer['custom-drawing'].draw({ x: 10, y: 45, width: 300, height: 40 });
};
