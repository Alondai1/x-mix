import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import socketService from '../services/SocketService'
import { useState } from 'react';
import boardService from '../services/boardService'
import { updateUser } from '../actions/UserActions'
import Snackbar from '@material-ui/core/Snackbar';
import PersonIcon from '@material-ui/icons/Person';




const Multi = ({ loggedInUser, updateUser }) => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [loggedInUsers, setLoggedInUsers] = useState([])
    const [gameIsOn, setGameIsOn] = useState(false)
    const [players, setPlayers] = useState([])
    const [board, setBoard] = useState(boardService.createBoard())
    const [currentPlayer, setCurrentPlayer] = useState('')
    const [isWin, setIsWin] = useState(false)

    //didMount
    useEffect(() => {

        socketService.setup()
        socketService.on('addUser', addUser)
        socketService.on('cellClicked', async (state) => {

            cellClicked(state)
        }
        )
        socketService.on('startGame', (players) => {
            setGameIsOn(true)
            setPlayers(players)
        }
        )
        socketService.emit('userConnected', loggedInUser)

        return () => {
            socketService.terminate()
        }
    }, [])

    //didUpdate
    useEffect(() => {
        socketService.emit('userConnected', loggedInUser)
    }, [loggedInUsers])
    useEffect(() => {
        if (players.length > 1 && !currentPlayer) setCurrentPlayer(players[0].username)
    }, [players])


    const addUser = (user) => {
        setLoggedInUsers([...loggedInUsers, user])
    }

    const play = (player) => {
        socketService.emit('newGame', [loggedInUser, player]);
        setGameIsOn(true)
    }

    const emitClick = (i, j) => {
        socketService.emit('onCellClicked', { pos: { i, j }, loggedInUser, currentPlayer, players })
    }

    const cellClicked = async (state) => {

        const { loggedInUser, pos, currentPlayer, players } = state

        if (loggedInUser.username !== currentPlayer || isWin) return
        const cell = board[pos.i][pos.j]
        if (cell.symbol) return
        cell.symbol = (currentPlayer === players[0].username) ? 'X' : '0'
        setCurrentPlayer(currentPlayer === players[0].username ? players[1].username : players[0].username)
        win(boardService.checkforWinningCells(board, pos.i, pos.j, cell.symbol), currentPlayer)
    }

    const win = (cells, currentPlayer) => {
        if (cells) {

            const winner = currentPlayer
            const user = { ...loggedInUser }
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
        <div className="game-page flex direction-column align-center multi-page">

            <Link className="back-btn" to="/">
                <h1>back</h1>
            </Link>
            {
                (players.length && gameIsOn) ? (<div className="players flex">
                    <div className="player">
                        <PersonIcon style={{ fontSize: 45 }} color={currentPlayer === players[0].username ? 'primary' : 'disabled'} />
                        <h1>{players[0].username}</h1>
                    </div>
                    <div className="player">
                        <PersonIcon style={{ fontSize: 45 }} color={currentPlayer === players[0].username ? 'disabled' : 'primary'} />
                        <h1>{players[1].username}</h1>
                    </div>
                </div>
                ) : (null)

            }

            {
                gameIsOn ? (
                    <div className="game-container">

                        <table>
                            <tbody>
                                {
                                    board.map((cell, i) => (
                                        <tr key={i}>
                                            {
                                                cell.map((item, j) => (<td key={j} className={`cell ${board[i][j].status} `}
                                                    onClick={() => emitClick(i, j)}>{board[i][j].symbol}</td>))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (<div className="player-list">
                    {loggedInUsers.length ? (loggedInUsers.map((user, index) => {
                        return <div className="player-item" key={index} onClick={() => play(user)}>{user.username}</div>
                    })) : (
                            <h1>No Active Players</h1>
                        )

                    }
                </div>)
            }


            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Multi);
