class CannonBall {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.trajectory=[];

    var options = {
      isStatic: true,
    };

    this.body = Matter.Bodies.circle(this.x, this.y, this.r, options);
    World.add(world, this.body);

    this.image = loadImage("assets/cannonball.png");
  }

  shoot(){
    var velocity = p5.Vector.fromAngle(cannon.angle)
    velocity.mult(20)
    Matter.Body.setStatic(this.body,false)
    Matter.Body.setVelocity(this.body,{x:velocity.x, y:velocity.y})
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    if(this.body.velocity.x>0 && this.body.position.x > 220){
    var position = [pos.x, pos.y]
    this.trajectory.push(position)
    }

    for(i = 0; i<this.trajectory.length; i+=1){
      image(this.image,this.trajectory[i][0], this.trajectory[i][1],8,8)
    }

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    pop();
  }
}
