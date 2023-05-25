import fs from 'fs/promises'

export async function writeToFile(fileName, data) {

    try {
        await fs.writeFile(fileName, JSON.stringify(data));
    } catch (err) {
        console.error(err)
    }
}
