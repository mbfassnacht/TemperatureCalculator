var SpookyEl = require('spooky-element');
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var TweenMax = require('gsap');
var domSelect = require('dom-select');
var Thermometer = require('../ui/Thermometer');
var ControlPanel = require('../ui/ControlPanel');
var Signal = require('signals');

var controls;
var clock = new THREE.Clock();

class Canvas extends SpookyEl {

    constructor(data){


        this.template = require('../templates/ui/Canvas.hbs');
         // renderer

        this.renderer = new THREE.WebGLRenderer();

        super(data);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        var _this = this;

        this.view.appendChild(this.renderer.domElement);

        // camera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 8000);
        this.camera.position.z = 1000;
        this.camera.position.X = 0;
        this.camera.position.y = 0;

        this.onCanvasReady = new Signal();
        // scene
        this.scene = new THREE.Scene();

        var loader = new THREE.ObjectLoader();


        loader.load( "js/models/cup.json", ( obj ) => {
            console.log(obj);
            this.scene.add(obj);
            this.onCanvasReady.dispatch();
        } );

        var directionalLight_1 = new THREE.DirectionalLight( 0xffffff, 0.3 );
        directionalLight_1.position.set( 50, -100, 150 );
        this.scene.add( directionalLight_1 );

        var directionalLight_2 = new THREE.DirectionalLight( 0xffffff, 0.8 );
        directionalLight_2.position.set( -200, 200, -100 );
        this.scene.add( directionalLight_2 );

        var light = new THREE.AmbientLight( 0x2E2E2E ); // soft white light 
        this.scene.add( light );

        controls = new OrbitControls( this.camera );
        controls.addEventListener( 'change', this.animate );

        // start animation
        this.animate();




    }
    animateIn(){

    }

    animate(){
        var _this = this;
        _this.renderer.render(_this.scene, _this.camera);

        // request new frame
        requestAnimationFrame( ()=>{
            _this.animate();
        });
    }

    addCafe(){
        this.scene.add( this.cafe );
    }

}

module.exports = Canvas;