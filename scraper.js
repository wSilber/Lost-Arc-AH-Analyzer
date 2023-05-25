import { subcategories } from "./categories.mjs";
import { writeToFile } from "./utils.mjs";

export async function scrapeAllCategories() {

    const data = {}

    const category_futures = await Object.values(subcategories).map(async (subcategory) => {
        const category = subcategory.Category;

        console.log(category)

        const subcategory_futures = await Object.values(subcategory).map(async (subcategory, index) => {
            if(index === 0) return;

            const url = 'https://www.lostarkmarket.online/api/export-market-live/North America East?subcategory=' + subcategory + '&categories=' + category

            const request = {
                method: "GET",
                redirect: 'follow',
                headers: {
                    "Content-Type": "application/json"
                }
            }
    
            try {
                const resp = await fetch(url, request);
                const body = await resp.text()
        
                const items = JSON.parse(body)

                items.forEach((item) => data[item.id] = item)

                return items
        
            } catch (err) {
                console.error(err)
            }

            return {}

        })

        await Promise.all(subcategory_futures)

    })

    await Promise.all(category_futures)

    await writeToFile('items.json', data)

}