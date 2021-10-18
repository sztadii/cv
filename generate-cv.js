const fs = require('fs')
const puppeteer = require('puppeteer')

console.log('dupa 5')

async function generateCV () {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()

  const document = fs.readFileSync(
    './krystian-sztadhaus.html',
    'utf8'
  )

  await page.setContent(document, {
    waitUntil: 'networkidle0'
  })

  await page.pdf({
    format: 'A4',
    path: './krystian-sztadhaus.pdf',
    printBackground: true
  })

  await browser.close()
}

generateCV()

