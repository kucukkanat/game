import { Sprite } from "./Canvas.js";
import { Emitter } from "subscribe";
export class Actor extends Emitter {
  /**
   * @param {string} name
   * @param {Sprite} sprite
   * @param {number} width
   * @param {number} height
   * @param {Canvas} canvas
   */
  constructor(name, spriteSrc, x = 0, y = 0, width, height) {
    super();
    this.name = name;
    this.sprite = new Sprite(spriteSrc, width, height);
    (this.x = x), (this.y = y);
    this.sprite.on("load", () => {
      this.width = this.sprite.width;
      this.height = this.sprite.height;
      this.emit("load");
    });
    this.animating = false;
  }
}
