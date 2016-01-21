
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mouse = {
				x  :0,
				y  :0,
				ox :0,
				oy :0
			};
var drawMode = false;
var color = 'white';
var width = 1;

var socket = io.connect(location.protocol + '//' + location.hostname + ':9001');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;			

ctx.lineCap = 'round';

canvas.addEventListener('mousemove', function(event){

	mouse.x = event.clientX;
	mouse.y = event.clientY;

	if(drawMode) {
		ctx.beginPath();
		ctx.moveTo(mouse.ox, mouse.oy);
		ctx.lineTo(mouse.x, mouse.y);
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.stroke();

		socket.emit('draw_line', { 
			x1: mouse.ox,
			y1: mouse.oy,
			x2: mouse.x,
			y2: mouse.y,
			width: width,
			colour: color
			});
	}

	mouse.ox = mouse.x;
	mouse.oy = mouse.y;

});

canvas.addEventListener('mousedown', function(){
	drawMode = true;
});
canvas.addEventListener('mouseup', function(){
	drawMode = false;
});

socket.on('line_drawn', function(data){
	ctx.beginPath();
		ctx.moveTo(data.x1, data.y1);
		ctx.lineTo(data.x2, data.y2);
		ctx.strokeStyle = data.color;
		ctx.lineWidth = data.width;
		ctx.stroke();
});