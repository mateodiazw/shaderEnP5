// Note: A "uniform" is a global variable within a shader program.

let mandelbrot;

// Load the shader and create a p5.Shader object.
function preload() {
  mandelbrot = loadShader('/assets/shader.vert', '/assets/elShader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}
function draw(){
  resizeCanvas(windowWidth, windowHeight);

  mandelbrot.setUniform('u_time', [millis()*2./1000.0]);
  // Compile and apply the p5.Shader object.
  shader(mandelbrot);
  mandelbrot.setUniform('u_resolution', [float(width),float(height)]);
  mandelbrot.setUniform('u_mouse', [mouseX, height - mouseY]);
  
  // Add a quad as a display surface for the shader.  
  rect(-width/2,-height/2,width*2,height*2);
  

  describe('A black fractal image on a magenta background.');
}