var car,boy,path,coin,coinG;
var carImg,pathImg,coinImg, coneGroup, coneImage, cone2, cone2Group;
var score;
var PLAY=1, END=0;
var gameState = PLAY;

function preload()
{
  carImg = loadImage("car.png");

  pathImg = loadImage("road.png");

  coinImg = loadImage("coin.png");

  coneImage = loadImage("cone.png")

  dieSound = loadSound("gameover.wav")

  foodSound = loadSound("point.wav")

}

function setup() {
  createCanvas(1500,900);

 path = createSprite(650,340);
 path.addImage(pathImg);
 path.velocityY = 10;
 path.scale = 6;

 car = createSprite(400,700,20,20);
 car.addImage(carImg);
 car.scale = 0.1;
 
 coinG = new Group()

 coneGroup = new Group();

 cone2Group = new Group();

 score  = 0;
}

function draw() {
  background(255,255,255); 

  if(gameState === PLAY)
  {
  textSize(50);
  fill("blue");
  text("Score: "+ score, 1000,350);

  car.x = World.mouseX;
  
  edges= createEdgeSprites();
  car.collide(edges);

  if(path.y>600){
    path.y = height/2;
  }

  createCoin(); 

  if(coinG.isTouching(car))
  {
    coinG.destroyEach();
    score= score + 1;
    foodSound.play();
  }

  spawnCone();

  if(score>10)
  {
    spawnCone2();
  }

  if(coneGroup.isTouching(car))
  {
    gameState = END;
    dieSound.play();
  }

  if(cone2Group.isTouching(car))
  {
    gameState = END;
    dieSound.play();
  }
}
else if(gameState === END)
{
  car.visible = false;
  coneGroup.destroyEach();
  cone2Group.destroyEach();
  path.velocity = 0;
}

  drawSprites();


  textSize(40);
  fill("black");
  text("score:" + score, 100, 100);
}

function createCoin(){
  if(World.frameCount % 80 == 0)
  {
    var coin = createSprite(Math.round(random(100,500),100,50,50))
    coin.addImage(coinImg);
    coinG.add(coin);
    coin.scale = 0.07;
    coin.velocityY=10;

  }
}

function spawnCone()
{
    if(frameCount % 50 === 0)
    {
        var cone = createSprite(750,350,50,50);
        cone.x = random(0,1500);
        cone.addImage(coneImage);
        cone.scale = 0.3;
        cone.velocityY = 10;
        cone.lifetime = 300;
        coneGroup.add(cone);
    }
}

function spawnCone2()
{
    if(frameCount % 50 === 0)
    {
        var cone2 = createSprite(750,350,50,50);
        cone2.x = random(0,1500);
        cone2.addImage(coneImage);
        cone2.scale = 0.3;
        cone2.velocityY = 10;
        cone2.lifetime = 300;
        cone2Group.add(cone2);
    }
}