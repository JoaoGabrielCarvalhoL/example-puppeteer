import puppeteer, { Page } from "puppeteer";
import { PuppeteerService } from "../service/puppeteer-service";
import { Payload } from "../model/Payload";

export class CrawlerPalmeirasController {
    constructor() {}

    public async init() {
       const page: Page  = await new PuppeteerService()
        .createInstance("https://www.palmeiras.com.br/central-de-midia/noticias/");
    
        const selector = ".central-de-midia-container .items-central";
        await page.waitForSelector(selector);
        const nodes = await page.$$(selector);
        const payload: Array<Payload> = [];
        for (const node of nodes) {

            const link = await page.evaluate((element:Element) => {
                return element.querySelector("a")?.getAttribute("href")
            }, node);

            const title = await page.evaluate((element:Element) => {
                return element.querySelector("a .items-central-txt h4")?.textContent;
            }, node);

            const publishedAt = await page.evaluate((element:Element) => {
                return element.querySelector("a .items-central-date")?.textContent;
            }, node);
            if(link && title && publishedAt) {
                payload.push(new Payload(link!, title!, publishedAt!));
            }
            console.log(payload);
        }
    }
}