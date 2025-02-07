import {AnimationHandler, CollisionHandler, GravityHandler, HandlerManager} from "./event_handler.js"
import { findAndRemoveFromList } from "./utils.js"
import TileRegistry from "./tile_registry.js"
import CollisionDetector from "./collision_detector.js"
import Game from "./game.js"
import Camera from "./camera.js"

/**
 * Dies ist die Basisklasse für alle Spiel-Objekte.
 * 
 * Wenn ein spezialisiertes Spiel-Objekt erzeugt wird, dann soll es 
 * immer diese Klasse erweitern. Wenn die Funktionen von der Basisklasse
 * überschrieben werden, sollten diese immer zuerst mit `super.function()` 
 * aufgerufen werden, so das die eigentliche Funktionalität der Spiel-Objekte
 * erhalten bleibt.
 */
export class GameObject {
  constructor(x, y, options = {sheet, layer: "background", collisionTags: []}) {
    this.sheet = options.sheet
    this.tileSize = 32
    this.x = x * this.tileSize
    this.y = y * this.tileSize
    this.col = 0
    this.row = 0
    this.layer = options.layer
    this.handlers = new HandlerManager([])
    TileRegistry.layers[this.layer].push(this)
    this.collisionTags = options.collisionTags
    this.collisionTags.forEach(tag => {
      CollisionDetector.layers[tag].push(this)
    })
  }

  /**
   * Zeichnet das Spiel-Objekt auf das Canvas. Das Spiel-Objekt
   * kennt dabei seine Position und welches Bild gezeichnet werden soll.
   * @param {CanvasRenderingContext2D} ctx Das Canvas, worauf das Spiel-Objekt gezeichnet werden soll.
   */
  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
      this.x, this.y, this.tileSize, this.tileSize
    )
  }

  /**
   * Zerstört das Spiel-Objekt und entfernt es aus dem Spiel.
   */
  destroy() {
    findAndRemoveFromList(TileRegistry.layers[this.layer], this)
    this.collisionTags.forEach(tag => {
      findAndRemoveFromList(CollisionDetector.layers[tag], this)
    })
  }

  /**
   * Berechne die Position und andere Eigenschaften des 
   * Spiel-Objekts neu. Wie das gemacht wird, wird in den 
   * verschieden Handlers angegeben. Ein Spiel-Objekt kann
   * z.B. einen Gravitations-Handler haben, dieser fügt dann
   * Gravitation für dieses Spiel-Objekt hinzu und berechnet die 
   * y-Position des Spiel-Objekts neu.
   */
  update(){
    this.handlers && this.handlers.runAll(this)
  }
}

export class Falldamage extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["cave"]
    })

    this.row = 10
    this.col = 0
  }
}

export class Falldamage2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["cave"]
    })

    this.row = 10
    this.col = 0
  }
}


export class Cave extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["cave"]
    })
    this.row = 2
    this.col = 2
  }
}

export class Chruch1 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#starting")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })
    this.tileSize = 384
    this.row = 0
    this.col = 0
  }
}

export class Background extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })

    this.row = 0
    this.col = 0
  }
}

export class Stone extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 1
  }
}

export class Bossblock extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Boss-Block-S")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 0
  }
}

export class fill1 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 3
    this.col = 1
  }
}

export class fill2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 3
    this.col = 0
  }
}

export class fill3 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 3
    this.col = 2
  }
}

export class Kerze extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#candles")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })
    this.row = 0
    this.col = 0
  }
}

export class Treppe extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 2
  }
}

export class Boden3 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground2-welt3")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 0
  }
}

export class Boden2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground2-welt2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 0
  }
}

export class Boden21 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground2-welt2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 1
  }
}

export class Boden22 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground2-welt2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 3
  }
}

export class Boden23 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground2-welt2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 4
  }
}

export class Boden2fill extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground2-welt2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 0
  }
}

export class Boden2fill2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground2-welt2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 1
  }
}

export class Boden2fill3 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground2-welt2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 2
  }
}

export class Wall extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 1
  }
}

export class Orn1 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 0
  }
}

export class Orn2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 2
  }
}

export class FallingStone extends Stone {
  constructor(x, y) {
    super(x, y)
    this.handlers = new HandlerManager([
      
      new CollisionHandler()
    ])
    this.isFalling = false
    this.row = 2
    this.col = 0
  }
}

