const pup = require('puppeteer')

try {

    const createPDF = async (html, pdfPath, format) => {
        const browser = await pup.launch()
        const page = await browser.newPage()

        await page.setContent(html)
        await page.emulateMedia('screen')
        await page.evaluate(() => window.scrollBy(0, window.innerHeight))

        // render it as jpeg
        // await page.screenshot({
        //     path: 'sample.jpg',
        //     fullPage: true
        // });

        await page.pdf({
            path: pdfPath || 'sample.pdf',
            format: format || 'A4',
            printBackground: true
        })

        console.log('done')
        await browser.close()
        console.log('exit')
        process.exit()
    }


    createPDF(`
    <center>
        <h1>This is a cat!</h1>
        <img style="width:500px;" src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
    </center>
    `)

} catch (e) {
    console.log(e)
}

