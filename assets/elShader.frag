
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
/* ----------> SHADER PROPIO */
// void main() {

//     vec2 st = (gl_FragCoord.xy *1. - u_resolution) / u_resolution.y;
//   vec2 mouseAdjusted = vec2((u_mouse.x / u_resolution.x - 0.5) * 4.5, (u_mouse.y / u_resolution.y - 0.5) *2.);
   

//    //st -= mouseAdjusted;
//       st -= mouseAdjusted;

//     float pct = 0.0;

    
//    // st = fract(st * .5) - 0.5 ;
//     vec2 st0 = st;
//     pct = length(st);

//     float d = 0.;
//     vec3 c = vec3(0.);

//     float z = u_time;

//     vec3 color = vec3(0.);

//    // vec3 colorFinal = paleta(length(st-mouseAdjusted) * (sin( u_time* .02 +5. )));
//  vec3 colorFinal = paleta(length(st-sin(u_time)*.9) + (sin( u_time* .05 +11.5)));
//     for(int i = 0; i < 3; i++) {
//         pct -= 5.;

//         d = sin(pct * 15. - u_time * 2.5) + (sin(u_time * .5));

//         d = .5 / abs(d);
//         z -= 5.;
//         c[i] = (d - abs(sin(z) * .05));
//        // c+= colorFinal;
//     }


    
//     color = c * (colorFinal);
//     gl_FragColor = vec4(color, 1.0);
// }

/*----------> SHADER TUNEL DE PARTÍCULAS */
void main() {

    float s = 0.0, v = 0.0;

    vec2 uv = (gl_FragCoord.xy * 1. - u_resolution) / u_resolution.y; 
    // PARA CENTRAR EL LIENZO EN P5JS, MULTIPLICAR FRAGCOORD * 1.
    // PARA CENTRAR EL LIENZO EN glsl, MULTIPLICAR FRAGCOORD * 2.

    //float time = (u_time - 2.0) * 58.0;
    //float time = (u_time)*130.; ------> mayor multiplicación, más velocidad
    float time = (u_time)*u_mouse.x;

    vec3 col = vec3(0.);

    vec3 init = vec3(sin(time * .00032)*.3, .35 - cos(time * .000000005)*.3, time * 0.002);
    //vec3 init = vec3(cos(time), sin(time), time);

    for(int r = 0; r < 100; r++) {
        
        vec3 p = init + s * vec3(uv, .5);

        p.z = fract(p.z)*.5;
        
        // Thanks to Kali's little chaotic loop...
        //for(int i = 0; i < 10; i++) p = abs(p *2.04) / dot(p,p) - .9;
        for(int i = 0; i < 10; i++) p = abs(p *1.8) / dot(p,p) - .59;

        v += pow(dot(p, p), .7) * .06;
          //v += (dot(p, p))*0.028 ;


    col += vec3(v * 0.2 + .4, 12. - s * 2., .1 + v * 1.) * v * 0.00003;
        //col += vec3(p+1.) * v * 0.0003;

        // s += .05; -------> mayor numero, mas fluidez
        s += .05;
    }
    gl_FragColor = vec4(clamp(col, 0., 1.0), 1.0);
}