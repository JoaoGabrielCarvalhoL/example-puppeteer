import { CrawlerPalmeirasController } from "./controller/crawler-palmeiras";

class Initialization {
  constructor() {
    this._initialization();
  }

  private _initialization() {
    new CrawlerPalmeirasController().init();
    console.log("My configuration is a big piece of shit")
  }
}

const init = new Initialization();