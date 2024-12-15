const fs = require('fs')
const puppeteer = require('puppeteer')

async function generateCV() {
  const userName = process.argv[2]

  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()

  const document = fs.readFileSync('./cv.html', 'utf8')

  await page.setContent(document, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0']
  })

  // Apply additional settings for better text rendering
  await page.emulateMediaType('print')

  await page.pdf({
    format: 'A4',
    path: `./${userName}.pdf`,
    printBackground: true
  })

  await browser.close()
}

generateCV()
