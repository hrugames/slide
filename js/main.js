Main = function() {
  // Hello there
};


Main.prototype.run = function() {
  this.init();
  this.animate();
};

Main.prototype.init = function() {
  this.clock = new THREE.Clock();
  
  this.container = document.createElement('div');
  this.container.style.left = '0';
  this.container.style.right = '0';
  this.container.style.top = '0';
  this.container.style.bottom = '0';
  this.container.style.position = 'absolute';
  document.body.appendChild(this.container);
  
  this.renderer = new THREE.WebGLRenderer();
  this.container.appendChild(this.renderer.domElement);
  this.materials = new Materials(this.renderer);

  this.effect = new THREE.StereoEffect(this.renderer);

  this.camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
  this.camera.position.set(0, 10, 0);
  
  // Controls

  this.controls = new DeviceOrientationController(this.camera, this.renderer.domElement);
  this.controls.connect();
  
  this.world = new World(this.camera);
  this.world.init();
  
  this.scene = new THREE.Scene();

  var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
  this.scene.add(light);


/*
  var ambientLight = new THREE.AmbientLight(0xaaaaaa);
  this.scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 0.8, 0.5).normalize();
  this.scene.add(directionalLight);
*/

  var root = this.world.getRoot();
  this.scene.add(root);

  this.stats = new Stats();
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.top = '0px';
  this.container.appendChild(this.stats.domElement);

  var fs = document.createElement('img');
  fs.style.left = '0';
  fs.style.bottom = '0';
  fs.style.position = 'absolute';
  fs.style.maxWidth = '20%';
  fs.style.maxHeight = '20%';
  fs.style.opacity = '0.5';
  fs.src = "textures/fullscreen.png";
  fs.alt = 'Fullscreen';
  fs.addEventListener('click', $.proxy(this.fullscreen, this), false);
  this.container.appendChild(fs);


  this.animate_ = $.proxy(this.animate, this);

  window.addEventListener('resize', $.proxy(this.onWindowResize, this), false);
  setTimeout($.proxy(this.onWindowResize, this), 1);
};

Main.prototype.onWindowResize = function() {
  var width = this.container.offsetWidth;
  var height = this.container.offsetHeight;

  this.camera.aspect = width / height;
  this.camera.updateProjectionMatrix();
    
  this.renderer.setSize(width, height);
  this.effect.setSize(width, height);
};

Main.prototype.animate = function() {
  requestAnimationFrame(this.animate_);

  this.update(this.clock.getDelta());
  this.render(this.clock.getDelta());
};

Main.prototype.update = function(dt) {
  this.world.update(dt);
  this.camera.updateProjectionMatrix();
  this.controls.update(dt);
  this.stats.update();
};

Main.prototype.render = function(dt) {
  this.effect.render(this.scene, this.camera);
};

Main.prototype.fullscreen = function() {
  if (this.container.requestFullscreen) {
    this.container.requestFullscreen();
  } else if (this.container.msRequestFullscreen) {
    this.container.msRequestFullscreen();
  } else if (this.container.mozRequestFullScreen) {
    this.container.mozRequestFullScreen();
  } else if (this.container.webkitRequestFullscreen) {
    this.container.webkitRequestFullscreen();
  }
};

(function() {
  var m = new Main();
  m.run();
})();