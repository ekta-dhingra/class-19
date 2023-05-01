var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

  doorsGroup=new Group();
  climbersGroup=new Group();
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost= createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3

  invisibleBlockGroup=new Group();

}

function draw() {
  background(200);

  if (gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("left")){
      ghost.x=ghost.x-3
    }

    if (keyDown("right_arrow")){
      ghost.x=ghost.x+3
    }

    if (keyDown("space")){
      ghost.velocityY=-5
    }

    ghost.velocityY=ghost.velocityY+0.8

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState="end"
    }

    spawnDoors();
    drawSprites()


  }

  if (gameState=="end"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over",230,250)
  }
  
  

   

    
}

function spawnDoors(){

  if(frameCount%240==0){
    var door= createSprite(200,-50)
    door.addImage(doorImg);
    door.velocityY=1

    door.x=Math.round(random(120,400));

    door.lifetime=800;
    doorsGroup.add(door)

    var climber= createSprite(200,10)
    climber.addImage(climberImg);
    climber.velocityY=1
    climber.x=door.x;
    climber.lifetime=800;
    climbersGroup.add(climber)


    ghost.depth=door.depth;
    ghost.depth= ghost.depth+1


    
    var invisibleBlock= createSprite(200,15)
   invisibleBlock.width=climber.width;
   invisibleBlock.height=2;
    invisibleBlock.velocityY=1
    invisibleBlock.x=door.x;
    invisibleBlock.lifetime=800;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock)


  }
}
