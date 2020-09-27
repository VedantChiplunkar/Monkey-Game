var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(400,400);
  score=0;
  monkey=createSprite(50,360,10,30);
  monkey.addAnimation("running",monkey_running);
monkey.scale=0.1;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  ground=createSprite(200,390,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
}


function draw() {
background("white");
  
text("Score: "+ score, 350,30);
  
  if(gameState === PLAY){

  if (keyDown("space")){
monkey.velocityY=-12; 
  }
    
  
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+2;
  }
    
    monkey.velocityY=monkey.velocityY+0.8;
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(obstacleGroup.isTouching(monkey)){
        //trex.velocityY = -12;
        FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
        gameState = END;
        
      
    }
  }
   else if (gameState === END) {
      text("GAME OVER",170,200);
     ground.velocityX=0;
     monkey.velocityY=0;
     score=0
     if (keyDown("r")){
gameState=PLAY;
  }
     obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);  
   }
  
  
  
  
  spawnfruit();
  spawnobstacle();
  
  monkey.collide(ground);
  drawSprites();
}

function spawnfruit() {
  //write code here to spawn the clouds
  if (frameCount % 110 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(bananaImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(cloud);
  }
}

function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 130 === 0) {
    var clod = createSprite(600,390,40,10);
    clod.y = Math.round(random(370,370));
    clod.addImage(obstacleImage);
    clod.scale = 0.1;
    clod.velocityX = -3;
    
     //assign lifetime to the variable
    clod.lifetime = 500;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(clod);
  }
}




