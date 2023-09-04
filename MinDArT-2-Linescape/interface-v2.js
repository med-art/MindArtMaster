let resetButton, saveButton, homeButton, fsButton, toggleBut;
let toggle = 0;


var colours = [
  ['#6A732C', '#18261B', '#BF9649'],
  ['#8AA6A3', '#BFBFBF', '#4C5958'],
  ['#F2B077', '#F24405', '#261813'],
  ['#D94929', '#590902', '#F2B705'],
  ['#F2B705', '#6F7302', '#384001'],
  ['#0D0D0D', '#F2C572', '#262626']
];

let cc = 0;

function calcDimensions() {
  if (width > height) {
    vMax = width / 100;
  } else {
    vMax = height / 100;
  }
}

function writeTextUI() {

  $(".interface").remove();
  $(".select").remove();

  // UI elements
  
// Buttons on the right..
homeButton = createButton('Main Menu');
homeButton.position(windowWidth-170,windowHeight-290);
homeButton.class('right-buttons');
homeButton.mousePressed(menu);  

resetButton = createButton('New');
resetButton.position(windowWidth-170,windowHeight-205);
resetButton.class('right-buttons');
resetButton.mousePressed(resetTimeout);

saveButton = createButton('Save');
saveButton.position(windowWidth-170,windowHeight-120);
saveButton.class('right-buttons');
saveButton.mousePressed(saveImg);

  slider1 = createSlider(-500, 500, 0); // density
  slider1.input(updateSize);
  slider1.position(10, -150);
  slider1.style('width', '300px');





  createSwatch();
}

function createSwatch() {

  $(".box").remove();
  $(".toggle").remove();

  swatch = [];
  for (let i = 0; i < 2; i++) {
    swatch[i] = createButton("");
    swatch[i].size(7 * vMax, 10.5 * vMax);
    swatch[i].style("background-color", colours[cc][i]);
    swatch[i].style("border-width", '6px');
    swatch[i].class("box");
    swatch[i].id("swatch" + i);
    swatch[i].mousePressed(function() {
      toggleIt();
    });


  }

  toggleBut = createButton('Paint Lines');
  toggleBut.mouseClicked(toggleIt);
  toggleBut.class("toggle");
  toggleBut.id("ui4");
  toggleBut.position(12 * vMax, height - (6 * vMax));
  toggleBut.style('width', '18vmax')
  toggleBut.style('font-size', '1.7vmax');
  toggleBut.style('height', '4vmax');

  toggleIt();

}

function toggleIt() {

  bool = 0;
  toggle = !toggle;
  for (let i = 0; i < 2; i++) {
    swatch[i].position(((i * 9) + 12) * vMax, height - (11 * vMax));
    swatch[i].size(9 * vMax, 8 * vMax);
  }
  var n = 0;
  if (toggle) {
    n = 1;
  }
  swatch[n].position(((toggle * 9) + 12) * vMax, height - (15.5 * vMax));
  swatch[n].size(9 * vMax, 12.5 * vMax);
}

function paintOff() {
  for (let i = 0; i < 2; i++) {
    swatch[i].position(((i * 9) + 12) * vMax, height - (11 * vMax));
    swatch[i].size(9 * vMax, 8 * vMax);
  }
}

function addFS() {
  $('.fsButton').remove();
  fsButton = createImg('../assets/enterFS.png', "FULLSCREEN");
  fsButton.style('height', '4.5vMax');
  fsButton.class("fsButton");
  fsButton.position(width - (7.5 * vMax), 1.5 * vMax);
  fsButton.mousePressed(fs);
}

function checkFS() {
  if (!fullscreen()) {
    addFS();
  }
}

function fs() {
  fullscreen(1);
  $('.fsButton').remove();
}

function saveImg() {
  click.play();
  save('linescape' + month() + day() + hour() + second() + '.jpg');
}
