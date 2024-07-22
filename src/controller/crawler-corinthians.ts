import { Page } from "puppeteer";
import { PuppeteerService } from "../service/puppeteer-service";
import { Payload } from "../model/Payload";

export class CrawlerCorinthiansController {
    constructor() {}

    public async init() {
       const page:Page = await new PuppeteerService()
        .createInstance("https://www.corinthians.com.br/noticias");

        const selector = ".ct-news-list .ct-news-list-item";
        await page.waitForSelector(selector);
        const nodes = await page.$$(selector);
        const payload: Array<Payload> = [];

        for (const node of nodes) {
            const link = await page.evaluate((element: Element) => {
                return element.querySelector(".ct-news-list-item-content a")?.getAttribute("href");
            }, node);

            const title = await page.evaluate((element:Element) => {
                return element.querySelector(".ct-news-list-item-content h4")?.innerHTML.replace(/\n/g, '')
                    .replace(/<p>.*?<\/p>/g, '').trim();
            }, node);

            const publishedAt = await page.evaluate((element:Element) => {
                return element.querySelector(".ct-news-list-item-content h4 p")?.innerHTML.replace(/\n/g, '')
                    .replace(/<strong>.*?<\/strong>/g, '')
                    .replace(/-/g, '').trim();
            }, node);

            if(link && title && publishedAt) {
                payload.push(new Payload(link!, title!, publishedAt!));
            }
            console.log(payload);
        }
        
    
    
    }
}