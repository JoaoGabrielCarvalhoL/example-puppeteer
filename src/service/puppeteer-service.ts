import { log } from "console";
import puppeteer, { Page } from "puppeteer";

export class PuppeteerService {
    constructor() {}

    public createInstance(url:string): Promise<Page> {
        log(`Opening the browser at the ${url} with pupputeer;`)
        return new Promise(async (resolve, reject) => {
            const browser = await puppeteer.launch({headless: false});
            const page = browser.newPage();
            const numberOfPages = await browser.pages();
            if (numberOfPages.length >= 1) {
            numberOfPages[0].close();
            }
            (await page).goto(url);   
            (await page).setViewport({width: 1080, height: 1024});

            if (!page) reject("Something fail in this bomb. Nice try.");
        
            return resolve(page);
        });
        
    }
}