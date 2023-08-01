import * as THREE from './libs/node_modules/three/build/three.module.js';
import { OrbitControls } from './libs/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { ConvexGeometry } from './libs/node_modules/three/examples/jsm/geometries/ConvexGeometry.js';
import * as dat from './dat.gui.min.js';

const initial = () => {
	var renderer;

	var scene;

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(150, 100, 0);

	var controls;

	//Konstantos figūros generavimo valdymui
	var R1 = 40; // Apatinis spindulys
	var R2 = 20; // Viršutinis spindulys
	var H = 40; //Aukštis
	var NO_OF_POINTS = 500; // Kiek taškų sudėliosim

	function init() {
		var options = {
			tiksli_forma: false,
			apatinis_spindulys: 40,
			virsutinis_spindulys: 20,
			aukstis: 40,
			tasku_kiekis: 500,
			kvadraciuku_dydis: 4
		};
		var gui = new dat.GUI();
		//Kiekvieną kart baigus keist nustatymus iš naujo surenderinama scena
		gui.add(options, 'tiksli_forma', 0, 200).listen().onFinishChange(() => {render(options)});
		gui.add(options, 'apatinis_spindulys', 0, 200).listen().onFinishChange(() => {render(options)});
		gui.add(options, 'virsutinis_spindulys', 0, 200).listen().onFinishChange(() => {render(options)});
		gui.add(options, 'aukstis', 0, 200).listen().onFinishChange(() => {render(options)});
		gui.add(options, 'tasku_kiekis', 0, 1000).listen().onFinishChange(() => {render(options)});
		gui.add(options, 'kvadraciuku_dydis', 0, 10).listen().onFinishChange(() => {render(options)});
		render(options);
	}

	//Pagrindinė funkcija viską surendinanti
	function render(options) {
		R1  = options.apatinis_spindulys;
		R2 = options.virsutinis_spindulys;
		H = options.aukstis;
		NO_OF_POINTS = options.tasku_kiekis;
		document.getElementById("webgl-output").innerHTML = ''; //ištrinam prieš tai buvusius objektus
		
		//Sukuriam sceną, renderį ir kameros valdymą
		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(new THREE.Color(0x000000));
		renderer.setSize(window.innerWidth, window.innerHeight);
		controls = new OrbitControls( camera, renderer.domElement );
		
		//Pridedam Ambient šviesą
		const light = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
		scene.add( light );
		
		//Pridedam Spotlight šviesą
		const spotLight = new THREE.SpotLight( 0xffffff);
		spotLight.position.set( 0, 250, 0 );
		spotLight.castShadow = true;
		scene.add( spotLight );
		
		
		//Pagalbinės konstantos gaunamos iš figūros parametrų
		const D = (H/2) * (R1 + R2)/(R1 - R2);
		const M = Math.pow(R1-R2, 2)/Math.pow(H, 2);
		
		//Kol pasieksim noriamą taškų kiekį, juos atsitiktinai generuojam ir jei tinka dedam į taškų masyvą
		var points = [];
		while(points.length < NO_OF_POINTS) {
			//Generuojam atsitiktinius taškus nuo -1 iki 1 (sugeneruojam nuo 0 iki 1, tada padauginam iš 2 ir atimam 1) ir padauginam iš atitinkamu parametrų
			var x = (Math.random()* 2 - 1) * R1; 
			var z = (Math.random()* 2 - 1) * R1;
			var y = (Math.random()* 2 - 1) * H/2; //kadangi aukštis, ne taip kaip spinduliai yra visas išmatavimas, ne jo pusę, tai reikia dar padalint iš dviejų.
			if (Math.pow(x,2) + Math.pow(z,2) < M*Math.pow(y-D, 2)) { //jei taškas patenka į figūros formulę, tada jį išsaugom
				var point = new THREE.Vector3(x,y,z);
				points.push(point);
			}
		}
		
		//Tekstūros paruošimas ir medžiagos sukūrimas
		const texture = new THREE.TextureLoader().load( "textures/checkers64.png" );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		//Kadangi tekstūros ilgio daugiau naudojam, todėl repeatint turim daugiau ilgį. santykį paskaičiuojam padalindami apatinio apskritimo ilgį iš figūros aukščio
		//Kadangi tekstūra smulki, tai tą pakartojimo skaičių mažinant kvadračiukai padidės
		texture.repeat.set( (options.apatinis_spindulys*2*Math.PI)/options.aukstis/options.kvadraciuku_dydis,1/options.kvadraciuku_dydis );
		const material = new THREE.MeshPhongMaterial();
		material.map = texture;

		//Sukūriam geometriją pagal taškus ir visiems jos sienoms paskaičiuojam naujus UV
		var geometry = new ConvexGeometry(points);
		for(var i = 0; i< geometry.faces.length; i++) {
			var face = geometry.faces[i];
			
			//Paskaičiuojam UV visiem trim sienos viršūnėm
			var uv1 = mapUV(geometry.vertices[face.a]);
			var uv2 = mapUV(geometry.vertices[face.b]);
			var uv3 = mapUV(geometry.vertices[face.c]);
			
			//Paskaičiuojam kuriam vienetinio apskritimo ketvirčiui kiekviena uv priklauso
			var quadrant1 = [];
			var quadrant4 = [];
			groupQuadrants(quadrant1, quadrant4, uv1);
			groupQuadrants(quadrant1, quadrant4, uv2);
			groupQuadrants(quadrant1, quadrant4, uv3);
			
			//jei yra viršunų ir pirmas ir ketvirtam ketvirty, pastūmiam pirmo ketvirčio viršūnes, kad panaikint zebro efektą
			if(quadrant1.length > 0 && quadrant4.length > 0) {
				for(var j = 0; j < quadrant1.length; j++) {
					quadrant1[j].x++;
				}
			}
			
			//visus sienos uv sudedam į geometriją
			geometry.faceVertexUvs[0].push([uv1, uv2, uv3]);
		}
		
		//parametras nustatomas, kai uv modifikuojama ranka, kad karkasas atnaujintų reikiamus duomenis
		geometry.uvsNeedUpdate = true;
		
		//pridedam figūrą į sceną
		var mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );
		
		//jei reikia generuojam tikslią figūrą.
		if (options.tiksli_forma) {
			geometry = new THREE.ParametricGeometry( exampleGeometryF, 25, 25 );
			mesh = new THREE.Mesh( geometry, material );
			scene.add( mesh );
		}

		// Pridedam surenderintą vaizdą prie html, kad pavaizduot viską
		document.getElementById("webgl-output").appendChild(renderer.domElement);

		// surenderinam sceną
		renderer.render(scene, camera);
	}

	//Pagalbinė funkcija uv koordinatėm nustatyti
	function mapUV(vertex) {
		var v = (vertex.y + H/2)/H;
		var u = Math.atan2(vertex.x, vertex.z) / 2 / Math.PI;
		if(u < 0) { //jei u minusinis normalizuojam, kad būtų nuo 0 iki 1;
			u++;
		}
		return new THREE.Vector2(u,v);
	}

	//Pagalbinė funkcija nustatyt kuriam ketvirčiui uv priklauso
	function groupQuadrants(quadrant1, quadrant4, uv) {
		if(uv.x >= 0.75) {
			quadrant4.push(uv);
		}
		
		if(uv.x <= 0.25) {
			quadrant1.push(uv);
		}
	}

	//Tikslios figūros parametrinė funkcija
	function exampleGeometryF(u,v, target){
	var x = ((1-v) * R1 + v * R2) * Math.sin(2* Math.PI * u);
	var y = H/2 * (2 * v - 1);
	var z = ((1-v) * R1 + v * R2) * Math.cos(2* Math.PI * u);
	target.set(x,y,z);
	}

	//funkcija animacijai, šiuo atveju, judėjimui aplink sceną
	function animate() {

		requestAnimationFrame( animate );

		// required if controls.enableDamping or controls.autoRotate are set to true
		controls.update();

		renderer.render( scene, camera );

	}

	init();
	animate();
}

export default initial;