Ramp = function(width, height, startAngle, endAngle) {
  this.width_ = width;
  this.height_ = height;
  this.startAngle_ = startAngle;
  this.endAngle_ = endAngle;
  this.buildGeom_();
};

Ramp.prototype.buildGeom_ = function() {
  var last, pos, p, x, na;
  /*
  last = new THREE.Vector2(0, 0); 
  pos = new THREE.Vector2(0, 0);
  for (var i = 0; i < Ramp.ITER; ++i) {
  	x = this.width * (i + 1.0) / Ramp.ITER;
  	na = this.startAngle_ + (this.endAngle_ - this.startAngle_) * ;
  	y = 
  	pos.set(x, )
  }
  */
};

Ramp.ITER = 10;