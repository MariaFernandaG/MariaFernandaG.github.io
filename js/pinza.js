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
let n = 10;

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
    camera= new THREE.PerspectiveCamera(75,aspectRatio,0.01,100);          // ángulo de visión vertical en grados
    camera.position.set(0,30,30);                                               // posición de la cámara
    camera.lookAt(0,10,10);                                                       // hacia dónde ve la cámara
}

function loadScene()
{
    // Material sencillo
    const material = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
    const materialS = new THREE.MeshBasicMaterial({color:'yellow',wireframe:true});
    const materialD = new THREE.MeshBasicMaterial({color:'blue',wireframe:true});

    // Suelo (perpendicular al eje Z)
    const suelo = new THREE.Mesh( new THREE.PlaneGeometry(1000/n,1000/n, 1000/n,1000/n), materialS );  //tamaña 1000x1000
    suelo.rotation.x = -Math.PI/2;          // Se rota el suelo (pi/2) para ponerlo perpendicular al eje Y (plano XZ)
    //suelo.position.y = -0.2;
    scene.add(suelo);

    //Pinzas
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array( [
        (19/n)/2, (-16/n)/2, 0,
        (19/n)/2, (-16/n)/2, -2/n,
        (19/n)/2, (16/n)/2, -2/n,
        (19/n)/2, (16/n)/2, 0,
        (-19/n)/2, (20/n)/2, 2/n,
        (-19/n)/2, (20/n)/2, -2/n,
        (-19/n)/2, (-20/n)/2, -2/n,
        (-19/n)/2, (-20/n)/2, 2/n,
    ] );
    
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const dedo1 = new THREE.Mesh( geometry, materialD);
    dedo1.position.x = (19/n)/2;

    const base_pinza = new THREE.Mesh( new THREE.BoxGeometry(19/n,20/n,4/n), materialD );

    pinza = new THREE.Object3D();
    pinza.position.y = (80/n) + (6/n)/2;
    pinza.position.z = -10/n;

    pinza.add(base_pinza);  
    pinza.add(dedo1);
    scene.add(pinza);

    scene.add( new THREE.AxesHelper(3) );           //x = rojo, y = verde, z = azul
    pinza.add( new THREE.AxesHelper(3) );
}

function render()
{
    requestAnimationFrame(render);
    //update();
    renderer.render(scene,camera);
}