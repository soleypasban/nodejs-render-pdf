const pup = require('puppeteer')


const createPDF = async (html, pdfPath, format) => {
    try {
        const browser = await pup.launch()
        const page = await browser.newPage()

        await page.setContent(html)
        await page.emulateMedia('screen')
        await page.evaluate(() => window.scrollBy(0, window.innerHeight))

        // render it as jpeg
        await page.screenshot({
            path: 'sample.jpg',
            fullPage: true
        });

        await page.pdf({
            path: pdfPath || 'sample.pdf',
            format: format || 'A4',
            printBackground: true
        })

        await browser.close()
        console.log('done')

        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

createPDF(`
        <center>
            <h1>This is a cat!</h1>
            <img style="width:500px;" src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        </center>
    `)
