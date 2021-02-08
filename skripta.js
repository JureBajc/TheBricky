var prvic=0;
document.addEventListener('keyup', event => {
  if (event.code === 'Space'&&prvic==0) {
    console.log('Space pressed');
	prvic=1;
	drawIt();
  }
})

function drawIt() {
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);  
var x = 460;
var y = 800;
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var r=10;
var ctx;
var paddlex;
var paddleh;
var paddlew;
var rightDown = false;
var leftDown = false;
var canvasMinX;
var canvasMaxX;

var bricks;
var NROWS, NCOLS;
var BRICKWIDTH,BRICKHEIGHT;
var PADDING;
var brick = new Image();
brick.src = "brick.jpg";

var tocke;

//timer
var sekunde=0;
var sekundeI;
var minuteI;
var intTimer = setInterval(timer, 1000);
var izpisTimer = "00:00";
var start=true;
//timer

	function timer(){
	
		if(start==true){
			sekunde++;

			sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
			minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
			izpisTimer = minuteI + ":" + sekundeI;

			$("#cas").html(izpisTimer);
		}
		else{
			sekunde=0;
			//izpisTimer = "00:00";
			$("#cas").html(izpisTimer);
		}
	}



function initbricks() { //inicializacija opek - polnjenje v tabelo
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;
  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}


function init() {
	
sekunde = 0;
izpisTimer = "00:00";
	
	
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
tocke = 0;
$("#tocke").html(tocke);
  return setInterval(draw, 10);
}
function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}
function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 10;
  paddlew = 75;
}
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}



function onKeyDown(evt) {
  if (evt.keyCode == 68)
rightDown = true;
  else if (evt.keyCode == 65) leftDown = true;
}
function onKeyUp(evt) {
  if (evt.keyCode == 68)
rightDown = false;
  else if (evt.keyCode == 65) leftDown = false;
}

function init_mouse() {
  //canvasMinX = $("#canvas").offset().left;
canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX-paddlew/2;
  }
}
$(document).mousemove(onMouseMove); 


function draw() {
	

  clear();
  circle(x, y, 10);
//premik ploščice levo in desno
if(rightDown){
	if((paddlex+paddlew) < WIDTH){
		paddlex += 5;
}
	else{
		paddlex = WIDTH-paddlew;
}
}
	else if(leftDown){
		if(paddlex>0){
			paddlex -=5;
}
else{
	paddlex=0;
}
}
if((paddlex+paddlew) > WIDTH)
    paddlex = WIDTH - paddlew;
if(paddlex<0)
    paddlex = 0;
    rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

//riši opeke
  for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING,
            (i * (BRICKHEIGHT + PADDING)) + PADDING,
            BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }

  rowheight = BRICKHEIGHT + PADDING + 1/2; //Smo zadeli opeko?
  colwidth = BRICKWIDTH + PADDING + 1/2;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  
  
  //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
dy = -dy; bricks[row][col] = 0;
tocke += 1; //v primeru, da imajo opeko večjo utež lahko prištevate tudi npr. 2 ali 3; pred tem bi bilo smiselno dodati še kakšen pogoj, ki bi signaliziral mesta opek, ki imajo višjo vrednost
$("#tocke").html(tocke);
}

  if (x + dx > WIDTH -r || x + dx < 0+r)
    dx = -dx;
  if (y + dy < 0+r)
    dy = -dy;
  else if (y + dy > HEIGHT -(r+1)) {
	start=false;
    if (x > paddlex && x < paddlex + paddlew){
	dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
    dy = -dy;
	start=true;
  }
    else if (y + dy > HEIGHT-r)
      return;
  }
  
  		if(tocke==25){
      swal({title: "Zamgal si", type: 
      "sucess"}).then(function(){
        location.reload();
      });
        clearInterval(draw);
        tocke = 0;
			}
  
  x += dx;
  y += dy;

    function rect(x,y,w,h){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

}
init();
init_paddle();
init_mouse();
initbricks();
}