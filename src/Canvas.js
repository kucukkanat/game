import { Emitter } from "subscribe";
export class Canvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    /**
     * @type {Actor[]}
     */
    this.actors = [];
  }
  addActor(actor) {
    this.actors.push(actor);
    actor.sprite.canvas = this;
  }
  removeActor(actor) {
    this.actors.splice(this.actors.indexOf(actor), 1);
  }
  
  /**
   * 
   * @param {Sprite} sprite 
   * @param {number} x 
   * @param {number} y 
   */
  async drawSprite(sprite, x, y) {    
    this.context.drawImage(
      sprite.image,
      sprite.offsetX,
      sprite.offsetY,
      sprite.width,
      sprite.height,
      x,
      y,
      sprite.width,
      sprite.height
    );
  }
  
  removeImage(image) {
    this.context.clearRect(image.x, image.y, image.width, image.height);
  }
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export class Sprite extends Emitter {
  /**
   * @param {string} src
   * @param {number} width
   * @param {number} height
   * @param {"up" | "right" | "down" | "left"} [direction]
   * @param {number} [startX]
   * @param {number} [startY]
   */
  constructor(
    src,
    width,
    height,
    direction = "right",
    offsetX = 0,
    offsetY = 0
  ) {
    super();

    this.image = new Image();
    this.image.src = src;
    this.image.onload = () => this.emit("load", this.image);
    this.direction = direction;
    this.src = src;
    
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.frameIndex = 0;
  }
  draw(){
    /**
     * @type {Canvas}
     */
    const canvas = this.canvas
    if(canvas) {
      canvas.clear()
      canvas.drawSprite(this, this.x, this.y);
    } else {
      console.warn(`Sprite ${this.src} has no canvas to draw on.`)
    }
  }
  animate(stripe=0, fps=2, frameCount=2) {
    
    this.draw()
    this.next()
    this.frameIndex=this.frameIndex+1;
    if(this.frameIndex >= frameCount) {
      this.offsetX = 0
      this.frameIndex = 0
    }
    return setTimeout(() => {
      this.animate(stripe, fps, frameCount)
    }, 1000/fps)

  }
  next() {
    // debugger
    if (this.direction === "up" && this.offsetY >= this.height) {
      this.offsetY -= this.height;
    }
    if (
      this.direction === "right" &&
      this.offsetX <= this.image.width - this.width
    ) {
      this.offsetX += this.width;
    }
    if (
      this.direction === "down" &&
      this.offsetY <= this.image.height - this.height
    ) {
      this.offsetY += this.height;
    }
    if (this.direction === "left" && this.offsetX >= this.width) {
      this.offsetX -= this.width;
    }
  }
}
