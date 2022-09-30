const readline = require('readline')

const rl = readline.createInterface(process.stdin, process.stdout)

let board = "123456789"
let player = "X"

displayBoard()

function prompt() {
    rl.question("what square will you play on now?", function (move) {
        if (isValid(move)) {
            play(move)
        }
        
        if (hasWon()) {
            console.log(otherPlayer(), "has Won!")
            displayBoard()
            process.exit()
        } else if (isDraw()) {
            console.log("Draw")
            process.exit()
        } else {
            displayBoard()
            prompt()
        }
    })
}

function isValid(move) {
    if (/[1-9]/.test(move)) {

        if (/X|O/.test(board[Number(move) - 1])) {
            console.log("That square has been played on")
            return false
        } else {
            return true
        }

    } else {
        console.log("Only use a number between 1 - 9")
        return false
    }
}

function hasWon() {
    const winningCombos = [
        "###......",
        "...###...",
        "......###",
        "#..#..#..",
        ".#..#..#.",
        "..#..#..#",
        "#...#...#",
        "..#.#.#.."
    ].map(combo => {
        return new RegExp(combo.replace(/#/g, otherPlayer()))
    }).some(regex => {
        return regex.test(board)
    })

    return winningCombos
}

function isDraw() {
    return !/[1-9]/.test(board)
}

function displayBoard() {
    console.log(`${board[0]}|${board[1]}|${board[2]}`)
    console.log(`${board[3]}|${board[4]}|${board[5]}`)
    console.log(`${board[6]}|${board[7]}|${board[8]}`)
}

function otherPlayer() {
    return player === "X" ? "O" : "X"
}

function play(move) {
    board = board.replace(move, player)
    player = otherPlayer()
}

prompt()