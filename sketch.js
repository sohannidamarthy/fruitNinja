

var Play =1 ;
var End = 0;
var gameState=1;


var sword,swordImage;
var fruit1, fruit2, fruit3,fruit4, fruitsGroup;
var alienGroup, alien1, alien2;
var swoosh;
var score;

var overSound;

var gameOver, overImage;


function preload(){
  swordImage=loadImage("sword.png")
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  alien1= loadImage("alien1.png");
  alien2= loadImage("alien2.png");
  
  swoosh= loadSound("knifeSwooshSound.mp3")
  
  overImage= loadImage("gameover.png");
  overSound=loadSound("gameover.mp3")
}


function setup(){
  sword=createSprite(40,200,200,200);
  sword.addImage("sword",swordImage);
  sword.scale=0.5;
  
  sword.setCollider("rectangle",0,0,50,50)
  sword.debug=true
  
  gameOver=createSprite(200,200,40,40)
  gameOver.addImage("gameover",overImage);
  
  fruitsGroup = createGroup();
  alienGroup = createGroup();
  
  score = 0
  
  
  
  
}


function draw(){
  background(225);
  text("Score:"+score,330,70)
  
  console.log("this is", gameState)
  


  
  if (gameState === Play){
    gameOver.visible=false
    sword.y=World.mouseY
    sword.x=World.mouseX;
    console.log(sword.x);
    callFruits();
    callAlien();
    if(fruitsGroup.isTouching(sword)){
      fruitsGroup.setLifetimeEach(0);
      swoosh.play();
      score+=1
     }
    if (alienGroup.isTouching(sword)){
      overSound.play();
      gameState=End;
      
    }
  }
  if(gameState===End){
    gameOver.visible=true
    sword.x=200;
    sword.y=200;
  }
  
 
  drawSprites();
}

function callFruits(){
  if (frameCount % 40 === 0){
    var fruits =
        createSprite(Math.round(random(10,390)),0,10,10);
    fruits.velocityY=10+Math.round(score/10);
    var rand= Math.round(random(1,4))
    switch(rand){
      case 1: fruits.addImage(fruit1);
              break;
      case 2: fruits.addImage(fruit2);
              break;
      case 3: fruits.addImage(fruit3);
              break;
      case 4: fruits.addImage(fruit4);
              break;
      default: break;
      
    }
    fruits.scale=0.2;
    fruits.lifetime=400;
    
    fruitsGroup.add(fruits);
  }
  
}
function callAlien(){
  if(frameCount % 50-Math.round(score/2) === 0){
    var Alien= createSprite(Math.round(random(10,390),0,10,10));
    Alien.velocityY=10+Math.round(score/5);
    var rand= Math.round(random(1,2))
    switch(rand){
      case 1: Alien.addImage(alien1);
              break;
      case 2: Alien.addImage(alien2);
              break;
     default: break;
    }
    Alien.scale=0.7
    Alien.lifetime=400;
    
    alienGroup.add(Alien);
  }
}