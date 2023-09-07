import { AssetLoader } from "./Engine.js";
import { Canvas, Sprite } from "./Canvas.js";
import { Actor } from "./Actor.js";

(async () => {
  const canvas = new Canvas();
  const actor = new Actor("myactor", "/static/cat_sprite.png", 0, 0, 32, 40);
  canvas.addActor(actor);
  actor.sprite.offsetX = 0;
  actor.sprite.x =0
  actor.sprite.y =0
  actor.sprite.animate(1, 4, 8);
  
})();
