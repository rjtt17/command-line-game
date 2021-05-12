const termkit = require('terminal-kit')
const term = termkit.terminal
const ScreenBuffer = termkit.ScreenBuffer
const screen = new ScreenBuffer({ dst: term, noFill: true })

screen.fill({
  attr: {
    color: 0,
    bgColor: 0
  }
})

class Field {
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
}

class Block {
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

class Blocks {
  constructor (screen) {
    this.screen = screen
    this.blocks = []
  }

  create () {
    for (let num = 0; num < Math.floor(Math.random() * 10) + 1; num++) {
      this.blocks.push(new Block(screen))
    }
    return this.blocks
  }

  display () {
    this.blocks.map(function (block) {
      if (block.positon.y >= block.minY && block.positon.y <= block.maxY) {
        return screen.put(block.positon, block.asset)
      } else {
        return screen.put(block.positon, ' ')
      }
    })
  }

  fall () {
    this.remove()
    this.blocks = this.blocks.filter(block => block.positon.y !== this.screen.height)
    this.blocks.map(block => block.positon.y++)
  }

  remove () {
    this.blocks.map(block => screen.put(block.positon, ' '))
  }

  judgeCollision (objectX, objectY) {
    const results = []
    this.blocks.map(block =>
      results.push(objectX === block.positon.x && objectY === block.positon.y)
    )
    return results.some(result => result)
  }
}

class ScoreCounter {
  constructor (screen) {
    this.screen = screen
    this.score = 0
    this.display()
  }

  display () {
    this.screen.put({ x: 0, y: 1 }, `Score: ${this.score += 1}`)
  }
}

class MovingObject {
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

term.hideCursor()
term.grabInput()
term.on('key', function (key) {
  switch (key) {
    case 'LEFT' : mo.goLeft(); break
    case 'RIGHT' : mo.goRight(); break
    case 'CTRL_C' :
      term.bold.red('Game forced termination\n')
      process.exit()
  }
})

const scoreCounter = new ScoreCounter(screen)
const field = new Field(screen)
const blocks = new Blocks(screen)
const mo = new MovingObject(screen)

term.blue.bold('■ ゲームの遊び方：落下する文字から避けるゲームです\n')
term.brightYellow('＊ キー操作: [▶️] を押すと右へ移動\n')
term.brightYellow('＊ キー操作: [◀️] を押すと左へ移動\n')
term.brightYellow('＊ キー操作: [control] + [c] を押すとゲーム中止\n\n')
term.blue.bold('ゲームをスタートしますか？')

const items = [
  '1. Start Game',
  '2. Exit'
]

const selectedMenu = term.singleColumnMenu(items).promise
selectedMenu.then(function (value) {
  if (value.selectedIndex === 0) {
    setInterval(function () {
      blocks.create()
      blocks.display()
      scoreCounter.display()
      mo.display()
      field.display()
      if (blocks.judgeCollision(mo.positon.x, mo.positon.y)) {
        mo.remove()
        blocks.remove()
        term.clear()
        term.bold.red('Game Over\n')
        term.bold.blue(`Final Score: ${scoreCounter.score} point\n`)
        process.exit()
      }
      blocks.fall()
    }, 500)
  } else {
    process.exit()
  }
})
