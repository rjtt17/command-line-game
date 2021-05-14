const Block = require('./block')

module.exports = class Blocks {
  constructor (screen) {
    this.screen = screen
    this.blocks = []
  }

  create () {
    for (let num = 0; num < Math.floor(Math.random() * 10) + 1; num++) {
      this.blocks.push(new Block(this.screen))
    }
    return this.blocks
  }

  display () {
    this.blocks.map(block => {
      if (block.positon.y >= block.minY && block.positon.y <= block.maxY) {
        return this.screen.put(block.positon, block.asset)
      } else {
        return this.screen.put(block.positon, ' ')
      }
    })
  }

  fall () {
    this.remove()
    this.blocks = this.blocks.filter(block => block.positon.y !== this.screen.height)
    this.blocks.map(block => block.positon.y++)
  }

  remove () {
    this.blocks.map(block => this.screen.put(block.positon, ' '))
  }

  judgeCollision (objectX, objectY) {
    const results = []
    this.blocks.map(block =>
      results.push(objectX === block.positon.x && objectY === block.positon.y)
    )
    return results.some(result => result)
  }
}
