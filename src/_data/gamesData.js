
import fs from 'node:fs'
import path from 'node:path'

const gamesDirectory = 'src/games'

export default function () {
  if (!fs.existsSync(gamesDirectory)) {
    return { items: [] }
  }

  const items = fs.readdirSync(gamesDirectory)
    .filter(file => file.endsWith('.json'))
    .sort()
    .map(file => {
      const filePath = path.join(gamesDirectory, file)
      return JSON.parse(fs.readFileSync(filePath, 'utf8'))
    })

  return { items }
}
