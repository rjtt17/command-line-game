#! /usr/bin/env node

const Blocks = require('./blocks')
const Field = require('./field')
const ScoreCounter = require('./score-counter')
const MovingObject = require('./moving-object')
const termkit = require('terminal-kit')
const term = termkit.terminal
const ScreenBuffer = termkit.ScreenBuffer
const screen = new ScreenBuffer({ dst: term, noFill: true })
const scoreCounter = new ScoreCounter(screen)
const field = new Field(screen)
const blocks = new Blocks(screen)
const mo = new MovingObject(screen)

screen.fill({
  attr: {
    color: 0,
    bgColor: 0
  }
})

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

term.blue.bold('ゲーム概要：落下する文字から避けるゲームです\n\n')
term.brightYellow('〜〜〜ゲーム操作方法〜〜〜\n')
term.brightYellow('キー操作: [▶️] を押すと右へ移動\n')
term.brightYellow('キー操作: [◀️] を押すと左へ移動\n')
term.brightYellow('キー操作: [control] + [c] を押すとゲーム中止\n\n')
term.green('〜〜〜あなたのターミナルの横幅・高さについて〜〜〜\n')
term.green(field.judgeWidth(), '\n')
term.green(field.judgeHeight(), '\n\n')
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
