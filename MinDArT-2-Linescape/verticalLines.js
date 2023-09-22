// counters
let xCount = 0,
  yCount = 0,
  counter = 0;
let fromCol, toCol;
let store = [];
let arr = [];
let arrLineCol = [];
let ccc;

// dimensions
let vMax, hMax, wMax;
bool = 1;
let brushSizeBaseline = 60;

// strokes
let strokeBaseline = 0;

//UI elements
let newTextureButton;
let slider1, slider2, slider3;

// distance vector calculator
let smoothDist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let velocity = 0;
let img, storedOrientation, direction, storedOrientationDegrees, rotateDirection;

let tempLayer;

function preload() {
  audio = loadSound('../sound/Scene2_Line.mp3');
  click = loadSound('../sound/click.mp3');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  tempLayer = createGraphics(window.innerWidth, window.innerHeight);
  pixelDensity(1);
  var stbtn = $("<div />").appendTo("body");
  stbtn.addClass('startBtn');
  $('<p>Touch here to begin</p>').appendTo(stbtn);
  stbtn.mousedown(start);
  stbtn.mousemove(start);
}

function start() {
  $(".startBtn").remove();
  //  fullscreen(1);
  if (audio.isPlaying()) {} else {
    audio.loop(1);
  }

    fullscreen(1);

  dimensionCalc();


  // display baselines
  fromCol = color(100, 100, 100);
  toCol = color(230, 230, 230);
  noFill()
  stroke(255, 140);
  let marginX = 0;
  let marginY = 0;

  // run setup functions
  setupDefaults();
  setupArrays();

   sizeWindow();
  writeTextUI();
  // restart();
  next();
}

function dimensionCalc() {
  if (width > height) {
    vMax = width / 100;
  } else {
    vMax = height / 100;
  }
  vW = width / 100;
  vH = height / 100;
}

function setupDefaults() {
  strokeWeight(2); // set a baseline in case strokeWeight within touchMoved is disabled
  yCount = 20;
  xCount = 16;
  counter = 0;
  stroke(255, 50);
  brushSizeBaseline = 100;


}

function setupArrays() {
  arr = [];
  arrLineCol = [];

  // make col array
  for (let j = 0; j < yCount; j++) {
    ccc = hexToRgb(colours[cc][1], 0.5);
    arrLineCol[j] = [ccc.levels[0], ccc.levels[1], ccc.levels[2]]
  }

  // x and y may need to be swapped
  for (let i = 0; i < xCount; i++) {
    arr[i] = [];
    for (let j = 0; j < yCount; j++) {
      let _x = (width / xCount) * i;
      _x = map(_x, 0, width, vW * -15, width + (vW * 15)); // ensures beyond margin
      let _y = ((height / yCount) * j);
      _y = map(pow(_y, 2), 0, pow(height, 2), 0, height);
      _y = map(_y, 0, height, vH * -15, height + (vH * 15)); // ensures beyond margin
      arr[i][j] = createVector(_x, _y);
    }
  }
  redrawIt();
}

function activateDraw() {
  bool = 1;
  paintOff();
  return false;
}

function next() {
  yCount = int(yCount *= 1.3);
  xCount = int(xCount *= 0.95);
  brushSizeBaseline *= 0.95;
  counter++;
  if (counter > 7) {
    setupDefaults();
  }
  bool = 0;


  cc++;
  if (cc > colours.length-1) {
    cc = 0;
  }
    activateDraw();

  setupArrays();

 blendMode(BLEND);
  // background(hexToRgb(colours[cc][0], 255));
  background(255, 255);
  redrawIt();
  





  writeTextUI();

  // console.log(yCount);
}

function touchMoved() {
  store = [];
  // calculate all points within a distance, then sort...
  for (let x = 0; x < xCount; x++) {
    for (let y = 0; y < yCount; y++) {
      let d = (dist(mouseX, mouseY, arr[x][y].x, arr[x][y].y));
      if (d < brushSizeBaseline) {
        store.push([d, x, y]);
      }
    }
  }

  // sort by size
  store.sort(sortFunction);

  if (bool) {
    // redrawOrganic
    for (let i = 0; i < store.length; i++) {
      let _d = store[i][0];
      let _x = store[i][1];
      let _y = store[i][2];
      let temp = createVector(mouseX, mouseY);
      _d = _d / (vMax * 0.1);
      arr[_x][_y] = p5.Vector.lerp(arr[_x][_y], temp, 1 / _d);
    }
  } else {

    // find the closest match, and paint that colour
    let choice = 0;
    if (toggle) {
      choice = 1;
    }
    if (store.length > 0) {
      ccc = hexToRgb(colours[cc][choice], 0.5);
      arrLineCol[store[store.length - 1][2]] = [ccc.levels[0], ccc.levels[1], ccc.levels[2]]
    }
  }
  redrawIt();
}

function updateSize() {
  curveTightness(slider1.value() / 100);
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return b;
  } else {
    return (a[0] > b[0]) ? -1 : 1;
  }
}

function redrawIt() {


blendMode(BLEND);
background(255,100);
 blendMode(BLEND);
  for (let y = 0; y < yCount; y++) {
    strokeWeight((1 / yCount) * y * 4.5);
    stroke(arrLineCol[y][0], arrLineCol[y][1], arrLineCol[y][2], 100);
    fill(arrLineCol[y][0], arrLineCol[y][1], arrLineCol[y][2], 100);
    beginShape();
    let vvW = -10 * vW;
    let vvH = -10 * vH;
    for (let x = 0; x < xCount; x++) {
      curveVertex(arr[x][y].x, arr[x][y].y);
    }

    // curveVertex(windowWidth, windowHeight);
    // curveVertex(0, windowHeight);

    endShape();
  }}

function hexToRgb(hex, alpha) {
  hex = hex.replace('#', '');
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  // console.log(hex);
  return color(r, g, b, alpha);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sizeWindow();
  calcDimensions();
  removeElements();
  writeTextUI();
  checkFS();
  touchMoved(); // needed?
}


function sizeWindow() {
  if (width < height) {
    currentOrientation = "portrait";
  } else {
    currentOrientation = "landscape";
  }
  if (currentOrientation === storedOrientation) {
    stretchWindow();
  } else {
    if (window.orientation < storedOrientationDegrees) {
      direction = 1;
    } else {
      direction = -1;
    }

    if (abs(window.orientation - storedOrientationDegrees) == 270) {
      direction = -direction;
    }
    rotateWindow(direction);
    storedOrientationDegrees = window.orientation;
  }
  storedOrientation = currentOrientation;
}

function stretchWindow() {
  // do nothing for now
}

function rotateWindow(direction) {

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j].x = (arr[i][j].x / width) * height;
      arr[i][j].y = (arr[i][j].y / height) * width;
    }
  }
  rotateDirection = rotateDirection * -1;
}

//startSimulation and pauseSimulation defined elsewhere
function handleVisibilityChange() {
  if (document.hidden) {
    audio.stop();
  } else {
    audio.loop(1);
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange, false);

function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' + [red(c), green(c), blue(c), alpha].join(',') + ')');
}
