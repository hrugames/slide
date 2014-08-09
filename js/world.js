World = function(camera) {
  this.root_ = new THREE.Object3D();
  this.root_.position.x = -World.X_SIZE / 2;
  this.root_.position.z = -World.Z_SIZE / 2;
  
  this.camera_ = camera;
};

// World
World.X_SIZE = 200;
World.Y_SIZE = 30;
World.Z_SIZE = 200;


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

};

/**
 * @private
 */
World.prototype.buildMesh_ = function() {
  var geometry = new THREE.PlaneGeometry(1000, 1000);
  var mesh = new THREE.Mesh(geometry, Materials.get(Materials.CHECKER));
  mesh.rotation.x = -Math.PI / 2;
  this.root_.add(mesh);
};

/**
 * @private
 */
World.prototype.moveCamera_ = function() {
  //  this.camera.position = new THREE.Vector3(0.5, 0.5);
};


World.prototype.update = function(dt) {

};