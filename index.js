const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = window.innerWidth;
const height = window.innerHeight;

c.fillRect(0,0, canvas.width,canvas.height);

const gravity = 5;
class Sprite{
    constructor({position,imgSrc,height,width}){
        this.position = position
        this.height = height
        this.width = width
        this.image = new Image()
        this.image.src = imgSrc;
    }
    draw(){
        c.drawImage(this.image, this.position.x,this.position.y,this.width,this.height)
    }

    update(){
        this.draw();
    }
}

class Fighter{
    constructor({position,velocity,color}){
        this.position = position
        this.velocity = velocity
        this.color = color
        this.height = 100
        this.width = 50
        this.lastKey
        this.isGrounded
        this.isAttacking
        this.attackbox = {
            position : this.position,
            width : 100,
            height: 50
        }
    }
    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x , this.position.y, this.width, this.height);

        //attackbox draw
        c.fillStyle = 'yellow';
        c.fillRect(this.attackbox.position.x,this.attackbox.position.y, this.attackbox.width, this.attackbox.height);
    }

    update(){
        this.draw();
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.isGrounded = false

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 100){
            this.velocity.y = 0;
            this.isGrounded = true
        }else {
            this.velocity.y += gravity
    }   }
}

const player = new Fighter({
    position:{
        x: 100,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'red'
})

const enemy = new Fighter({
    position:{
        x: 400,
        y: 200
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'blue'
})

const background = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imgSrc : '/img/background.png',
    width:canvas.width,
    height:canvas.height
})


const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    rightarrow:{
        pressed: false
    },
    leftarrow:{
        pressed: false
    },
    uparrow:{
        pressed: false
    },
    s:{
        pressed: false
    },
    downarrow:{
        pressed: false
    }
}
function animate(){
    window.requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height);
    background.update()
    player.update()
    enemy.update()
    
    enemy.velocity.x = 0;
    player.velocity.x = 0;

    //input movement Player
    if(keys.a.pressed ){
        player.velocity.x = -5;
    }else if(keys.d.pressed){
        player.velocity.x = 5
    }
    if(keys.w.pressed && player.isGrounded){
        player.velocity.y = -60
    }

    //input movement Enemy
    if(keys.leftarrow.pressed){
        enemy.velocity.x = -5;
    }else if(keys.rightarrow.pressed){
        enemy.velocity.x = 5
    }
    if(keys.uparrow.pressed && enemy.isGrounded){
        enemy.velocity.y = -60
    }

    //attack check for collisions
    if(enemy.attackbox.position.x +enemy.attackbox.width 
         >=player.position.x &&enemy.attackbox.position.x 
        <=player.position.x +player.width &&
       enemy.attackbox.position.y +enemy.attackbox.height >=
       player.position.y &&enemy.attackbox.position.y <=player.position.y +player.height 
        &&enemy.isAttacking)
    {
        print(enemy.isAttacking);
    }

    if(player.attackbox.position.x + player.attackbox.width 
        >= enemy.position.x && player.attackbox.position.x 
       <= enemy.position.x + enemy.width &&
       player.attackbox.position.y + player.attackbox.height >=
       enemy.position.y && player.attackbox.position.y <= enemy.position.y + enemy.height 
       && player.isAttacking)
   {
       print(player.isAttacking);
   }

    
}
animate()

window.addEventListener("keydown",(event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break
        case 'w':
            keys.w.pressed = true;
            player.lastKey = 'w';
            break
        case 'ArrowRight':
            keys.rightarrow.pressed = true;
            enemy.lastKey = 'rightarrow';
            break
        case 'ArrowLeft':
            keys.leftarrow.pressed = true;
            enemy.lastKey = 'leftarrow';
            break
        case 'ArrowUp':
            keys.uparrow.pressed = true;
            enemy.lastKey = 'uparrow';
            break
        case "s":
            keys.s.pressed = true
            player.isAttacking = true;
            player.lastKey = 's'
        case "ArrowDown":
            keys.downarrow.pressed = true;
            enemy.isAttacking = true;
            enemy.lastKey = 'downarrow'
    }
})

window.addEventListener("keyup",(event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 'RightArrow':
            keys.rightarrow.pressed = false;
            break
        case 'LeftArrow':
            keys.leftarrow.pressed = false;
            break
        case 'w':
            keys.w.pressed = false;
            break
        case 'ArrowRight':
            keys.rightarrow.pressed = false;
            break
        case 'ArrowLeft':
            keys.leftarrow.pressed = false;
            break
        case 'ArrowUp':
            keys.uparrow.pressed = false;
            break
        case "s":
            keys.s.pressed = false;
            player.isAttacking = false;
        case "ArrowDown":
            keys.downarrow.pressed = false;
            enemy.isAttacking = false;
    }
})