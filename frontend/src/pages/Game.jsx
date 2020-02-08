import React from 'react'
import { connect } from 'react-redux';
import { updateUser } from '../actions/UserActions'
import boardService from '../services/boardService'
import ComputerIcon from '@material-ui/icons/Computer';
import PersonIcon from '@material-ui/icons/Person';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'



const Game = ({loggedInUser, updateUser}) => {
    const [open, setOpen] =useState(false);
    const [msg, setMsg] =useState('');
    const [board, setBoard] = useState([])
    const [isWin, setIsWin] = useState(false)
    const [turn, setTurn] = useState(0)

    useEffect(() => {
        const board = boardService.createBoard()
        setBoard(board)

    }, [])
   

    useEffect(() => {
        if (turn && turn % 2 !== 0) {
            computerMove()
        }
    }, [turn])

    const cellClicked = async (i, j) => {
        if (isWin || turn % 2 !== 0) return
        const cell = board[i][j]
        if (cell.symbol) return
        cell.symbol = 'X'
        setTurn(turn + 1)
        win(boardService.checkforWinningCells(board, i, j, cell.symbol))
    }

    const computerMove = () => {
        if (isWin) return

        let pos = boardService.checkForPos(board)
        if (!pos) {
            setIsWin(true)
            return console.log('tie');

        }

        setTimeout(() => {

            const cell = board[pos.i][pos.j]
            cell.symbol = 'O'
            win(boardService.checkforWinningCells(board, pos.i, pos.j, cell.symbol))
            setTurn(turn + 1)
        }, 2000)


    }



    const win = (cells) => {
        if (cells) {
            const winner = turn % 2 === 0 ? loggedInUser.username : 'computer'
            const user = {...loggedInUser}
            if (winner === loggedInUser.username) user.wins.push(Date.now())
            else user.loses.push(Date.now())
            updateUser(user)
            setMsg(`${winner} Wins!!`)
            setOpen(true)
            setIsWin(true)
            markCells(cells)
        }

    }
    

    const markCells = (cells) => {
        const newBoard = [...board]
        cells.forEach(cell => {
            newBoard[cell.i][cell.j].status = 'marked'
        });
        setBoard(newBoard)
    }




    return (
        <div className="game-page">
            <Link to="/">
                <h1>back</h1>
            </Link>
            <div className="game-container">

                <div className="players">
                    <PersonIcon style={{ fontSize: 45 }} color={turn % 2 === 0 && !isWin ? 'primary' : 'disabled'} />
                    <ComputerIcon className={turn %2 !==0 && !isWin?"animated infinite bounce": ""} style={{ fontSize: 45 }} color={turn % 2 !== 0 && !isWin ? 'primary' : 'disabled'} />
                </div>

                {
                    board.length &&
                    <table>
                        <tbody>
                            {
                                board.map((cell, i) => (
                                    <tr key={i}>
                                        {
                                            cell.map((item, j) => (<td key={j} className={`cell ${board[i][j].status} `}
                                                onClick={() => cellClicked(i, j)}>{board[i][j].symbol}</td>))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }

            </div>



            <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={()=>setOpen(false)}
        message={msg}
       
      />

        </div>
    )
}

const mapStateToProps = state => {
    return {
      loggedInUser: state.user.loggedInUser
    };
  };
  const mapDispatchToProps = {
    
    updateUser
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Game);