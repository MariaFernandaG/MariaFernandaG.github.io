/**
 * BrazoR.js
 * Práctica#2 GPC: Construir una escena con un brazo articulado
 */

// Modulos necesarios
import * as THREE from "../lib/three.module.js";
//import {GLTFLoader} from "../lib/GLTFLoader.module.js";

// Variables estandar
let renderer, scene, camera;

// Otras globales
let brazo;
let antebrazo;
let pinza;
let pinza2;
let angulo = 0;
let n = 1;

// Acciones
init();
loadScene();
render();

function init()
{
    // Instanciar el motor de render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);             // Utilizo toda el área para dibujar
    document.getElementById('container').appendChild( renderer.domElement );

    // Construyo el nodo raiz de la escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1,0.1,0.1);                    // Color de la escena

    // Instanciar la camara
    var aspectRatio = window.innerWidth / window.innerHeight;
    camera= new THREE.PerspectiveCamera(80,aspectRatio,0.1,100000);             // ángulo de visión vertical en grados
    camera.position.set(5,180,220);                                               // posición de la cámara
    camera.lookAt(0,150,150);                                                     // hacia dónde ve la cámara
}

function loadScene()
{
    // Material sencillo
    const material = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
    const materialS = new THREE.MeshBasicMaterial({color:'grey',wireframe:true});
    const materialD = new THREE.MeshBasicMaterial({color:'blue',wireframe:true});

    // Suelo (perpendicular al eje Z)
    const suelo = new THREE.Mesh( new THREE.PlaneGeometry(1000/n,1000/n, 100,100), materialS );  //tamaña 1000x1000
    suelo.rotation.x = -Math.PI/2;          // Se rota el suelo (pi/2) para ponerlo perpendicular al eje Y (plano XZ)
    suelo.position.y = -0.2;
    scene.add(suelo);

    //Base (cilíndro)
    const base = new THREE.Mesh( new THREE.CylinderGeometry( 50/n, 50/n, 15/n, 32 ), material );
    base.position.y = (15/n)/2;
    scene.add(base);

    //Brazo
    const eje = new THREE.Mesh( new THREE.CylinderGeometry( 20/n, 20/n, 18/n, 32 ), material );
    eje.rotation.x = -Math.PI/2;           //Rotar el eje sobre el eje X
    const esparrago = new THREE.Mesh( new THREE.BoxGeometry(18/n,120/n,12/n), material );
    const rotula = new THREE.Mesh( new THREE.SphereGeometry(20/n,20,20), material );
    //eje.position.y = 60/n;
    esparrago.position.y = 60/n;
    rotula.position.y = 120/n;

    brazo = new THREE.Object3D();
    brazo.position.y = (18/n)/2;
    brazo.add(eje);
    brazo.add(esparrago);
    brazo.add(rotula);
    base.add(brazo);

    //Antebrazo
    const disco = new THREE.Mesh( new THREE.CylinderGeometry( 22/n, 22/n, 6/n, 32 ), material );
    const nervio1 = new THREE.Mesh( new THREE.BoxGeometry(4/n,80/n,4/n), material );
    const nervio2 = new THREE.Mesh( new THREE.BoxGeometry(4/n,80/n,4/n), material );
    const nervio3 = new THREE.Mesh( new THREE.BoxGeometry(4/n,80/n,4/n), material );
    const nervio4 = new THREE.Mesh( new THREE.BoxGeometry(4/n,80/n,4/n), material );
    const mano = new THREE.Mesh( new THREE.CylinderGeometry( 15/n, 15/n, 40/n, 32 ), material );
    
    mano.rotation.x = -Math.PI/2;                               //Rotar la mano sobre el eje X
    nervio1.position.x = -10/n;
    nervio1.position.y = (80/n)/2 + (6/n)/2;
    nervio1.position.z = 10/n;

    nervio2.position.x = -10/n;
    nervio2.position.y = (80/n)/2 + (6/n)/2;
    nervio2.position.z = -10/n;

    nervio3.position.x = 10/n;
    nervio3.position.y = (80/n)/2 + (6/n)/2;
    nervio3.position.z = -10/n;

    nervio4.position.x = 10/n;
    nervio4.position.y = (80/n)/2 + (6/n)/2;
    nervio4.position.z = 10/n;
    mano.position.y = (80/n) + (6/n)/2;

    antebrazo = new THREE.Object3D();
    antebrazo.add(disco);
    antebrazo.add(nervio1);
    antebrazo.add(nervio2);
    antebrazo.add(nervio3);
    antebrazo.add(nervio4);
    antebrazo.add(mano);

    antebrazo.position.y = 120/n;
    brazo.add(antebrazo);

    //Pinzas
    const geometry = new THREE.BufferGeometry();

    const coordenadas = new Float32Array( [
        (19/n)/2, (-14/n)/2, 0, (19/n)/2, (-14/n)/2, -2/n, (19/n)/2, (14/n)/2, -2/n, (19/n)/2, (14/n)/2, 0,
        (-19/n)/2, (20/n)/2, 2/n, (-19/n)/2, (20/n)/2, -2/n, (-19/n)/2, (-20/n)/2, -2/n, (-19/n)/2, (-20/n)/2, 2/n
    ] );

    const normales = new Float32Array([ // 24 x3
        0,0,1, 0,0,1, 0,0,1, 0,0,1,      // Front
        1,0,0, 1,0,0, 1,0,0, 1,0,0,      // Right
        0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,  // Back 
        -1,0,0, -1,0,0, -1,0,0, -1,0,0,  // Left
        0,1,0, 0,1,0, 0,1,0, 0,1,0,      // Top 
        0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0   // Bottom
    ]);

    const indices = [
        0,3,7, 7,3,4, 0,1,2,
        0,2,3, 4,3,2, 4,2,5,
        6,7,4, 6,4,5, 1,5,2,
        1,6,5, 7,6,1, 7,1,0
    ] ;

    geometry.setIndex(indices);
    geometry.setAttribute( 'position', new THREE.BufferAttribute(coordenadas, 3) );
    geometry.computeVertexNormals();
    //geometry.setAttribute( 'normal', new THREE.BufferAttribute(normales, 5) );
    const dedo1 = new THREE.Mesh( geometry, materialD);
    const dedo2 = new THREE.Mesh( geometry, materialD);
    dedo1.position.x = (19/n);
    dedo2.position.x = (19/n);
    //dedo2.rotation.x = -Math.PI;            //rotas 180 grados en el eje X

    const base_pinza = new THREE.Mesh( new THREE.BoxGeometry(19/n,20/n,4/n), materialD );
    const base_pinza2 = new THREE.Mesh( new THREE.BoxGeometry(19/n,20/n,4/n), materialD );

    pinza = new THREE.Object3D();
    pinza.position.y = (80/n) + (6/n)/2;
    pinza.position.z = 14/n;
    pinza.position.x =  8/n;

    pinza2 = new THREE.Object3D();
    pinza2.position.y = (80/n) + (6/n)/2;
    pinza2.position.z = -14/n;
    pinza2.position.x =  8/n;
    pinza2.rotation.x = -Math.PI;            //rotar 180 grados en el eje X

    pinza.add(base_pinza);  
    pinza.add(dedo1);

    pinza2.add(base_pinza2);  
    pinza2.add(dedo2);

    antebrazo.add(pinza);
    antebrazo.add(pinza2);

    
    scene.add( new THREE.AxesHelper(15) );           //x = rojo, y = verde, z = azul
    //pinza.add( new THREE.AxesHelper(1) );

}

function update()
{
    angulo += 0.005;
    brazo.rotation.y = angulo;
}

function render()
{
    requestAnimationFrame(render);
    //update();
    renderer.render(scene,camera);
}