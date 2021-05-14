module.exports = class MovingObject {
  constructor (screen) {
    this.screen = screen
    this.minX = 1
    this.maxX = screen.width - 2
    this.positon = {
      x: Math.floor(screen.width / 2),
      y: screen.height - 2
    }
    this.asset = '▲'
    this.display()
  }

  display () {
    this.screen.put(this.positon, this.asset)
  }

  remove () {
    this.screen.put(this.positon, ' ')
  }

  goLeft () {
    if (this.positon.x > this.minX && this.positon.x <= this.maxX) {
      this.remove()
      this.positon.x = this.positon.x - 1
      this.display()
    }
  }

  goRight () {
    if (this.positon.x >= this.minX && this.positon.x < this.maxX) {
      this.remove()
      this.positon.x = this.positon.x + 1
      this.display()
    }
  }
}
