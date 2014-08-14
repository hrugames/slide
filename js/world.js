World = function(camera) {
  this.root_ = new THREE.Object3D();
  
  this.world_ = new CANNON.World();
  this.world_.gravity.set(0, -9.82, 0);
  this.world_.broadphase = new CANNON.NaiveBroadphase();

  this.camera_ = camera;

  this.remainingDt_ = 0; 
};

// World
World.X_SIZE = 200;
World.Y_SIZE = 30;
World.Z_SIZE = 200;

World.PHYSICS_DT = 1 / 60;
World.MAX_DT = World.PHYSICS_DT * 10;
World.MAX_PHYSICS_SIMULATION_ITER = 15;

World.prototype.init = function() {
  this.createRandomWorld_();
  this.buildMesh_();
  this.moveCamera_();
};


World.prototype.getRoot = function() {
  return this.root_;
};


/**
 * @private
 */
World.prototype.createRandomWorld_ = function() {
  var groundMaterial = new CANNON.Material();

  var groundShape = new CANNON.Plane();
  var groundBody = new CANNON.RigidBody(0, groundShape, groundMaterial);
  groundBody.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
  this.world_.add(groundBody);
  var geometry = new THREE.PlaneGeometry(1000, 1000);
  var mesh = new THREE.Mesh(geometry, Materials.get(Materials.CHECKER));
  $.copyQuat(mesh.quaternion, groundBody.quaternion);
  this.root_.add(mesh);
  
  groundShape = new CANNON.Plane();
  groundBody = new CANNON.RigidBody(0, groundShape, groundMaterial);
  groundBody.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2 - Math.PI / 8 );
  this.world_.add(groundBody);
  geometry = new THREE.PlaneGeometry(1000, 1000);
  mesh = new THREE.Mesh(geometry, Materials.get(Materials.CHECKER));
  $.copyQuat(mesh.quaternion, groundBody.quaternion);
  this.root_.add(mesh);

  
  groundShape = new CANNON.Plane();
  groundBody = new CANNON.RigidBody(0, groundShape, groundMaterial);
  groundBody.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2 + Math.PI / 8 );
  this.world_.add(groundBody);
  geometry = new THREE.PlaneGeometry(1000, 1000);
  mesh = new THREE.Mesh(geometry, Materials.get(Materials.CHECKER));
  $.copyQuat(mesh.quaternion, groundBody.quaternion);
  this.root_.add(mesh);


  var sphereMaterial = new CANNON.Material();
  var mass = 5, radius = 1;
  var sphereShape = new CANNON.Sphere(radius);
  this.sphere_ = new CANNON.RigidBody(mass, sphereShape, sphereMaterial);
  this.sphere_.position.set(25,22,-20);
  this.world_.add(this.sphere_);
  geometry = new THREE.SphereGeometry(radius, 32, 32);
  mesh = new THREE.Mesh(geometry, Materials.get(Materials.CHECKER));
  mesh.position.copy(this.sphere_.position);
  this.sphere_.mesh = mesh; 
  this.root_.add(mesh);

  this.world_.addContactMaterial(
      new CANNON.ContactMaterial(groundMaterial, sphereMaterial, 0.1, 0.75));
};

/**
 * @private
 */
World.prototype.buildMesh_ = function() {
};

/**
 * @private
 */
World.prototype.moveCamera_ = function() {
  //  this.camera.position = new THREE.Vector3(0.5, 0.5);
};


World.prototype.update = function(dt) {
  dt = Math.min(World.MAX_DT, dt);
  this.remainingDt_ += dt;
  var i = 0;
  while (this.remainingDt_ >= World.PHYSICS_DT && i < World.MAX_PHYSICS_SIMULATION_ITER) {
    this.world_.step(World.PHYSICS_DT);
    this.remainingDt_ -= World.PHYSICS_DT;
    ++i;
  }
  this.sphere_.mesh.position.copy(this.sphere_.position);
  $.copyQuat(this.sphere_.mesh.quaternion, this.sphere_.quaternion);
};