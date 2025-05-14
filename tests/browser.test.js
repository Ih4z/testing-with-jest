const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).
const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});


//Mitt test
describe('Vad är överst i stacken', () => {
  it('visar översta elementet efter push och peek', async () => {
    
    //Tömmer stacken på bananer
    await driver.findElement(By.id('pop')).click();
    let prompt1 = await driver.switchTo().alert();
    await prompt1.accept();

    //Pushar Chips
    await driver.findElement(By.id('push')).click();
    let prompt2 = await driver.switchTo().alert();
    await prompt2.sendKeys('Chips');
    await prompt2.accept();

    //Kontrollera att Chips är överst i stacken
    let top1 = await driver.findElement(By.id('top_of_stack')).getText();
    expect(top1).toEqual('Chips');

    //Peekar på stacken
    await driver.findElement(By.id('peek')).click();

    //Kontrollera att Chips fortfarande är överst i stacken
    let top2 = await driver.findElement(By.id('top_of_stack')).getText();
    expect(top2).toEqual('Chips');
  });
});
