module.exports = class Block {
  constructor (screen) {
    this.screen = screen
    this.minY = 2
    this.maxY = screen.height - 2
    this.asset = 'job'[Math.floor(Math.random() * 3)]
    this.positon = {
      x: this.getRandomInt(1, screen.width),
      y: 3
    }
  }

  getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
