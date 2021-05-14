module.exports = class Field {
  constructor (screen) {
    this.screen = screen
    this.width = screen.width
    this.height = screen.height
  }

  display () {
    this.screen.put({ x: 0, y: 2 }, '='.repeat(this.width))
    this.screen.put({ x: 0, y: this.height - 1 }, '='.repeat(this.width))
    this.screen.draw()
  }

  judgeWidth () {
    if (this.width >= 90) {
      return 'ゲームをするのに横幅が少し広いです。少し狭くするのをお勧めします'
    } else if (this.width >= 50) {
      return 'ゲームをするのにちょうど良い横幅です'
    } else {
      return 'ゲームをするのに横幅が少し狭いです。少し広くするのをお勧めします'
    }
  }

  judgeHeight () {
    if (this.height >= 25) {
      return 'ゲームをするのに縦幅が少し高いです。少し低くするのをお勧めします'
    } else if (this.height >= 15) {
      return 'ゲームをするのにちょうど良い高さです'
    } else {
      return 'ゲームをするのに縦幅が少し低いです。少し高くするのをお勧めします'
    }
  }
}
