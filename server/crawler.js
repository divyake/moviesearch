const puppeteer = require('puppeteer');
const fs = require('fs');


const bot = async () => {

    let url = 'https://www.imdb.com/search/title/?title_type=movie&explore=title_type,genres&genres=Romance'
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })

    const movie = await page.evaluate(() => {
      
      let movielist =  Array.from(document.querySelector('#main > div > div.lister.list.detail.sub-list > div').getElementsByClassName('lister-item mode-advanced'));
      console.log(movielist.length)
      let info = [];
      for (let i = 0 ; i < (movielist.length - 1) ; i++){   
      let child = Array.from(movielist[i].children);
        let childcontent = Array.from(child[2].children)
        console.log(i);
    let details = {
        Name : childcontent[0].textContent.split('\n')[3],
        Year :  childcontent[0].textContent.split('\n')[4],
        Time :  childcontent[1].textContent.split('\n')[3],
        Genre :  childcontent[1].textContent.split('\n')[6],
        Rating :  childcontent[2].innerText.split(' ')[1],
       Desc :  childcontent[3].innerText,
      Crew : childcontent[4].innerText.split('|'),
          }
          
          info.push(details);
        }

      return info;

    })
   
   // console.log(movielist[0])
  
   fs.writeFileSync('./data.json', JSON.stringify(movie, null, 2)  , 'utf-8');

    browser.close()

  
   }

   bot();