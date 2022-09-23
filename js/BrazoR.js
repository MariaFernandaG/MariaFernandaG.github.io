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
    camera= new THREE.PerspectiveCamera(75,aspectRatio,1,100);          // ángulo de visión vertical en grados
    camera.position.set(0.5,2,7);                                       // posición de la cámara
    camera.lookAt(0,1,0);                                               // hacia dónde ve la cámara
}

function loadScene()
{
    // Material sencillo
    const material = new THREE.MeshBasicMaterial({color:'yellow',wireframe:true});

    // Suelo (perpendicular al eje Z)
    const suelo = new THREE.Mesh( new THREE.PlaneGeometry(1000,10000, 10,10), material );  //tamaña 1000x1000
    suelo.rotation.x = -Math.PI/2;          // Se rota el suelo (pi/2) para ponerlo perpendicular al eje Y (plano XZ)
    //suelo.position.y = -0.2;
    scene.add(suelo);

    //Base (cilíndro)
    const base = new THREE.Object3D( new THREE.CylinderGeometry( 50, 50, 15, 32 ), material );
    scene.add(base);

    //Brazo
    const eje = new THREE.Mesh( new THREE.CylinderGeometry( 20, 20, 18, 32 ), material );
    eje.rotation.x = -Math.PI/2;           //Rotar el eje sobre el eje X
    const esparrago = new THREE.Mesh( new THREE.BoxGeometry(18,120,12), material );
    const rotula = new THREE.Mesh( new THREE.SphereGeometry(20,40,40), material );

    brazo = new THREE.Object3D();
    brazo.add(eje);
    brazo.add(esparrago);
    brazo.add(rotula);
    base.add(brazo);

    //Antebrazo
    const disco = new THREE.Mesh( new THREE.CylinderGeometry( 22, 22, 6, 32 ), material );
    const nervios = new THREE.Mesh( new THREE.BoxGeometry(4,80,4), material );
    const mano = new THREE.Mesh( new THREE.CylinderGeometry( 15, 15, 40, 32 ), material );
    mano.rotation.x = -Math.PI/2;           //Rotar la mano sobre el eje X

    antebrazo = new THREE.Object3D();
    //antebrazo.add(disco);
    //antebrazo.add(nervios);
    //antebrazo.add(mano);
    

    scene.add( new THREE.AxesHelper(3) );           //x = rojo, y = verde, z = azul
    //cubo.add( new THREE.AxesHelper(1) );

}

function update()
{
    angulo += 0.01;
    esferaCubo.rotation.y = angulo;
}

function render()
{
    requestAnimationFrame(render);
    //update();
    renderer.render(scene,camera);
}