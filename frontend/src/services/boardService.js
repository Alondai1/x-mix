export default {
    createBoard,
    checkforWinningCells,
    checkForPos
}


function createBoard() {

    const board = []
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++) {
            board[i][j] = {
                symbol: '',
                status: ''
            }
        }
    }

    return board
}



function checkForPos(board) {
    for (let i = 0; i < board.length; i++) {
      
         if (_checkComputerRowAttack(board[i]) > 1) {
            for (let j = 0; j < board.length; j++) {
                if (!board[i][j].symbol) return { i, j }
            }
        }
       
        else if (_checkComputerColAttack(board,i) > 1) {
            for (let j = 0; j < board.length; j++) {
                if (!board[j][i].symbol) return { i:j, j:i }
            }
        }

        else if (_checkComputerDiaAttack(board,i) > 1) {
            for (let j = 0; j < board.length; j++) {
                if (!board[j][j].symbol) return { i:j, j }
            }
        }

        else if (_checkComputerRowDef(board[i]) > 1) {
            for (let j = 0; j < board.length; j++) {
                if (!board[i][j].symbol) return { i, j }
            }
        }

        else if (_checkComputerColDef(board,i) > 1) {
            for (let j = 0; j < board.length; j++) {
                if (!board[j][i].symbol) return { i:j, j:i }
            }
        }

        else if (_checkComputerDiaDef(board,i) > 1) {
            for (let j = 0; j < board.length; j++) {
                if (!board[j][j].symbol) return { i:j, j }
            }
        }

    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            
        if(!board[i][j].symbol) return {i,j}
        }
    }


}








function checkforWinningCells(board, posI, posJ, symbol) {
    return _checkRow(board, posI, posJ, symbol) || _checkCol(board, posI, posJ, symbol) || _checkDia(board, posI, posJ, symbol)

}

function _checkRow(board, posI, posJ, symbol) {
    const res = []
    for (let j = 0; j < board[posI].length; j++) {
        if (board[posI][j].symbol !== symbol) return false
        else res.push({ i: posI, j })
    }
    if (res.length === 3) return res
}

function _checkCol(board, posI, posJ, symbol) {
    const res = []
    for (let i = 0; i < board.length; i++) {
        if (board[i][posJ].symbol !== symbol) return false
        else res.push({ i, j: posJ })
    }
    if (res.length === 3) return res

}

function _checkDia(board, posI, posJ, symbol) {
    const res = []
    for (let i = 0; i < board.length; i++) {
        if (board[i][i].symbol !== symbol) return false
        else res.push({ i, j: i })
    }
    if (res.length === 3) return res

}


function _checkComputerRowDef(cells) {
    let count = 0
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].symbol === 'X') count++

    }
    return count
}

function _checkComputerRowAttack(cells) {
    let count = 0
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].symbol === 'O') count++
    }
    return count
}

function _checkComputerColAttack(board,j) {
    let count = 0
    for (let i = 0; i < board.length; i++) {
        if (board[i][j].symbol === 'O') count++
    }
    return count
}

function _checkComputerColDef(board,j) {
    let count = 0
    for (let i = 0; i < board.length; i++) {
        if (board[i][j].symbol === 'X') count++
    }
    return count
}

function _checkComputerDiaAttack(board,i) {
    let count = 0
    for (let j = 0; j < board.length; j++) {
        if (board[j][j].symbol === 'O') count++
    }
    return count

}
function _checkComputerDiaDef(board,i) {
    let count = 0
    for (let j = 0; j < board.length; j++) {
        if (board[j][j].symbol === 'X') count++
    }
    return count

}

