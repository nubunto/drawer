window.onload = function () {
    var drawer = new Drawer({
        canvas: '#squares',
        width: window.innerWidth - 10,
        height: window.innerHeight - 10
    });
    drawer.register('square', ['x', 'y', ['width', 10], ['height', 10]], function (square) {
        this.beginPath();
        this.rect(square.x, square.y, square.width, square.height);
        this.stroke();
        this.closePath();
    });
    drawer.register('circle', ['x', 'y', ['radius', 20], 'startAngle', ['endAngle', Math.PI*2]], function (circle) {
        this.beginPath();
        this.arc(circle.x, circle.y, circle.radius, circle.startAngle, circle.endAngle);
        this.stroke();
        this.closePath();
    });
    drawer.circle.draw({x: 200, y: 335, radius: 100});
    drawer.square.draw({x: 300, y: 398, width: 100, height: 100});
};
