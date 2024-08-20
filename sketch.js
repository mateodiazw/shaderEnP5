let shaderProgram;
let theShader;

function preload() {
  // Carga tu archivo .frag
  theShader = loadShader('/assets/shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  // Ajusta el tamaño del canvas
  resizeCanvas(windowWidth, windowHeight);

  // Activa el shader
  shader(theShader);

  // Envía las variables uniformes al shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_mouse', [mouseX, height - mouseY]);
  theShader.setUniform('u_time', millis() / 1000.0);

  // Dibuja un quad que cubra toda la pantalla
  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
