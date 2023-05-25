import { scrapeAllCategories } from './scraper.js';

;(async function() {

    const url = 'https://www.lostarkmarket.online/api/export-market-live/North America East?subcategory=Honing Materials&categories=Enhancement Material&items=great-honor-leapstone-2'

    await scrapeAllCategories();

})()
