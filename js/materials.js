Materials = function(renderer) {
  this.renderer_ = renderer;
  this.cache_ = {};
  Materials.instance_ = this;
};

Materials.ERROR = 0;
Materials.CHECKER = 1;

Materials.instance_ = null;

Materials.get = function(type) {
  if (!Materials.instance_) {
    return null;
  }
  return Materials.instance_.get(type);
};

Materials.prototype.get = function(type) {
  if (!this.cache_[type]) {
    this.cache_[type] = this.loadMaterial_(type);
  }
  return this.cache_[type];
}

/**
 * @private
 */
Materials.prototype.loadMaterial_ = function(type) {
  var texture;
  switch (type) {
    case Materials.CHECKER:
      return new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: this.loadTexture_('textures/checker.png', new THREE.Vector2(50, 50))
      });
  }
  return new THREE.MeshLambertMaterial({
    map: this.loadTexture_('textures/error.png'),
  });
};

/**
 * @private
 */
Materials.prototype.loadTexture_ = function(fn, repeat) {
  var texture = THREE.ImageUtils.loadTexture(fn);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  if (repeat) {
    texture.repeat = repeat;
  }
  texture.anisotropy = this.renderer_.getMaxAnisotropy();
  return texture;
};
