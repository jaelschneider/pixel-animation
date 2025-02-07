import Game from "./game.js"
import { Background, FallingStone, Mushroom, Player, Stone, Tree, Wall, Cave, Enemy, NPC, Falldamage, Healthpotion, NPC2, Treppe, Enemy2, Boss, FallingStone2, Orn1, Orn2, Kerze, Gelb, fill1, fill2, fill3, Jumppotion, Boden3, Boden2, Boden21, Boden22, Boden23, Boden2fill, Boden2fill2, Boden2fill3, Chruch1, Bossblock, NPC3, Enemy3, Borderb, Falldamage2} from "./game_objects.js"

/**
 * Diese Klasse liest eine Kartendatei und erstellt die Spiel-Objekte
 * an den Stellen die in der Karte angegeben sind.
 */
export default class Map {
  constructor(mapFile) {
    this._readMapFile(mapFile)
    this.mapfile = mapFile 
    if( this.mapfile === "maps/map-01.txt") {
      document.querySelector("#game-audio1").play()
      document.querySelector("#canvas").style.backgroundImage = "url('res/BG.png')"  
    } else if( this.mapfile === "maps/map-02.txt") {
      document.querySelector("#game-audio2").play()
      document.querySelector("#game-audio1").pause()
      document.querySelector("#canvas").style.backgroundImage = "url('res/BG2.png')"
    }else if( this.mapfile === "maps/map-02-2.txt") {
      document.querySelector("#game-audio2").play()
      document.querySelector("#game-audio1").pause()
      document.querySelector("#canvas").style.backgroundImage = "url('res/BG2.png')"
    }else if( this.mapfile === "maps/map-03.txt") {
       document.querySelector("#game-audio3-0").play()
      document.querySelector("#game-audio2").pause()
      document.querySelector("#canvas").style.backgroundImage = "url('res/BG3.png')"
   } else{
      document.querySelector("#creditssound").play()
      document.querySelector("#game-audio3-0").pause()
      document.querySelector("#canvas").style.backgroundImage = "url('res/BG4.png')"
  }}

  /**
   * Erstelle neue Spiel-Objekte an den jeweiligen Stellen.
   * @param {number} x Die x-Koordinate, an der die Spiel-Objekte erstellt werden.
   * @param {number} y Die y-Koordinate, an der die Spiel-Objekte erstellt werden.
   * @param {string} tileType Der Buchstabe an der Stelle in der Karte.
   */
  addTilesToMap(x, y, tileType) {
    //new Background(x, y)
    if ( tileType === "s" ) { new Stone(x, y) }
    if ( tileType === "p" ) { new FallingStone(x, y) }
    if ( tileType === "i" ) {new FallingStone2 (x, y)}
    if ( tileType === "t" ) { new Tree(x, y) }
    if ( tileType === "f" ) { new Mushroom(x, y) }
    if ( tileType === "3" ) { new Orn1(x, y) }
    if ( tileType === "4" ) { new Orn2(x, y) }
    if ( tileType === "w" ) { new Wall(x, y) }
    if ( tileType === "h" ) { new Cave(x, y) }
    if ( tileType === "P" ) { Game.player = new Player(x, y)}
    if ( tileType === "E" ) {new Enemy(x, y)}
    if ( tileType === "N" ) {new NPC (x, y)}
    if ( tileType === "D" ) {new Falldamage (x, y)}
    if ( tileType === "1" ) {new Healthpotion (x, y)}
    if ( tileType === "C" ) {new NPC2 (x, y)}
    if ( tileType === "T" ) {new Treppe (x, y)}
    if ( tileType === "2" ) {new Enemy2 (x, y)}
    if ( tileType === "B" ) {new Boss (x, y)}
    if ( tileType === "5" ) {new Kerze (x, y)}
    if ( tileType === "6" ) {new Gelb (x, y)}
    if ( tileType === "7" ) {new fill1 (x, y)}
    if ( tileType === "8" ) {new fill2 (x, y)}
    if ( tileType === "9" ) {new fill3 (x, y)}
    if ( tileType === "a" ) {new Jumppotion (x, y)}
    if ( tileType === "x" ) {new Boden3 (x, y)}
    if ( tileType === "X" ) {new Boden2 (x, y)}
    if ( tileType === "Y" ) {new Boden21 (x, y)}
    if ( tileType === "z" ) {new Boden22 (x, y)}
    if ( tileType === "J" ) {new Boden23 (x, y)}
    if ( tileType === "F" ) {new Boden2fill (x, y)}
    if ( tileType === "q" ) {new Boden2fill2 (x, y)}
    if ( tileType === "Q" ) {new Boden2fill3 (x, y)}
    if ( tileType === "c" ) {new Chruch1 (x, y)}
    if ( tileType === "b" ) {new Bossblock (x, y)}
    if ( tileType === "S" ) {new NPC3 (x, y)}
    if ( tileType === "0" ) {new Enemy3 (x, y)}
    if ( tileType === "U" ) {new Borderb (x, y)}
    if ( tileType === "O" ) {new Falldamage2 (x, y)}
  }

  /**
   * Liest die Karte aus der Datei und ruft die Erstellung der Spiel-Objekte auf.
   */
  _readMapFile(filename) {
    fetch(filename)
      .then((res) => res.text())
      .then((data) => {
        let rows = data.split("\n")
        for (let y = 0; y < rows.length; y++) {
          let row = rows[y].split("")
          for (let x = 0; x < row.length; x++) {
            this.addTilesToMap(x, y, row[x])
          }
        }
      })
      .then(() => {
        if (this.mapfile === "maps/map-02.txt") {
          Game.currentFrame = 0
          Game.player.hascontrols = false
          document.querySelector("#cutscene-container").style.display = "flex"
        }
      })
    }
  }

