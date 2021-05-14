module.exports = class ScoreCounter {
  constructor (screen) {
    this.screen = screen
    this.score = 0
    this.display()
  }

  display () {
    this.screen.put({ x: 0, y: 1 }, `Score: ${this.score += 1}`)
  }
}
