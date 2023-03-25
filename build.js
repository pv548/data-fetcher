const puppeteer = require('puppeteer')
require('dotenv').config()

const screenshot = 'spond.png';
(async () => {
    
    const loginPage = 'https://spond.com/landing/login/';
    const clientPage = 'https://spond.com/landing/login/';

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(loginPage, {waitUntil: 'networkidle2'});
    await page.type('[name="emailOrPhoneNumber"]', process.env.SPOND_USER)
    await page.type('[name="password"]', process.env.SPOND_PWD)
    await page.click('.spinner-button-component')
    await page.waitForNavigation();

    await page.goto(clientPage, {waitUntil:'networkidle2'})
    await page.screenshot({ path: screenshot })
    
    browser.close()
    
    console.log('See screenshot: ' + screenshot)
   
    //var linkTexts = await page.$$eval("div.spondListstyled__SpondItem", elements => elements.map(item=>item.textContent))
    //await console.log(linkTexts)

})()