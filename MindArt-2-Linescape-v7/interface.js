let resetButton, saveButton, fsButton, toggleBut;
let toggle = 0;

var colours = [
  ['#D9042B', '#F27405', '#730217'],
  ['#3E8C49', '#F29D35', '#F26444'],
  ['#F057F2', '#9177F2', '#5550F2'],
  ['#F24968', '#19594D', '#8E1BBF'],
  ['#F22738', '#F27E7E', '#F2F2F2'],
  ['#432E8C', '#F2F2F2', '#03A688'],
  ['#F2A007', '#0B5943', '#F24B0F'],
  ['#494949', '#999999', '#F2F2F2'],
  ['#F2C36B', '#049DBF', '#F21905']
];

let cc = 0;

function calcDimensions() {
  if (width > height) {
    vMax = width / 100;
  } else {
    vMax = height / 100;
  }
}

function removeElements() {
  //todo
}

function writeTextUI() {

  // TODO: REMOVE ELEMENTS

  $(".interface").remove();
  $(".select").remove();

  // UI elements
  newDrawingButton = createButton('New');
  newDrawingButton.position(width - (10 * vMax), height - (6 * vMax));
  newDrawingButton.class("select");
  newDrawingButton.style('font-size', '1.7vmax');
  newDrawingButton.style('height', '4vmax');
  newDrawingButton.style('width', '8vmax');
  newDrawingButton.mousePressed(next);

  saveButton = createButton("Save")
  saveButton.class("select");
  saveButton.style('font-size', '1.7vmax');
  saveButton.style('height', '4vmax');
  saveButton.style('width', '8vmax');
  saveButton.position(width - (10 * vMax), height - (12 * vMax));
  saveButton.mousePressed(saveImg);


  //invert
  swapButton = createButton('Draw');
  swapButton.position(2 * vMax, height - (6 * vMax));
  swapButton.class("select");
  swapButton.style('font-size', '1.7vmax');
  swapButton.style('height', '4vmax');
  swapButton.style('width', '8vmax');
  swapButton.mousePressed(activateDraw);

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
    swatch[i].style("background-color", colours[cc][i * 2]);
    swatch[i].style("border-width", '6px');
    swatch[i].style("border-color", colours[cc][1 + (i * 2)]);
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
  fsButton = createImg('assets/enterFS.png', "FULLSCREEN");
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