export class FallingStone2 extends Stone {
  constructor(x, y) {
    super(x, y)
    this.handlers = new HandlerManager([
      
      new CollisionHandler()
    ])
    this.isFalling = false
    this.row = 1
    this.col = 3
  }
}


export class Nothing extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#character")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: ["enemy"]
    })
    this.row = 14
    this.col = 2
    document.querySelector("#hitten-e-sound").play()
  }
}

export class Tree extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 2
    this.col = 0
    
  }
}

export class Healthpotion extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#heal-Sprite")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 0
  }
}

export class Jumppotion extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#jump-Sprite")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 0
  }
}

export class Borderb extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#character")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 120
    this.col = 2
  }
}

export class NPC extends GameObject {    
  constructor(x, y) {
    const ground = document.querySelector("#NPC-S")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.tileSize = 64
    this.row = 0
    this.col = 0
  }
}

export class NPC2 extends GameObject {    
  constructor(x, y) {
    const ground = document.querySelector("#NPC-S")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.tileSize = 64
    this.row = 0
    this.col = 0
  }
}

export class NPC3 extends GameObject {    
  constructor(x, y) {
    const ground = document.querySelector("#NPC-S")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.tileSize = 64
    this.row = 0
    this.col = 0
  }
}

export class Mushroom extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 2
    this.col = 1
  }
}

export class Gelb extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#gelbBaum")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })
    this.tileSize = 96
    this.row = 0
    this.col = 0
  }
}

class AnimatedGameObject extends GameObject {
  constructor(x, y, options) {
    super(x, y, options)
    this.frameCounter = 0
    this.dx = 0
    this.dy = 0
  }

  update() {
    super.update()
    this.x = this.x + this.dx
    this.y = this.y + this.dy
    this.dx = 0
    this.dy = 0
  }
}


export class Player extends AnimatedGameObject {
  constructor(x, y) {
    const png = document.querySelector("#character")
    super(x, y, {
      sheet: png,
      layer: "player",
      collisionTags: ["world", "pickups", "cave", "forest"]
      
    })
    this.lastattack = 0
    this.canattack = 0
    this.row = 0
    this.col = 0
    this.speed = 3 
    this.php = 10
    this.loseLife(0)
    this.lasthit = 0
    this.dmg = 5
    this.hascontrols = true
    this.handlers = new HandlerManager([
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 25, numberOfFrames: 4}),
      new GravityHandler({
        maxGravity: 3,
        gravityForce: 1,
        jumpForce: -13 ,
      })
      
    ])
  }


  suicide() {
    if("KeyL") {
      Game.loadMap("maps/map-01.txt");
    }
  }

  
  loseLife(value) {
    this.php -= value
    document.querySelector("#php").textContent = this.php
  }

  gainLife(value) {
    this.php += value
    document.querySelector("#php").textContent = this.php
  }

  attack() {
    if(this.hascontrols === false) return
    if (Game.currentFrame - this.lastattack > 60) {
      this.lastattack = Game.currentFrame
      if (this.row === 0) {
        let newx = this.x / 32 + 1
        new Nothing(newx, this.y / 32)
      } else if (this.row === 8) {
        let newx = this.x / 32 - 1
        new Nothing(newx, this.y / 32)
      }
    }
  }

  jump() {
    console.log(this.php)
    if(this.hascontrols === false) return
    this.handlers.get(GravityHandler).jump(this)
    if (this.row === 0){
      this.row = 2}
    else if (this.row === 8) {
      this.row = 12}
  }

  update() {
    super.update()
  }

  move(direction) {
    if(this.hascontrols === false) return
    if (direction === "right") {
      this.dx = this.dx + (1) * this.speed
      this.row = 0
    } else if (direction === "left") {
      this.dx = this.dx + (-1) * this.speed
      this.row = 8
    }
    if (direction === "jump") {
      this.jumpForce = 2
      this.row = 2
      Camera.shiftBackground(-1)
    }

  }
}

