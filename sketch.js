const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImage;
var ground;
var cannon;
var myboat;

var mycannonBall;
var balls = [];
var boats = [];
var boatJson
var boatImage
var boatAnimation =[]
var explosion
var piratelaugh
var BackgroundMusic

var brokenJson, brokenImage
var brokenAnimation = []
var isgameover = false


function preload(){
  backgroundImage = loadImage("assets/background.gif")
  boatJson = loadJSON("./assets/boat/boat.json")
  boatImage = loadImage("./assets/boat/boat.png")
  explosion = loadSound("assets/cannon_explosion.mp3")
  piratelaugh = loadSound("assets/pirate_laugh.mp3")
  BackgroundMusic = loadSound("assets/background_music.mp3")

  brokenJson = loadJSON("assets/boat/broken_boat.json")
  brokenImage = loadImage("assets/boat/broken_boat.png")
}

function setup() {
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  tower = new Tower(150,350,160,310)
  ground = new Ground(600,560,width,10)
  cannon = new Cannon(180,100,110,50, -PI/4)
 // myboat = new Boat(width, height - 100, 200,200)
  
 var brokenFrames = brokenJson.frames
 for(var i = 0; i<brokenFrames.length; i+=1){
  var pos = brokenFrames[i].position
  var img = brokenImage.get(pos.x,pos.y,pos.w,pos.h)
  brokenAnimation.push(img)
  console.log(boatAnimation)
 }
  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(backgroundImage);
  Engine.update(engine);

  tower.display()
  //ground.display()
  cannon.display()
 // mycannonBall.display()
 // myboat.display()

for (var i = 0; i < balls.length; i+=1){
  showCannonBalls(balls[i],i)
  for (var j = 0; j< boats.length; j +=1){
    if (balls[i] !== undefined && boats[j] !== undefined){
      var collision = Matter.SAT.collides(balls[i].body, boats[j].body)
      if (collision.collided){
        boats[j].remove(j)
        j--
        Matter.World.remove(world, balls[i].body)
        balls.splice(i,1)
        i--
      }
    }
  }
}





  //Matter.Body.setVelocity(myboat.body,{x:-5, y:0})
showBoats()
    
if(!BackgroundMusic.isPlaying()){
  BackgroundMusic.play()
  BackgroundMusic.setVolume(0.05)
  
}


 for(i = 0; i < balls.length; i+=1){
  showCannonBalls(balls[i],i)
 }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    mycannonBall = new CannonBall(cannon.x, cannon.y, 50)
    balls.push(mycannonBall)
  }
}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
  balls[balls.length - 1].shoot()
  explosion.play()
}
}

function showCannonBalls(ball, index){
  ball.display()

  if(ball.body.position.x>=width || ball.body.position.y>=height-100){
    World.remove(world,ball.body)
    balls.splice(index,1)


  }

}

function showBoats(){
  if(boats.length>0){

    if(boats.length < 7 && boats[boats.length-1].body.position.x < width - 400){

    var position = [-40,-60,-70,-30]
    var b = random(position)
    
    var myboat = new Boat(width-10,height-100,150,150,b)
    boats.push(myboat)
    }
    for(var i=0; i<boats.length; i+=1){
      Matter.Body.setVelocity(boats[i].body,{x:-1.5, y:0})
    
      boats[i].display()
      boats[i].animate()

      var collision = Matter.SAT.collides(tower.bod,boats[i].body)
      if(collision.collided){
        piratelaugh.play()
        isgameover = true
        GameOver()

      }

    }

    
  }

  else{

    myboat = new Boat(width-10,height-100,150,150,-60)
    boats.push(myboat)
  }
}

function GameOver(){
  showCannonBalls({
    title: "Game Over",
    text: "Thanks for playing",
  },
  
  function(isConfirm){
    if(isConfirm){
      location.reload()
    }
  })
}