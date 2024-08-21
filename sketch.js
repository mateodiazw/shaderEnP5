// Note: A "uniform" is a global variable within a shader program.

let mandelbrot;

let posicionPreviax = 0;
let posicionActualx = 0;

let posicionPreviay = 0;
let posicionActualy = 0;

// Load the shader and create a p5.Shader object.
function preload() {
  mandelbrot = loadShader('./assets/shader.vert', './assets/elShader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}
function draw(){
  resizeCanvas(windowWidth, windowHeight);

  mandelbrot.setUniform('u_time', [millis()*2./1000.0]);
  // Compile and apply the p5.Shader object.
  shader(mandelbrot);


  //el lerp ralentiza el seguimiento de las cosas al mouse
  posicionActualx = lerp(posicionPreviax, mouseX, 0.05);
  posicionActualy = lerp(posicionPreviay, mouseY, 0.05);

  mandelbrot.setUniform('u_resolution', [float(width),float(height)]);
  mandelbrot.setUniform('u_mouse', [posicionActualx, height - posicionActualy]); 
  
  posicionPreviax = posicionActualx;
  posicionPreviay = posicionActualy;


  // Add a quad as a display surface for the shader.  
  rect(-width/2,-height/2,width,height);
  

  describe('A black fractal image on a magenta background.');
}