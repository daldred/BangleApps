// To do - check logic of swicther - are we nesting functions?
// Todo - timeout digital face after 1 minute *(ref http://www.espruino.com/Reference#l__global_setInterval)

// Useful constants
const locale = require('locale');
const toRad = Math.PI / 180;
const dialRadius = g.getWidth()/2 - 20; // watch face radius - 24px for widget area
const widgetHeight=24+1;
const centerX = g.getWidth() / 2;
const centerY = (g.getWidth() / 2) + widgetHeight/2;

// Colour settings
let colBg = "#000";
let colHourHand = "#f00";
let colMinuteHand = "#0f0";
let colTicks = "#00f";
let lenHourHand = dialRadius - 25;
let lenMinuteHand = dialRadius - 11;
let lenTick = 7;
let colDigital = "#ff0";

//Starting values
let currentDate = new Date();
var thisMinute;
var thisHour;
var drawTimeout;
var mode = 0;
g.setBgColor(colBg);


//Additional graphics fucntion to draw radial lines
Graphics.prototype.drawRotLine = function (sina, cosa, cx, cy, r1, r2) {
  return this.drawLine(
    cx + r1*sina, cy - r1*cosa,
    cx + r2*sina, cy - r2*cosa
  );
};


//Analogue clock elements and drawing
Graphics.prototype.fillRotRect = function (sina, cosa, cx, cy, x0, x1, y0, y1) {
  let fn = Math.ceil;
  return this.fillPoly([
    fn(cx - x0*cosa + y0*sina), fn(cy - x0*sina - y0*cosa),
    fn(cx - x1*cosa + y0*sina), fn(cy - x1*sina - y0*cosa),
    fn(cx - x1*cosa + y1*sina), fn(cy - x1*sina - y1*cosa),
    fn(cx - x0*cosa + y1*sina), fn(cy - x0*sina - y1*cosa)
  ]);
};

function drawHand(a, w, r1, r2, colour){
  g.setColor(colour);
  g.fillRotRect(Math.sin(a), Math.cos(a), centerX, centerY, -w, w, r1, r2);
}

function drawDial() {
  g.clear();
  g.setColor(colTicks);
  g.drawCircle(centerX, centerY, dialRadius);
  for (let i=0; i<12; i++) {
    const r2 = dialRadius;
    const r1 = dialRadius - lenTick;
    let longerTick = (i%3 == 0) ? 5 : 0 ;
    let angle = (i*30) * toRad;
    g.fillRotRect(Math.sin(angle), Math.cos(angle), centerX, centerY, -2, 2, r1-longerTick, r2);
  }
}

function drawHands(h, m, clear) {
  drawHand(m*6*toRad, 2, -3, lenMinuteHand, clear ? colBg : colMinuteHand);
  drawHand((h+m/60)*30*toRad, 3, -3, lenHourHand, clear ? colBg : colHourHand);
}

function analogueDraw(){
  g.setBgColor(colBg);
  drawDial();
//Clear existing hands
  drawHands(thisHour, thisMinute, true);
//Get time and set new hands
  currentDate = Date();
  thisHour = currentDate.getHours() % 12;
  thisMinute = currentDate.getMinutes();
  drawHands(thisHour, thisMinute, false);
  console.log(thisHour, thisMinute, currentDate.getSeconds());
//Come back after a minute
  queueDraw(60);
}

function digitalDraw(){
//Get time and display
  currentDate = Date();
  thisHour = currentDate.getHours();
  thisMinute = currentDate.getMinutes();
  thisSecond = currentDate.getSeconds();
  var time = (" "+thisHour).substr(-2) + ":" + ("0"+thisMinute).substr(-2) + ":" + ("0"+thisSecond).substr(-2);
  g.setBgColor(colBg);
  g.clear();
  g.setColor(colDigital);
  g.setFontAlign(0,0); // center font
  g.setFont("Vector",40);
  g.drawString(time,90,90);
  
  console.log(thisHour, thisMinute, currentDate.getSeconds());
//Come back after a second
  queueDraw(1);
}

// schedule a draw for the start of the next <gap> seconds
// Applies to both formats
function queueDraw(gap) {
  var msgap = gap*1000;
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    if (mode==0){
      analogueDraw();
    }
    else {
      digitalDraw();
    }
  }, msgap - (currentDate % msgap));
}

//Standard startup to analogue mode (0) 

g.clear();
drawDial();
analogueDraw();

//Check for a tap (proxy is touch on emulator) and swicth to digital mode (1) for one minute
Bangle.on('touch', function(){
  mode = 1-mode;
  console.log(mode);
  if (mode==0){
      analogueDraw();
    }
    else {
      digitalDraw();
    }
});

Bangle.setUI("clock");
Bangle.loadWidgets();
Bangle.drawWidgets();