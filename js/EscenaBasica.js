// Modulos necesarios
import * as THREE from "../lib/three.module.js";
import {GLTFLoader} from "../lib/GLTFLoader.module.js";

// Variables de concenso 
let renderer, scene, camera, cubo;
// Globales
let esferaCubo;
let angulo = 0.01;

// Acciones
init();
scene();
render();

function init()
{
  //Instanciar el motor
  renderer = new THREE.WebGLRenderer();
  //Utilizo toda el área para dibujar
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( new THREE.Color(0xFFFFFF) );
  document.getElementById('container').appendChild( renderer.domElement );

  //Construyo la escena
  scene = new THREE.Scene();
  //color a la escena
  scene.background = new THREE.Color(0.5,0.5,0.5);

  //Construyo la cámara 
  var aspectRatio = window.innerWidth / window.innerHeight;
  //ángulo de visión vertical en grados
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight , 0.1, 100 );
  //posición de la cámara
  camera.position.set( 0.5, 2, 7);
  //hacia donde ve la cámara 
  camera.lookAt( new THREE.Vector3( 0, 1, 0 ) );

}

function loadScene(lado)
{
  //material 
  const material = new THREE.MeshBasicMaterial({color:"yellow",wireframe: true});

  //Suelo (perpendicular al eje z)
  const suelo = new THREE.Mesh( THREE.PlaneGeometry(10,10, 10,10). material);
  //Se rota el suelo para ponerlo perpendicular al eje y
  suelo.setRotationFromAxisAngle.x = -Math.PI/2;
  scene.add(suelo);
  suelo.position.y = -0.2;

  //cubo y esfera
  const cubo = new THREE.Mesh( new THREE.BoxGeometry(2,2,2),material);
  //20 rajas horizontal y 20 vertical
  const esfera = new THREE.Mesh( new THREE.BoxGeometry(1,20,20), material);

  //Así añado la esfera y el cubo a esferaCubo y luego esferaCubo a la escena 
  const esferaCubo = new THREE.Object3D();
  esferaCubo.add(cubo);
  esferaCubo.add(esfera);

  //Traslaciones sobre el sistema padre(esferaCubo)
  cubo.position.x = -1;
  esfera.position.x = 1;
  //Al trasladar esferaCubo traslado todo lo que está dentro (es decir cubo y esfera tienen dos traslaciones)
  esferaCubo.position.y = 1.5;

  scene.add(esferaCubo);

  //Así los añado directamente a la escena 
  //scene.add(cubo);
  //scene.add(esfera);

  //IMPORTAR MODELO json Three.js
  const loader = new THREE.ObjectLoader();
  loader.load("models/soldade/soldade.json",function(objeto){
    cubo.add(objeto);
    //posición respecto al cubo 
    objeto.position.set(0,1,0); 
  });

  //IMPORTAR MODELO EN FORMATO GLIF
  //const glloader = new THREE.GLTFLoader();
  //glloader.load("models/RobotEspessive.glb",
  //function(gltf)
  //{
  //  gltf.scene.position.y = 1;
  //  gltf.scene.rotation.y = -Math.PI/2;
    //sacar cosas por consola (consultar estructura de datos que viene del objeto glft)

  //});

  //ver donde están los ejes 
  scene.add(new THREE.AxesHelper(3));
}

//Función para animación
function update(){
    angulo += 0.01;   //al ángulo le suma 0.01
    //El objeto esfera cubo gira con esta rotación (el movimiento lo hacen también todos los elementos dentro de esferaCubo)
    objeto.position.set(0,1,0);
}

function render()
{
  //Bucle infinito
	requestAnimationFrame( render );
  //carga la escena
    update();
  //toma la foto de la escena don esa cámara (puedo tener muchas escenas y cámaras)
	renderer.render( scene, camera );
}


