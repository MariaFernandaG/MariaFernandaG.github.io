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
    camera= new THREE.PerspectiveCamera(80,aspectRatio,0.01,100);          // ángulo de visión vertical en grados
    camera.position.set(0,90,90);                                               // posición de la cámara
    camera.lookAt(0,10,10);                                                       // hacia dónde ve la cámara
}

function loadScene()
{
    // Material sencillo
    const material = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
    const materialS = new THREE.MeshBasicMaterial({color:'yellow',wireframe:true});

    // Suelo (perpendicular al eje Z)
    const suelo = new THREE.Mesh( new THREE.PlaneGeometry(1000/n,1000/n, 100,100), materialS );  //tamaña 1000x1000
    suelo.rotation.x = -Math.PI/2;          // Se rota el suelo (pi/2) para ponerlo perpendicular al eje Y (plano XZ)
    //suelo.position.y = -0.2;
    scene.add(suelo);

    //Base (cilíndro)
    const base = new THREE.Mesh( new THREE.CylinderGeometry( 50/n, 50/n, 15/n, 32 ), material );
    base.position.y = (15/n)/2;
    scene.add(base);

    //Brazo
    const eje = new THREE.Mesh( new THREE.CylinderGeometry( 20/n, 20/n, 18/n, 32 ), material );
    eje.rotation.x = -Math.PI/2;           //Rotar el eje sobre el eje X
    const esparrago = new THREE.Mesh( new THREE.BoxGeometry(18/n,120/n,12/n), material );
    const rotula = new THREE.Mesh( new THREE.SphereGeometry(20/n,40,40), material );
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
    
    scene.add( new THREE.AxesHelper(3) );           //x = rojo, y = verde, z = azul
    //cubo.add( new THREE.AxesHelper(1) );

}

function render()
{
    requestAnimationFrame(render);
    //update();
    renderer.render(scene,camera);
}