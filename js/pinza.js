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
    scene.background = new THREE.Color(0.5,0.5,0.5);                    // Color de la escena

    // Instanciar la camara
    var aspectRatio = window.innerWidth / window.innerHeight;
    camera= new THREE.PerspectiveCamera(75,aspectRatio,0.1,10000);          // ángulo de visión vertical en grados
    camera.position.set(0,50,50);                                               // posición de la cámara
    camera.lookAt(0,10,10);                                                       // hacia dónde ve la cámara
}

function loadScene()
{
    // Material sencillo
    const material = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
    const materialS = new THREE.MeshBasicMaterial({color:'yellow',wireframe:true});
    const materialD = new THREE.MeshBasicMaterial({color:'red',wireframe:true});

    // Suelo (perpendicular al eje Z)
    const suelo = new THREE.Mesh( new THREE.PlaneGeometry(1000/n,1000/n, 1000/n,1000/n), materialS );  //tamaña 1000x1000
    suelo.rotation.x = -Math.PI/2;          // Se rota el suelo (pi/2) para ponerlo perpendicular al eje Y (plano XZ)
    suelo.position.y = -0.2;
    //scene.add(suelo);

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
    //geometry.setAttribute( 'normal', new THREE.BufferAttribute(normales, 3) );
    const dedo1 = new THREE.Mesh( geometry, materialD);
    dedo1.position.x = (19/n);

    const base_pinza = new THREE.Mesh( new THREE.BoxGeometry(19/n,20/n,4/n), materialD );

    pinza = new THREE.Object3D();
    //pinza.position.y = (80/n) + (6/n)/2;
    //pinza.position.z = -10/n;

    pinza.add(base_pinza);  
    pinza.add(dedo1);
    scene.add(pinza);

    const helper = new THREE.VertexNormalsHelper(dedo1, 5, 0x00ff00);

    scene.add( new THREE.AxesHelper(3) );           //x = rojo, y = verde, z = azul
    pinza.add( new THREE.AxesHelper(3) );
    scene.add(helper);
}

function render()
{
    requestAnimationFrame(render);
    //update();
    renderer.render(scene,camera);
}