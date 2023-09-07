import {loadFile} from "./fileLoader.js";
export class AssetLoader {
  /**
   * @param {string[] | string} src
   */
  constructor(src) {
    this.src = src;
  }
  async load() {
    if(this.src instanceof Array) {
      const promises = this.src.map((src) => {
        return loadFile(src);
      });
      return await Promise.all(promises);
    }
    if(typeof this.src === "string") {
      return await loadFile(this.src);
    }
    return result;
  }
}