export class Enemy extends AnimatedGameObject {
  constructor(x, y) {
    const png = document.querySelector("#Enemy1")
    super(x, y, {
      sheet: png,
      layer: "player",
      collisionTags: ["world", "enemy"]
    })
    this.row = 0
    this.col = 0
    this.speed = 0.9
    this.ehp = 10
    this.dmg = 5
    this.handlers = new HandlerManager([
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 25, numberOfFrames: 4}),
      new GravityHandler({
        maxGravity: 3,
        gravityForce: 1,
        jumpForce: -20,
      })
])
  }

  update() {
    super.update();
    const dist = Math.abs(Game.player.x - this.x)
    if ( dist / 32 > 10) return
    if (Game.player.x < this.x) {
      this.move("left")
      this.row = 0
      this.col = 1
    }
    if (Game.player.x > this.x) {
      this.move("right")
      this.row = 0
      this.col = 0
    }
  }

  
  move(direction) {
    if (direction === "right") {
      this.dx = this.dx + (1) * this.speed;
      this.row = 0;
      this.col = 0;
    } else if (direction === "left") {
      this.dx = this.dx + (-1) * this.speed;
      this.row = 0;
      this.col = 0;
    }
  }
}

export class Enemy2 extends AnimatedGameObject {
  constructor(x, y) {
    const png = document.querySelector("#Enemy2")
    super(x, y, {
      sheet: png,
      layer: "player",
      collisionTags: ["world", "enemy"]
    })
    this.row = 0
    this.speed = 1.5
    this.ehp = 10
    this.dmg = 5
    this.handlers = new HandlerManager([
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 10, numberOfFrames: 3}),
      new GravityHandler({
        maxGravity: 3,
        gravityForce: 1,
        jumpForce: -20,
      })
])
  }

  update() {
    super.update();
    const dist = Math.abs(Game.player.x - this.x)
    if ( dist / 32 > 10) return
    if (Game.player.x < this.x) {
      this.move("left")
    }
    if (Game.player.x > this.x) {
      this.move("right")
    }
  }
  
  move(direction) {
    if (direction === "right") {
      this.dx = this.dx + (1) * this.speed;
      this.row = 0;
    } else if (direction === "left") {
      this.dx = this.dx + (-1) * this.speed;
      this.row = 1;
    }
  }
}

export class Enemy3 extends AnimatedGameObject {
  constructor(x, y) {
    const png = document.querySelector("#Enemy-3")
    super(x, y, {
      sheet: png,
      layer: "player",
      collisionTags: ["world", "enemy"]
    })
    this.row = 0
    this.speed = 4
    this.ehp = 5
    this.dmg = 5
    this.handlers = new HandlerManager([
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 10, numberOfFrames: 2}),
      new GravityHandler({
        maxGravity: 3,
        gravityForce: 1,
        jumpForce: -20,
      })
])
  }

  update() {
    super.update();
    const dist = Math.abs(Game.player.x - this.x);
    const yDist = Math.abs(Game.player.y - this.y);
    if (dist / 32 > 10 || yDist > 32) {
      return;
    }
    if (yDist <= 32) {
      if (Game.player.x < this.x) {
        this.move("left");
      } else if (Game.player.x > this.x) {
        this.move("right");
      }
    }
  }
  
  move(direction) {
    if (direction === "right") {
      this.dx = this.dx + (1) * this.speed;
      this.row = 1;
    } else if (direction === "left") {
      this.dx = this.dx + (-1) * this.speed;
      this.row = 0;
    }
  }
}

export class Boss extends AnimatedGameObject {
  constructor(x, y) {
    const png = document.querySelector("#Boss-S")
    super(x, y, {
      sheet: png,
      layer: "player",
      collisionTags: ["world", "enemy"]
    })
    this.tileSize = 192
    this.row = 0
    this.col = 0
    this.speed = 1
    this.ehp = 20
    this.dmg = 5
    this
    this.handlers = new HandlerManager([
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 25, numberOfFrames: 1}),
      new GravityHandler({
        maxGravity: 3,
        gravityForce: 1,
        jumpForce: -20,
      })
])
  }

  update() {
    super.update();
    const dist = Math.abs(Game.player.x - this.x)
    if ( dist / 32 > 10) 
      {this.move("right")}

    if (Game.player.x < this.x) {
      this.move("left")
    }
  }
  
  
  
  move(direction) {
    if (direction === "right") {
      this.dx = this.dx + (1) * this.speed;
      this.row = 0;
      this.col = 0;
    } else if (direction === "left") {
      this.dx = this.dx + (-1) * this.speed;
      this.row = 0;
      this.col = 0;
    }
  }
}