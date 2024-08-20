
#ifdef GL_ES
precision highp float;
#endif

#define PROCESSING_COLOR_SHADER
#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;


vec3 paleta(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.10, 0.20);
    return a + b * cos(6.28318 * (c * t - d));
}

void main() {
    vec2 st = (gl_FragCoord.xy *1. - u_resolution) / u_resolution.y;
  vec2 mouseAdjusted = vec2((u_mouse.x / u_resolution.x - 0.5) * 4.5, (u_mouse.y / u_resolution.y - 0.5) *2.);
   

    st -= mouseAdjusted;
    float pct = 0.0;

    
   // st = fract(st * .5) - 0.5 ;
    vec2 st0 = st;
    pct = length(st);

    float d = 0.;
    vec3 c = vec3(0.);

    float z = u_time;

    vec3 color = vec3(0.);

    vec3 colorFinal = paleta(length(st-sin(u_time)*.9) + (sin( u_time* .05 +11.5)));

    for(int i = 0; i < 3; i++) {
        pct -= 5.;

        d = sin(pct * 15. - u_time * 2.5) + (sin(u_time * 0.5));

        d = .5 / abs(d);
        z -= 5.;
        c[i] = (d - abs(sin(z) * .05));
       // c+= colorFinal;
    }


    
    color = c * (colorFinal);
    gl_FragColor = vec4(color, 1.0);
}